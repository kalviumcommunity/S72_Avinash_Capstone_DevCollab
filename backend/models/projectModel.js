const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema(
  {
    id: { type: String, required: true }, // unique column id (e.g., uuid)
    name: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["planning", "active", "completed", "on-hold"],
      default: "planning",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
