const express = require('express');
const Router = express.Router();
const Contr = require('../controller/Auth.Controller');
const { requireAuth } = require('../middleware/authGuard');
const validate = require('../middleware/validate');
const authValidation = require('../validations/auth.validation');

Router.post('/login', validate(authValidation.login), Contr.AdminLogin);
Router.post('/verify-otp', validate(authValidation.verifyOtp), Contr.VerifyOtp);
Router.post('/refresh-token', Contr.RefreshToken);
Router.post('/logout', requireAuth, Contr.Logout);
Router.post('/forget-pass', validate(authValidation.forgetPassword), Contr.ForgetPassword);
Router.post('/resetpassword', validate(authValidation.resetPassword), Contr.ResetPassword);
Router.get('/me', requireAuth, (req, res) => {
  res.json({ success: true, user: req.user });
});
module.exports = Router;