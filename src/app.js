const path = require("path");
const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const createError = require("http-errors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
var xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
var hpp = require("hpp");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const db = require("./services/mysql");
const { mongoConnect, mongoDisconnect } = require("./services/mongo");
const { verifyAccessToken, authrized } = require("../src/helpers/jwt_helper");
const swaggerDocumentation = require("../src/utils/swagger/api-docs");
require("./helpers/init_redis");

// db.execute("SELECT * FROM users")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

const userRouter = require("./routes/user/user.router");
const uploadRouter = require("./routes/upload/upload.router");
const lodgedetailsRouter = require("./routes/lodgedetails/lodgedetails");
const NewsletterRouter = require("./routes/newsletter/newsletter.router");
const recordRouter = require("./routes/record/record.router");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//serving files
app.use(express.static(path.join(__dirname, "..", "public")));
//if the client is using a form url encoded data(may never use this for an api)
app.use(express.urlencoded({ extended: true }));
// handling file uploadsx

const storage = multer.diskStorage({
  // notice you are calling the multer.diskStorage() method here, not multer()
  // destination: function (req, file, cb) {
  //   cb(null, "uploads/");
  // },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
// const upload = multer({storage}); //provide the return value from
app.use(multer({ storage }).single("file"));

const port = process.env.PORT || 3007;

// Security Http Headers
app.use(helmet());

app.use(cors());

//dev loggin
if (`${process.env.NODE_ENV}` === "development") {
  app.use(morgan("combined"));
}

//limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request, please try again after an hour",
});
app.use("/api", limiter);

//Body parser. for reading data from the body into req.body
app.use(express.json({ limit: "10kb" }));

// data sanitization reading against NoSQL query injections
app.use(mongoSanitize());

// data sanitization against XSS
app.use(xss());

//prevent parameter pollution
app.use(
  hpp({
    //for where u want to allow duplicate smilar parameters we can white list them here
    //imagine we want to search for /search?duration=5&duration=9, without whitelisting duration the hpp middleware would only return the the last number in the array which is 9 as a result, so in other to enable the default behaviour we have to whitelist.
    whitelist: ["duration", "feed"],
  })
);

//swagger docs
app.use("/apidocs", swaggerUi.serve);
app.use("/apidocs", swaggerUi.setup(swaggerDocumentation));

// app.get('/',
//     (req, res) => {
//     // console.log(req.headers['authorization'])
//     res.send('<h1>The Cultiverly Poultry Management System!!!</h1> <p>Version 1.3.0</p>')
// })

// app.get("/", verifyAccessToken, authrized("admin", "farmer"), (req, res) => {
//   // console.log(req.headers['authorization'])
//   res.json({
//     message: "Welcome to my Home!!!",
//     req: req.headers["authorization"],
//   });
// });

app.get("/", (req, res) => {
  // console.log(req.headers['authorization'])
  res.json({
    message: "Welcome to the Masons API!!!",
    req: req.headers["authorization"],
  });
});

// Define a route to render a Pug template
app.get("/v", (req, res) => {
  res.status(200).render("base");
});

app.get("/users", (req, res) => {
  // console.log(req.headers['authorization'])
  res.send([
    {
      name: "John",
      farm: "Johnny's Farm",
      type: "Layers",
    },
  ]);
});

// app.get('/',
//     verifyAccessToken,
//     authrized('admin', 'farmer'),
//     (req, res) => {
//     // console.log(req.headers['authorization'])
//     res.json({
//         message: 'Welcome to my Home!!!',
//         req: req.headers['authorization']
//     })
// })
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/", uploadRouter);
app.use("/api/v1", lodgedetailsRouter);
app.use("/api/v1/", NewsletterRouter);
app.use("/api/v1/", recordRouter);

app.use((req, res, next) => {
  // const error = new Error('Not Found')
  // error.status = 404
  // next(error)
  next(createError.NotFound());
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      status: error.status || 500,
    },
  });
});

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, "..", 'public', 'index.html'))
// })

const server = http.createServer(app);

async function startServer() {
  // await mongoConnect();

  server.listen(port, () => {
    // if(process.env.NODE_ENV === 'development'){
    console.log(`DEV Server is running on port ${port}`);
    // } else {
    //   console.log(`PROD Server is running on port ${port}`)
    // }
  });
}

startServer();

// module.exports = app
