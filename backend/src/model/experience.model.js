const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  description: {
    type: [String],
    required: true,
    validate: v => v.length > 0
  },
});

module.exports = mongoose.model("Experience", experienceSchema);