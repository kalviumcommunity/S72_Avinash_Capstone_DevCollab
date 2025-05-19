// routes/userRoute.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

// Public routes
router.post("/login", userController.loginUser);
router.post("/", userController.registerUser);

// Protected routes
router.get("/", protect, admin, userController.getUsers);
router.get("/:id", protect, userController.getUserById);
router.put("/:id", protect, userController.updateUser);
router.delete("/:id", protect, admin, userController.deleteUser);

module.exports = router;
