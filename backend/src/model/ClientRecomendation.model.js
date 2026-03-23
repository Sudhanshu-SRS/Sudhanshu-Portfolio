const mongo =require('mongoose');

clientrecomendationschema=new mongo.Schema({
    name:String,
    role:String,
    company:String,
    image:String,
    recomendation:String,
    linkedin:String,
})

const clientrecomendationmodel=mongo.model("ClientRecomendation",clientrecomendationschema)

module.exports=clientrecomendationmodel;