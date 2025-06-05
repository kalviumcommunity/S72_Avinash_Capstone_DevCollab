import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import TaskDetail from "./pages/TaskDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb",
      light: "#60a5fa",
      dark: "#1e40af",
    },
    secondary: {
      main: "#7c3aed",
      light: "#a78bfa",
      dark: "#5b21b6",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="tasks/:taskId" element={<TaskDetail />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
