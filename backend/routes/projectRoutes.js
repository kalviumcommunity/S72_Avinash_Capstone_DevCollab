const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const { protect, projectManager } = require("../middleware/authMiddleware");

// All routes require authentication
router.use(protect);

// Project routes
router.post("/", projectManager, projectController.createProject);
router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProjectById);
router.put("/:id", projectManager, projectController.updateProject);
router.delete("/:id", projectManager, projectController.deleteProject);

module.exports = router;
