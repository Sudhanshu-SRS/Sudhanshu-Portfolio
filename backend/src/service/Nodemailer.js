const nodemailer=require('nodemailer');

const SendEmail=async(Email,Otp)=>{
    const Transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.Email_User,
            pass:process.env.Email_Pass
        }
    })

    await Transporter.sendMail({
  from: `"Admin Panel 🚀" <${process.env.EMAIL_USER}>`, // ✅ proper format
  to: Email.toLowerCase().trim(), // ✅ clean email input
  subject: "🔐 OTP Verification Code",
  
  text: `Your OTP is ${Otp}. It is valid for 5 minutes. Do not share it with anyone.`,
  
  html: `
    <div style="font-family: Arial; padding: 20px;">
      <h2 style="color:#333;">🔐 OTP Verification</h2>
      <p>Your One-Time Password (OTP) is:</p>
      <h1 style="color:#007bff; letter-spacing: 3px;">${Otp}</h1>
      <p>This OTP is valid for <b>5 minutes</b>.</p>
      <p style="color:red;">⚠️ Do not share this OTP with anyone.</p>
      <hr/>
      <p style="font-size:12px; color:gray;">This is an automated email.</p>
    </div>
  `
});
}


module.exports=SendEmail;