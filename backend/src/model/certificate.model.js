const mongo=require('mongoose')

const CertificateSchema=new mongo.Schema({
    image:String,
    title:String,
    year:Number,
    
})


const CertificateModel=mongo.model("Certificate",CertificateSchema)

module.exports=CertificateModel;