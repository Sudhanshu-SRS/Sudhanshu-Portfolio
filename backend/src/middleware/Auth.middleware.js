const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
    //    console.log("RAW HEADER:", req.headers.authorization);
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        // 🔥 Extract token from "Bearer TOKEN"
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "Admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        req.admin = decoded;
        next();

    } catch (error) {
        console.error("Auth Error:", error.message);
        return res.status(401).json({ message: "Invalid token" });
    } 
};

module.exports = adminAuth;