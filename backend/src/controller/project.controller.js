// controller/project.controller.js
const Project = require('../model/Project.model');

// ➕ CREATE
const createProject = async (req, res) => {
  try {
    const { title, image, role, work, liveLink } = req.body;

    const project = await Project.create({
      title,
      image,
      role,
      work,
      liveLink
    });

    res.json({
      message: "Project created successfully",
      project
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📄 GET ALL
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ❌ DELETE
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted", deleted });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✏️ UPDATE
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Project.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project updated", updated });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProject,
  getProjects,
  deleteProject,
  updateProject
};