const imagekit = require('../config/Imagekit.config');
const { toFile } = require('@imagekit/nodejs');

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            console.log("❌ No file received");
            return res.status(400).json({ message: "No file uploaded" });
        }

        console.log("✅ File:", req.file.originalname);

        const result = await imagekit.files.upload({
            file: await toFile(req.file.buffer, req.file.originalname),
            fileName: req.file.originalname,
            folder: "/portfolio/projects",
        });

        res.json({
            url: result.url,
            fileId: result.fileId
        });

    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: "Upload failed" });
    }
};

module.exports = { uploadFile };