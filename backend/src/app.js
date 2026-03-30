const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const app = express();
const AuthRoutes = require('./routes/Auth.Routes');
const CertificateRoutes = require('./routes/Certificate.Routes');
const uploadRoutes = require('./routes/upload.routes');
const projectRoutes = require('./routes/project.routes');
const capabilityRoutes = require('./routes/capability.routes');
const AboutRoutes = require('./routes/about.routes');
const ExperienceRoutes = require('./routes/Experience.Routes');
const ClientRecomRoutes = require('./routes/clientRecom.routes');
// Configure secure CORS
// In production, process.env.FRONTEND_URL should be defined
const allowedOrigins = [process.env.FRONTEND_URL,  "https://sudhanshu-sde.in",
    "https://admin.sudhanshu-sde.in"].filter(Boolean);
app.use(cors({ 
    origin: allowedOrigins, 
    credentials: true 
}));

// Apply basic security headers
app.use(helmet());

// Limit payload size against DoS
app.use(express.json({ limit: '10mb' }));

// Parse Cookie header and populate req.cookies
app.use(cookieParser());



// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  message: { success: false, message: 'Too many requests from this IP, please try again later.' }
});

// Apply rate limiting to all /api/ routes
app.use('/api/', apiLimiter);

// Routes
app.use('/api/admin', AuthRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/certificate', CertificateRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/capability', capabilityRoutes);
console.log("About route loaded ✅");
app.use('/api/about', AboutRoutes);
app.use('/api/experience', ExperienceRoutes);
app.use('/api/clientRecom', ClientRecomRoutes);
// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Error Handler]: ', err);
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production' && status === 500 
    ? 'Internal Server Error' 
    : err.message || 'Something went wrong!';
  res.status(status).json({ success: false, message });
});

module.exports = app;