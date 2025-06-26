const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const fs = require("fs");
const path = require("path");

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Single file upload endpoint
router.post("/single", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(200).json({
      message: "File uploaded successfully",
      file: {
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`,
        size: req.file.size,
        mimetype: req.file.mimetype,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error uploading file", error: error.message });
  }
});

// Multiple files upload endpoint
router.post("/multiple", upload.array("files", 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadedFiles = req.files.map((file) => ({
      filename: file.filename,
      path: `/uploads/${file.filename}`,
      size: file.size,
      mimetype: file.mimetype,
    }));

    res.status(200).json({
      message: "Files uploaded successfully",
      files: uploadedFiles,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error uploading files", error: error.message });
  }
});

// Delete file endpoint
router.delete("/:filename", (req, res) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, "../uploads", filename);

    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ message: "File not found" });
    }

    fs.unlinkSync(filepath);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting file", error: error.message });
  }
});

module.exports = router;
