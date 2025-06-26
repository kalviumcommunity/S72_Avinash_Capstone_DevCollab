import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { UserContext } from "../context/UserContext";
import api from "../api";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [avatarFile, setAvatarFile] = useState(null);
  const [profileMsg, setProfileMsg] = useState("");
  const [profileName, setProfileName] = useState(user?.name || "");
  const [profileEmail, setProfileEmail] = useState(user?.email || "");

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", profileName);
      formData.append("email", profileEmail);
      if (avatarFile) formData.append("avatar", avatarFile);
      const res = await api.put(`/users/${user._id}`, formData);
      setUser((prev) => ({ ...prev, ...res.data }));
      localStorage.setItem("user", JSON.stringify({ ...user, ...res.data }));
      setProfileMsg("Profile updated!");
    } catch (err) {
      setProfileMsg(err.response?.data?.message || "Update failed.");
    }
  };

  return (
    <Box
      maxWidth={500}
      mx="auto"
      mt={4}
      mb={4}
      p={2}
      bgcolor="background.paper"
      borderRadius={2}
      boxShadow={2}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Profile
      </Typography>
      <form onSubmit={handleProfileUpdate}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Avatar
            src={
              user?.avatar
                ? user.avatar.startsWith("/uploads/")
                  ? `http://localhost:5000${user.avatar}`
                  : user.avatar
                : undefined
            }
            sx={{ width: 64, height: 64 }}
          />
          <Button variant="outlined" component="label">
            Change Avatar
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setAvatarFile(e.target.files[0])}
            />
          </Button>
        </Stack>
        <TextField
          label="Name"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          value={profileEmail}
          onChange={(e) => setProfileEmail(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">
          Update Profile
        </Button>
        {profileMsg && <Typography sx={{ mt: 2 }}>{profileMsg}</Typography>}
      </form>
    </Box>
  );
};

export default Profile;
