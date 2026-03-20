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

  iconUrl: {
    type: String, // ImageKit URL
    required: true,
  },

  iconFileId: {
    type: String, // for delete/update in ImageKit
  },

})

const CapabilityModel=mongo.model("Capability",corecapabilitySchema)