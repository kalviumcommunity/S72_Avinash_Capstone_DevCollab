const Project = require("../models/projectModel");
const Task = require("../models/Task");

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res) => {
  try {
    const { name, description, status, startDate, endDate, team } = req.body;
    const manager = req.user._id; // Set manager to current user

    const project = await Project.create({
      name,
      description,
      status,
      startDate,
      endDate,
      manager,
      team,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({})
      .populate("manager", "name email")
      .populate("team", "name email");

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Private
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("manager", "name email")
      .populate("team", "name email");

    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res) => {
  try {
    const { name, description, status, startDate, endDate, manager, team } =
      req.body;

    const project = await Project.findById(req.params.id);

    if (project) {
      project.name = name || project.name;
      project.description = description || project.description;
      project.status = status || project.status;
      project.startDate = startDate || project.startDate;
      project.endDate = endDate || project.endDate;
      project.manager = manager || project.manager;
      project.team = team || project.team;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      await project.deleteOne();
      res.json({ message: "Project removed" });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get board config for a project
// @route   GET /api/projects/:id/board
// @access  Private
exports.getBoardConfig = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      res.json(project.board);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update board config for a project
// @route   PUT /api/projects/:id/board
// @access  Private
exports.updateBoardConfig = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      project.board = req.body.board;
      await project.save();
      res.json(project.board);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all issues for a project
// @route   GET /api/projects/:id/issues
// @access  Private
exports.getProjectIssues = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new issue for a project
// @route   POST /api/projects/:id/issues
// @access  Private
exports.createProjectIssue = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      issueType,
      assignedTo,
      customFields,
      parent,
      linkedIssues,
      dueDate,
    } = req.body;
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      issueType,
      assignedTo,
      customFields,
      parent,
      linkedIssues,
      dueDate,
      project: req.params.id,
      createdBy: req.user._id,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
