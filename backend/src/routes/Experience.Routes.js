const express = require('express');
const router = express.Router();

const{ requireAuth, requireAdmin } = require('../middleware/authGuard');
const adminAuth = [requireAuth, requireAdmin];
const ctrl = require('../controller/Experience.controller');

router.post('/', adminAuth, ctrl.CreateExperience);
router.get('/', ctrl.GetExperience);
router.delete('/:id', adminAuth, ctrl.deleteExperience);
router.put('/:id', adminAuth, ctrl.updateExperience);

module.exports = router;