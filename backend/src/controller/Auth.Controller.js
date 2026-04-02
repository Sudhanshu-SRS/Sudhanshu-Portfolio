const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminUser = require("../model/User.model.js");
const OtpGennrator = require("../utils/OtpGenrator.js");
const SendEmail = require("../service/Nodemailer.js");

const generateTokens = (res, userId, role) => {
  const accessToken = jwt.sign({ id: userId, role }, process.env.JWT_SECRET || process.env.JWT_ACCESS_SECRET || 'fallback_secret', { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret', { expiresIn: '7d' });
const isProd = process.env.NODE_ENV === "production";

res.cookie('accessToken', accessToken, {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  path: "/",
  maxAge: 15 * 60 * 1000
});

res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000
});
};

const AdminLogin = async (req, res) => {
  try {
    console.log("Login request:", req.body);

    const { email, password } = req.body;

    const admin = await AdminUser.findOne({ Email: email });
    console.log("Admin found:", admin);

    if (!admin) return res.status(404).json({ success: false });

    const PassMatch = await bcrypt.compare(password, admin.Password);
    console.log("Password match:", PassMatch);

    const otp = OtpGennrator();
    console.log("OTP generated:", otp);

    admin.Otp = otp;
    admin.OtpExpire = Date.now() + 5 * 60 * 1000;

    await admin.save();
    console.log("Saved OTP");

    await SendEmail(email, otp); // suspect
    console.log("Email sent");

    res.json({ success: true });

  } catch (error) {
    console.error("LOGIN ERROR:", error); // 🔥 IMPORTANT
    res.status(500).json({ success: false, message: error.message });
  }
};
const VerifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const admin = await AdminUser.findOne({ Email: email });

    if (!admin || admin.Otp !== otp || admin.OtpExpire < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid Or Expired OTP" });
    }
    
    admin.Otp = null;
    admin.OtpExpire = null;
    await admin.save();

    generateTokens(res, admin._id, "admin");

    res.json({ success: true, message: "Login Successful", user: { id: admin._id, email: admin.Email } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

const RefreshToken = async (req, res) => {
  try {
   
    const refreshToken = req.cookies.refreshToken;

   
    if (!refreshToken) {
      console.log("❌ No refresh token found");
      return res.status(401).json({ success: false, message: "Refresh token missing" });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret');

   

    const admin = await AdminUser.findById(decoded.id);

    if (!admin) {
      console.log("❌ User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    generateTokens(res, admin._id, "admin");

  

    res.json({ success: true });

  } catch (error) {
    console.log("❌ Refresh error:", error.message);
    res.status(403).json({ success: false, message: "Invalid refresh token" });
  }
};

const Logout = (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ success: true, message: "Logged out successfully" });
};

const ForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await AdminUser.findOne({ Email: email });
    if (!admin) return res.status(400).json({ success: false, message: "Admin Not Found With This Email" });
    
    const otp = OtpGennrator();
    admin.Otp = otp;
    admin.OtpExpire = Date.now() + 5 * 60 * 1000;
    await admin.save();

    await SendEmail(email, otp);
    res.json({ success: true, message: "Your OTP Has Been Sent" });
  } catch (error) {
     res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

const ResetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const admin = await AdminUser.findOne({ Email: email });

    if (!admin || admin.Otp !== otp || admin.OtpExpire < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid Or Expired OTP" });
    }

    const salt = await bcrypt.genSalt(10);
    admin.Password = await bcrypt.hash(newPassword, salt);
    admin.Otp = null;
    admin.OtpExpire = null;
    await admin.save();

    res.json({ success: true, message: "Your Password Has Been Changed Successfully" });
  } catch (error) {
     res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = {
  AdminLogin, VerifyOtp, RefreshToken, Logout, ForgetPassword, ResetPassword
};