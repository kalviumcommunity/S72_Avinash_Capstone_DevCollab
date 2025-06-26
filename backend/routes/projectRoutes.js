const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const { protect, projectManager } = require("../middleware/authMiddleware");

// All routes require authentication
router.use(protect);

// Project routes
router.post("/", projectController.createProject);
router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProjectById);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);
router.get("/:id/board", projectController.getBoardConfig);
router.put("/:id/board", projectController.updateBoardConfig);
router.get("/:id/issues", projectController.getProjectIssues);
router.post(
  "/:id/issues",
  projectManager,
  projectController.createProjectIssue
);

module.exports = router;
