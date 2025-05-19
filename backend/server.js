const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

// Import routes
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Redirect /login to /api/users/login
app.post("/login", (req, res) => {
  // Forward the request to the userRoutes login handler
  const userController = require("./controllers/userController");
  userController.loginUser(req, res);
});

// Basic route for testing
app.get("/", (req, res) => {
  res.send("DevCollab API is running...");
});

// Connect to MongoDB
const MONGODB_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/devcollab";

// Start the server regardless of MongoDB connection
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // Try to connect to MongoDB
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
      console.log("Server is running without MongoDB connection");
    });
});
