const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

// Function to send an email
async function sendEmail({ from, to, subject, html }) {
  const emailData = {
    from,
    to,
    subject,
    html,
  };

  try {
    const response = await mailgun.messages().send(emailData);
    console.log("Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = { sendEmail };
