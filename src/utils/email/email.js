const nodemailer = require("nodemailer");
const pug = require("pug");
const { convert } = require("html-to-text");
let aws = require("@aws-sdk/client-ses");
require("dotenv").config();

const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: "us-east-1",
  credentials: {
    accessKeyId: `${process.env.AWS_ACCESS_KEY}`,
    secretAccessKey: `${process.env.AWS_SECRET_KEY}`,
  },
});
module.exports = class Email {
  constructor(user, url, unsubscribeUrl) {
    this.to = user.email;
    this.firstname = user.name;
    this.unsubscribeUrl = unsubscribeUrl;
    this.from = `theCultiverly <${process.env.EMAIL_FROM}>`;
    console.log(`${process.env.EMAIL_FROM}`);
    console.log("user", { unsubscribeUrl });
  }

  newTransport() {
    if (process.env.NODE_ENV == "production") {
      // Create and return SendGrid SES
      console.log("email ran in production");
      return nodemailer.createTransport({
        host: `${process.env.EMAIL_HOST_PROD}`,
        port: `${process.env.EMAIL_PORT_PROD}`,
        auth: {
          user: `${process.env.EMAIL_USERNAME_PROD}`,
          pass: `${process.env.EMAIL_PASSWORD_PROD}`,
        },
      });
    }

    if (process.env.NODE_ENV == "development") {
      // Create and return Amazon SES transport
      console.log("email ran in dev");
      return nodemailer.createTransport({
        SES: { ses, aws },
      });
    }

    // Create and return normal SMTP transport
    console.log("email ran in local");
    return nodemailer.createTransport({
      host: `${process.env.EMAIL_HOST}`,
      port: `${process.env.EMAIL_PORT}`,
      auth: {
        user: `${process.env.EMAIL_USERNAME}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });
  }

  // send actual email
  async send(template, subject) {
    // render HTML based on a pug template
    // const html = "<h1>hiiiii</h1>";
    const html = pug.renderFile(
      `${__dirname}/../../views/email/${template}.pug`,
      {
        firstname: this.firstname,
        url: this.url,
        subject,
        unsubscribeUrl: this.unsubscribeUrl,
      }
    );

    // Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    try {
      // create a transport and send email
      const info = await this.newTransport().sendMail(mailOptions);
      console.log("Email sent successfully:", info.response);
      // res.send({ message: info.response });
    } catch (error) {
      console.error("Error sending email:", error.message);
      // res.send({ message: error.message });
    }

    // create a transport and send email
    // await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", `Welcome to theCultiverly🥰💃🏾🕺🏾`);
  }

  async sendNewsletter() {
    await this.send("newsletter", `Hurray🥰, you joined our email list!!!`);
  }

  async sendResetPassword() {
    await this.send(
      "passwordreset",
      `Your password reset token (valid for only 10 minutes)`
    );
  }
};
