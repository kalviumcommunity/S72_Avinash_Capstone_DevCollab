const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
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
    enum: ["planning", "in_progress", "completed", "on_hold"],
    default: "planning",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  team: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  board: {
    type: [columnSchema],
    default: [
      { id: "todo", name: "To Do", order: 0 },
      { id: "inprogress", name: "In Progress", order: 1 },
      { id: "done", name: "Done", order: 2 },
    ],
  },
});

// Add indexes for better query performance
projectSchema.index({ owner: 1 });
projectSchema.index({ status: 1 });

// Middleware to update user's projects when a project is created
projectSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const User = mongoose.model("User");
      // Add to owner's ownedProjects
      await User.findByIdAndUpdate(this.owner, {
        $push: { ownedProjects: this._id },
      });
      // Add to members' memberProjects
      if (this.members && this.members.length > 0) {
        await User.updateMany(
          { _id: { $in: this.members } },
          { $push: { memberProjects: this._id } }
        );
      }
    } catch (error) {
      next(error);
    }
  }
  next();
});

module.exports = mongoose.model("Project", projectSchema);
