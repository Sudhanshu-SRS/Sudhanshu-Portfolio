// routes/project.routes.js
const express = require('express');
const router = express.Router();

const adminAuth = require('../middleware/Auth.middleware');
const ctrl = require('../controller/project.controller');

// 🔓 Public
router.get('/', ctrl.getProjects);

// 🔐 Protected
router.post('/create', adminAuth, ctrl.createProject);
router.delete('/delete/:id', adminAuth, ctrl.deleteProject);
router.put('/update/:id', adminAuth, ctrl.updateProject);

module.exports = router;