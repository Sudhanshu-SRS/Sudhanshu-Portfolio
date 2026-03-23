const router = require("express").Router();
const {
  CreateAbout,
  GetAbout,
  UpdateAbout
} = require("../controller/About.controller");

const { requireAuth, requireAdmin } = require("../middleware/authGuard");

// 🔐 Protect write routes
const adminAuth = [requireAuth, requireAdmin];

// ✅ CREATE / UPSERT
router.post("/", adminAuth, CreateAbout);

// ✅ GET (public)
router.get("/", GetAbout);

// ✅ UPDATE
router.put("/:id", adminAuth, UpdateAbout);

module.exports = router;