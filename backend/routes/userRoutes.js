// routes/userRoute.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// Public routes
router.post("/login", userController.loginUser);
router.post("/", upload.single("avatar"), userController.registerUser);

// Protected routes
router.get("/", protect, admin, userController.getUsers);
router.get("/:id", protect, userController.getUserById);
router.put("/:id", protect, upload.single("avatar"), userController.updateUser);
router.delete("/me", protect, userController.deleteOwnAccount);
router.delete("/:id", protect, admin, userController.deleteUser);

module.exports = router;
