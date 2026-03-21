// routes/upload.routes.js
const express = require('express');
const router = express.Router();

const upload = require('../middleware/uploadmulter');
const { uploadFile } = require('../controller/upload.controller');
const { requireAuth, requireAdmin } = require('../middleware/authGuard');
const adminAuth = [requireAuth, requireAdmin];

// 🔐 Only admin can upload
router.post('/', adminAuth, upload.single('file'), uploadFile);

module.exports = router;