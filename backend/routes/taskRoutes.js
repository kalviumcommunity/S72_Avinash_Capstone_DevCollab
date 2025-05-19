const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

// All routes require authentication
router.use(protect);

// Task routes
router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskById);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
