const hRouteDoc = require("../../hSwagger");
const newsletterRouteDoc = require("../../routes/newsletter/newsletter.swagger");
const userRouteDoc = require("../../routes/user/user.swagger");

const swaggerDocumentation = {
  openapi: "3.0.0",
  info: {
    title: "The Masons",
    version: "1.0.0",
    description: "",
  },
  servers: [
    {
      url: "http://localhost:3007",
      description: "dev",
    },
    {
      url: "http://13.53.86.164:3007",
      description: "prod",
    },
  ],
  paths: {
    ...userRouteDoc,
    ...hRouteDoc,
    ...newsletterRouteDoc,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

module.exports = swaggerDocumentation;
