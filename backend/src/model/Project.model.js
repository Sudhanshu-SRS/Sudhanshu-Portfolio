const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: String,
  role: String,
  work: String,
  liveLink: String
}, { timestamps: true });

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = ProjectModel;