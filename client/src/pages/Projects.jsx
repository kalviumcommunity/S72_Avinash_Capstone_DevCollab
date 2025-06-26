import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import KanbanBoard from "../components/KanbanBoard";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [boardConfig, setBoardConfig] = useState([]);
  const [issues, setIssues] = useState([]);
  const [columns, setColumns] = useState({});
  const [loadingBoard, setLoadingBoard] = useState(false);
  const navigate = useNavigate();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [deleteProject, setDeleteProject] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", description: "" });

  useEffect(() => {
    // Fetch projects from backend
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (err) {
        // handle error
      }
    };
    fetchProjects();
  }, []);

  // Fetch board config and issues for selected project
  useEffect(() => {
    if (!selectedProject) return;
    setLoadingBoard(true);
    const fetchBoardAndIssues = async () => {
      try {
        const [boardRes, issuesRes] = await Promise.all([
          api.get(`/projects/${selectedProject._id}/board`),
          api.get(`/projects/${selectedProject._id}/issues`),
        ]);
        setBoardConfig(boardRes.data);
        setIssues(issuesRes.data);
        // Organize issues by column
        const colMap = {};
        boardRes.data.forEach((col) => {
          colMap[col.id] = [];
        });
        issuesRes.data.forEach((issue) => {
          const colId = issue.status || boardRes.data[0].id;
          if (colMap[colId]) colMap[colId].push(issue);
        });
        setColumns(colMap);
      } catch (err) {
        // handle error
      } finally {
        setLoadingBoard(false);
      }
    };
    fetchBoardAndIssues();
  }, [selectedProject]);

  // Handle project selection
  const handleViewBoard = (project) => {
    setSelectedProject(project);
  };

  // Handle return to project list
  const handleBackToProjects = () => {
    setSelectedProject(null);
    setBoardConfig([]);
    setIssues([]);
    setColumns({});
  };

  // Handle drag and drop (future: update issue status in backend)
  const handleDragEnd = (result) => {
    // TODO: Implement backend update for issue status
  };

  const handleCreateProject = () => {
    navigate("/app/project/create");
  };

  const openEditDialog = (project) => {
    setEditProject(project);
    setEditForm({ name: project.name, description: project.description });
    setEditDialogOpen(true);
  };
  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditProject(null);
  };
  const handleEditFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleEditSubmit = async () => {
    try {
      const res = await api.put(`/projects/${editProject._id}`, editForm);
      setProjects((prev) =>
        prev.map((p) => (p._id === editProject._id ? res.data : p))
      );
      closeEditDialog();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update project.");
    }
  };

  const openDeleteDialog = (project) => {
    setDeleteProject(project);
    setDeleteDialogOpen(true);
  };
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeleteProject(null);
  };
  const handleDelete = async () => {
    try {
      await api.delete(`/projects/${deleteProject._id}`);
      setProjects((prev) => prev.filter((p) => p._id !== deleteProject._id));
      closeDeleteDialog();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete project.");
    }
  };

  if (!selectedProject) {
    // Project list view
    return (
      <Box>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Projects
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateProject}
            >
              Create Project
            </Button>
          </Box>
        </motion.div>
        <Grid container spacing={2}>
          {projects.map((project) => (
            <Grid item xs={12} md={6} key={project._id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="h6">{project.name}</Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {project.description}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton onClick={() => openEditDialog(project)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => openDeleteDialog(project)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                  <Button
                    onClick={() => handleViewBoard(project)}
                    variant="contained"
                  >
                    View Board
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* Edit Project Dialog */}
        <Dialog open={editDialogOpen} onClose={closeEditDialog}>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogContent>
            <TextField
              label="Project Name"
              name="name"
              value={editForm.name}
              onChange={handleEditFormChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Description"
              name="description"
              value={editForm.description}
              onChange={handleEditFormChange}
              fullWidth
              multiline
              rows={3}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeEditDialog}>Cancel</Button>
            <Button
              onClick={handleEditSubmit}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        {/* Delete Project Dialog */}
        <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogContent>
            Are you sure you want to delete the project "{deleteProject?.name}"?
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteDialog}>Cancel</Button>
            <Button onClick={handleDelete} variant="contained" color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }

  // Project board view
  return (
    <Box>
      <Button onClick={handleBackToProjects} sx={{ mb: 2 }}>
        Back to Projects
      </Button>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        {selectedProject.name} Board
      </Typography>
      {loadingBoard ? (
        <Typography>Loading board...</Typography>
      ) : (
        <KanbanBoard
          columns={columns}
          boardConfig={boardConfig}
          onDragEnd={handleDragEnd}
        />
      )}
    </Box>
  );
};

export default Projects;
