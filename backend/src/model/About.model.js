const mongo=require('mongoose');

const aboutschema=new mongo.Schema({
    image:String,
    aboutme:String,
    yearExperience:Number,
    awards:Number,
    hackhthon:Number,
    whatsapp:Number,
    email:String,
})

const aboutmodel=mongo.model("About",aboutschema)

module.exports=aboutmodel;