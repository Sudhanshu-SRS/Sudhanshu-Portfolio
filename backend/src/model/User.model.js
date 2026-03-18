const mongo = require('mongoose');

const UserSchema =new mongo.Schema({
    Email:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true,
    },
    Otp: String,
    OtpExpire:Date,
},{timestamps:true}
)

const UserModel=mongo.model('User',UserSchema)

module.exports=UserModel;