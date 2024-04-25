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
      url: process.env.SWAGGERURL,
      // description: "dev",
    },
    // {
    //   url: swaggerUrl,
    //   description: "prod",
    // },
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
      Authorization: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

module.exports = swaggerDocumentation;
