const express=require('express')
const Router=express.Router()
const Contr=require('../controller/Auth.Controller')

Router.post('/login',Contr.AdminLogin)
Router.post('/verify-otp',Contr.VerifyOtp)
Router.post('/forget-pass',Contr.ForgetPassword)
Router.post('/resetpassword',Contr.ResetPassword)

module.exports=Router;