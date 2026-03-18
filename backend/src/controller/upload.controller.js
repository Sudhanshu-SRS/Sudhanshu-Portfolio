const imagekit = require('../config/Imagekit.config');

const uploadFile = async (req, res) => {
    try {
        const file = req.file; // from multer

        const result = await imagekit.upload({
            file: file.buffer.toString("base64"),
            fileName: file.originalname,
        });

        res.json({
            url: result.url,
            fileId: result.fileId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Upload failed" });
    }
};

module.exports = { uploadFile };