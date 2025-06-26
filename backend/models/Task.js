const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["todo", "in_progress", "review", "completed"],
    default: "todo",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "critical"],
    default: "medium",
  },
  issueType: {
    type: String,
    enum: ["task", "bug", "story", "epic"],
    default: "task",
  },
  customFields: {
    type: Object,
    default: {},
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  dueDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
  linkedIssues: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

// Add indexes for better query performance
taskSchema.index({ project: 1 });
taskSchema.index({ assignedTo: 1 });
taskSchema.index({ createdBy: 1 });
taskSchema.index({ status: 1 });

// Middleware to update related documents when a task is created
taskSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const Project = mongoose.model("Project");
      const User = mongoose.model("User");

      // Add task to project's tasks array
      await Project.findByIdAndUpdate(this.project, {
        $push: { tasks: this._id },
      });

      // Add task to creator's createdTasks array
      await User.findByIdAndUpdate(this.createdBy, {
        $push: { createdTasks: this._id },
      });

      // If task is assigned, add to assignee's assignedTasks array
      if (this.assignedTo) {
        await User.findByIdAndUpdate(this.assignedTo, {
          $push: { assignedTasks: this._id },
        });
      }
    } catch (error) {
      next(error);
    }
  }
  next();
});

module.exports = mongoose.model("Task", taskSchema);
