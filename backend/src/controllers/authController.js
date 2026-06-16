const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateOtp = require("../utils/generateOtp");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

const buildUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  isEmailVerified: user.isEmailVerified
});

const getOtpExpiry = () => {
  const minutes = Number(process.env.OTP_EXPIRES_IN_MINUTES || 10);
  return new Date(Date.now() + minutes * 60 * 1000);
};

const setOtpForUser = async (user) => {
  const otp = generateOtp();
  user.otp = await bcrypt.hash(otp, 10);
  user.otpExpiresAt = getOtpExpiry();
  return otp;
};

const sendOtpEmail = async ({ email, otp, purpose }) => {
  const appName = process.env.APP_NAME || "Auth App";

  try {
    await sendEmail({
      to: email,
      subject: `${appName} ${purpose} OTP`,
      text: `Your ${purpose.toLowerCase()} OTP is ${otp}. It expires in ${process.env.OTP_EXPIRES_IN_MINUTES || 10} minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>${appName} ${purpose} OTP</h2>
          <p>Your OTP is:</p>
          <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${otp}</p>
          <p>This OTP expires in ${process.env.OTP_EXPIRES_IN_MINUTES || 10} minutes.</p>
        </div>
      `
    });
  } catch (error) {
    console.error(`Unable to send ${purpose.toLowerCase()} OTP email: ${error.message}`);

    const emailError = new Error("Email service is not configured. OTP cannot be sent.");
    emailError.statusCode = error.statusCode === 503 ? 503 : 502;

    if (error.statusCode !== 503) {
      emailError.message = "Could not send OTP email. Please check the server SMTP settings.";
    }

    throw emailError;
  }
};

const verifyOtpForUser = async ({ email, otp }) => {
  const normalizedEmail = email?.trim().toLowerCase();

  if (!email || !otp) {
    const error = new Error("Email and OTP are required");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email: normalizedEmail }).select("+otp +otpExpiresAt");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (!user.otp || !user.otpExpiresAt) {
    const error = new Error("OTP not found. Please request a new OTP.");
    error.statusCode = 400;
    throw error;
  }

  if (user.otpExpiresAt < new Date()) {
    const error = new Error("OTP has expired");
    error.statusCode = 400;
    throw error;
  }

  const isOtpValid = await bcrypt.compare(String(otp), user.otp);

  if (!isOtpValid) {
    const error = new Error("Invalid OTP");
    error.statusCode = 401;
    throw error;
  }

  user.otp = undefined;
  user.otpExpiresAt = undefined;
  return user;
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Name, email, and password are required");
    }

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      if (existingUser.isEmailVerified) {
        res.status(409);
        throw new Error("User already exists with this email");
      }

      existingUser.name = name;
      existingUser.password = await bcrypt.hash(password, 10);

      const otp = await setOtpForUser(existingUser);
      await sendOtpEmail({ email: existingUser.email, otp, purpose: "Register" });
      await existingUser.save();

      return res.json({
        success: true,
        message: "Registration OTP resent to your email",
        email: existingUser.email
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      isEmailVerified: false
    });

    const otp = await setOtpForUser(user);
    await sendOtpEmail({ email: user.email, otp, purpose: "Register" });
    await user.save();

    res.status(201).json({
      success: true,
      message: "Registration OTP sent to your email",
      email: user.email
    });
  } catch (error) {
    next(error);
  }
};

const verifyRegisterOtp = async (req, res, next) => {
  try {
    const user = await verifyOtpForUser(req.body);

    user.isEmailVerified = true;
    await user.save();

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: "Email verified successfully",
      token,
      user: buildUserResponse(user)
    });
  } catch (error) {
    res.status(error.statusCode || res.statusCode);
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email: normalizedEmail }).select("+password +otp +otpExpiresAt");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    const otp = await setOtpForUser(user);
    await sendOtpEmail({ email: user.email, otp, purpose: "Login" });
    await user.save();

    res.json({
      success: true,
      message: "Login OTP sent to your email",
      email: user.email
    });
  } catch (error) {
    next(error);
  }
};

const verifyLoginOtp = async (req, res, next) => {
  try {
    const user = await verifyOtpForUser(req.body);

    if (!user.isEmailVerified) {
      user.isEmailVerified = true;
    }

    await user.save();

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: "Logged in successfully",
      token,
      user: buildUserResponse(user)
    });
  } catch (error) {
    res.status(error.statusCode || res.statusCode);
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    res.json({
      success: true,
      user: buildUserResponse(req.user)
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  verifyRegisterOtp,
  loginUser,
  verifyLoginOtp,
  getProfile
};
