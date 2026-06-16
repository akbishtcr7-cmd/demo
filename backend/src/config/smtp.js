const nodemailer = require("nodemailer");

const requiredKeys = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"];
const missingKeys = requiredKeys.filter((key) => !process.env[key]);

let transporter = null;

if (missingKeys.length) {
  console.warn(
    `SMTP not configured. Missing ${missingKeys.join(", ")}. OTP email routes will return a clean error.`
  );
} else {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  console.log("SMTP configured");
}

const isEmailServiceConfigured = () => Boolean(transporter);

const verifySmtpConnection = async () => {
  if (!transporter) {
    console.warn("SMTP verify skipped because SMTP is not configured.");
    return false;
  }

  try {
    await transporter.verify();
    console.log("SMTP connection verified");
    return true;
  } catch (error) {
    console.warn(`SMTP verify failed: ${error.message}`);
    return false;
  }
};

module.exports = {
  transporter,
  isEmailServiceConfigured,
  verifySmtpConnection
};
