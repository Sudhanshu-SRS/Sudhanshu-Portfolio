const mongo=require('mongoose')

const ProjectSchema=new mongo.Schema(
  {
    title:String,
    image:String,
    role:String,
    work:String,
    liveLink:String,

  }
)

const ProjectModel=mongo.model("Projects",ProjectSchema)

module.exports=ProjectModel;