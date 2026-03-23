const router = require('express').Router();
const ctrl = require('../controller/Recomendation.controller');
const { requireAuth, requireAdmin } = require('../middleware/authGuard');

// 🔐 ADMIN ONLY
const adminOnly = [requireAuth, requireAdmin];

// ✅ PUBLIC
router.get('/', ctrl.GetRecomendation);

// 🔐 ADMIN PROTECTED
router.post('/', adminOnly, ctrl.CreateRecomendation);
router.put('/:id', adminOnly, ctrl.updateRecomendation);
router.delete('/:id', adminOnly, ctrl.deleteRecomendation);

module.exports = router;