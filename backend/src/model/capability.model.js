const mongo=require('mongoose')

const corecapabilitySchema=new mongo.Schema({
   title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  iconSVG: {
    type: String, // SVG markup
    required: true,
  },

})

const CapabilityModel=mongo.model("Capability",corecapabilitySchema)

module.exports=CapabilityModel;