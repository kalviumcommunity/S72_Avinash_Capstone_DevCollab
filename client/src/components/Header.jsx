import React, { useState, useContext } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Header = ({ onMenuClick }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationsAnchor(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    )
      return;
    try {
      await api.delete("/users/me");
      logout();
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete account.");
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Typography
              variant="h6"
              color="text.primary"
              sx={{ fontWeight: 600 }}
            >
              DevCollab
            </Typography>
          </motion.div>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton color="inherit" onClick={handleNotificationsOpen}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton onClick={handleProfileMenuOpen} sx={{ ml: 1 }}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: theme.palette.primary.main,
              }}
              src={user?.avatar || undefined}
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
            </Avatar>
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem disabled>{user?.name || "Profile"}</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
          <MenuItem onClick={handleDeleteAccount} sx={{ color: "red" }}>
            Delete Account
          </MenuItem>
        </Menu>

        <Menu
          anchorEl={notificationsAnchor}
          open={Boolean(notificationsAnchor)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleMenuClose}>
            <Typography variant="body2">New task assigned to you</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Typography variant="body2">
              Project deadline approaching
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Typography variant="body2">Team meeting in 30 minutes</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
