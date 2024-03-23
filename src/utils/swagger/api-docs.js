const hRouteDoc = require("../../hSwagger");
const newsletterRouteDoc = require("../../routes/newsletter/newsletter.swagger");
const userRouteDoc = require("../../routes/user/user.swagger");
const blogRouteDoc = require("../../routes/blog/blog.swagger");
const lodgedetailRouteDoc = require("../../routes/lodgedetails/lodgedetails.swagger");
const sliderImgRouteDoc = require("../../routes/slider/slider.swagger");
const articleDoc = require("../../routes/article/article.swagger");
const subtopicDoc = require("../../routes/subtopic/subtopic.swagger");
const calenderDoc = require("../../routes/calender/calender.swagger");
const officerDoc = require("../../routes/officer/officer.swagger");
const memberDoc = require("../../routes/member/member.swagger");

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
    ...calenderDoc,
    ...newsletterRouteDoc,
    ...blogRouteDoc,
    ...lodgedetailRouteDoc,
    ...sliderImgRouteDoc,
    ...articleDoc,
    ...subtopicDoc,
    ...officerDoc,
    ...memberDoc,
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
