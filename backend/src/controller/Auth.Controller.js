const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User.model.js");
const OtpGennrator = require("../utils/OtpGenrator.js");
const SendEmail = require("../service/Nodemailer.js");
const AdminUser = require("../model/User.model.js");
const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
const admin = await AdminUser.findOne({ Email: email });
    if (!admin){return res.status(404).json({ message: "No Admin With THis Email" });}
      

    const PassMath = await bcrypt.compare(password, admin.Password);
    if (!PassMath)
     { return res.status(404).json({ message: "PassWord Is Incorrect" });}

    const otp = OtpGennrator();

    admin.Otp = otp;
    admin.OtpExpire = Date.now() + 5 * 60 * 1000;
    await admin.save();

    await SendEmail(email, otp);
    res.json({
      message: "Your Otp Has Been Send Succesfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", Error: error });
  }
};

const VerifyOtp = async (req, res) => {
  try {

    const {email,otp}=req.body;


    const admin=await AdminUser.findOne({Email:email})

    if(!admin||admin.Otp!== otp|| admin.OtpExpire<Date.now())
        return res.status(400).json({Message:"Invalid Or Expired Otp"})
    
    admin.Otp=null
    admin.OtpExpire=null
    await admin.save();

    const token=jwt.sign({
        id:admin._id,role:"Admin"
    },
        process.env.JWT_SECRET,{expiresIn:"1d"}
    )

    res.json({message:"Logine Succesfull",token})



  } catch (error) {
    res.status(500).json({ message: "server Error", Error: error });
  }
};


const ForgetPassword=async(req,res)=>{
 try {
    
    const{email}=req.body;

    const admin=await AdminUser.findOne({email})

    if(!admin) return res.status(400).json({message:"Admin Not Found With THis Email"})
    
    const otp=OtpGennrator();
    admin.Otp=otp;
    admin.OtpExpire=Date.now()+5*60*1000;
    await admin.save()

    await SendEmail(email,otp);

    res.json({message:"You Otp Has Been Send "})
 } catch (error) {
     res.status(500).json({ message: "Server Error", Error: error });
 }


}

const ResetPassword=async(req,res)=>{
    const {email,otp,newPassword}=req.body;

    const admin=await AdminUser.findOne({email})

    if(!admin||admin.otp!==otp||admin.OtpExpire<Date.now()) return res.json(400).json({message:"Invalid Or Expired OTP"})

    admin.Password=newPassword;
    admin.Otp=null
    admin.OtpExpire=null
    await admin.save()

    res.json({message:"Your Password Has Been Changed Succesfully"})

}


module.exports={
    AdminLogin,VerifyOtp,ForgetPassword,ResetPassword
}