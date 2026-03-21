const jwt = require('jsonwebtoken');

// Middleware to protect routes via HTTP-only JSON Web Tokens
const requireAuth = (req, res, next) => {
  // Check for the access token in cookies
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || process.env.JWT_ACCESS_SECRET || 'fallback_secret_change_me');
    req.user = decoded; // Should contain { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token expired or invalid' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Forbidden: Admin access required' });
  }
};

module.exports = {
  requireAuth,
  requireAdmin
};
