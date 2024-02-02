const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI_PROD = process.env.MONGODB_DB_PROD;
const MONGO_URI_LOCAL = process.env.MONGO_URI;

let mongoUri;
if (process.env.NODE_ENV == "production") {
  mongoUri = MONGO_URI_PROD;
}
if (process.env.NODE_ENV == "local") {
  mongoUri = MONGO_URI_LOCAL;
}

let mongoConnect = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // user: process.env.DB_USER,
      // pass: process.env.DB_PASS,
    });
    console.log("MongoDB connected...");
  } catch (error) {
    console.log(error);
  }

  mongoose.connection.on("open", () => {
    console.log("MongoDB connection ready!");
  });

  mongoose.connection.on("error", (err) => {
    console.error(err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connection is disconnected...");
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose connection is disconnected due to app termination..."
      );
      process.exit(0);
    });
  });
};

module.exports = {
  mongoConnect,
};
