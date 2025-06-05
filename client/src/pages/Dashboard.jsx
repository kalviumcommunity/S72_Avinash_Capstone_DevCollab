import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Avatar,
  AvatarGroup,
  useTheme,
} from "@mui/material";
import {
  Assignment as TaskIcon,
  Group as TeamIcon,
  TrendingUp as ProgressIcon,
  Schedule as DeadlineIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon, color, delay }) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card
        sx={{
          height: "100%",
          bgcolor: "background.paper",
          boxShadow: theme.shadows[2],
          "&:hover": {
            boxShadow: theme.shadows[4],
            transform: "translateY(-4px)",
          },
          transition: "all 0.3s ease-in-out",
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: `${color}.light`,
                color: `${color}.main`,
                mr: 2,
              }}
            >
              {icon}
            </Avatar>
            <Typography variant="h6" color="text.secondary">
              {title}
            </Typography>
          </Box>
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
            {value}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ProjectCard = ({ project, delay }) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card
        sx={{
          height: "100%",
          bgcolor: "background.paper",
          boxShadow: theme.shadows[2],
          "&:hover": {
            boxShadow: theme.shadows[4],
          },
          transition: "all 0.3s ease-in-out",
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            {project.name}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Progress
            </Typography>
            <LinearProgress
              variant="determinate"
              value={project.progress}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: "grey.100",
                "& .MuiLinearProgress-bar": {
                  bgcolor: "primary.main",
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {project.deadline}
            </Typography>
            <AvatarGroup max={3}>
              {project.team.map((member, index) => (
                <Avatar
                  key={index}
                  sx={{ width: 32, height: 32 }}
                  src={member.avatar}
                />
              ))}
            </AvatarGroup>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Dashboard = () => {
  const theme = useTheme();

  const stats = [
    {
      title: "Active Tasks",
      value: "12",
      icon: <TaskIcon />,
      color: "primary",
    },
    {
      title: "Team Members",
      value: "8",
      icon: <TeamIcon />,
      color: "secondary",
    },
    {
      title: "Project Progress",
      value: "75%",
      icon: <ProgressIcon />,
      color: "success",
    },
    {
      title: "Upcoming Deadlines",
      value: "3",
      icon: <DeadlineIcon />,
      color: "warning",
    },
  ];

  const projects = [
    {
      name: "Website Redesign",
      progress: 75,
      deadline: "Due in 5 days",
      team: [
        { avatar: "https://i.pravatar.cc/150?img=1" },
        { avatar: "https://i.pravatar.cc/150?img=2" },
        { avatar: "https://i.pravatar.cc/150?img=3" },
      ],
    },
    {
      name: "Mobile App Development",
      progress: 45,
      deadline: "Due in 2 weeks",
      team: [
        { avatar: "https://i.pravatar.cc/150?img=4" },
        { avatar: "https://i.pravatar.cc/150?img=5" },
      ],
    },
    {
      name: "Database Migration",
      progress: 90,
      deadline: "Due in 3 days",
      team: [
        { avatar: "https://i.pravatar.cc/150?img=6" },
        { avatar: "https://i.pravatar.cc/150?img=7" },
        { avatar: "https://i.pravatar.cc/150?img=8" },
      ],
    },
  ];

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatCard {...stat} delay={index * 0.1} />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" sx={{ mt: 6, mb: 3, fontWeight: 600 }}>
          Active Projects
        </Typography>

        <Grid container spacing={3}>
          {projects.map((project, index) => (
            <Grid item xs={12} md={4} key={index}>
              <ProjectCard project={project} delay={0.3 + index * 0.1} />
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Dashboard;
