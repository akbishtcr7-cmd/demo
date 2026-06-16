const { transporter } = require("../config/smtp");

const sendEmail = async ({ to, subject, html, text }) => {
  if (!transporter) {
    const error = new Error("Email service is not configured");
    error.statusCode = 503;
    throw error;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      text,
      html
    });
  } catch (error) {
    const emailError = new Error("Email could not be sent");
    emailError.statusCode = 502;
    emailError.cause = error;
    throw emailError;
  }
};

module.exports = sendEmail;
