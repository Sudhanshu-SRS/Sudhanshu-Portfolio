const express = require('express');
const router = express.Router();

const { requireAuth, requireAdmin } = require('../middleware/authGuard');
const adminAuth = [requireAuth, requireAdmin];
const ctrl = require('../controller/capability.controller');

router.get('/', ctrl.getCapabilities);
router.post('/create', adminAuth, ctrl.createCapability);
router.put('/update/:id', adminAuth, ctrl.updateCapability);
router.delete('/delete/:id', adminAuth, ctrl.deleteCapability);

module.exports = router;
