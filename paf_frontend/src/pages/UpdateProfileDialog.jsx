import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Avatar,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import API from "../api";
import toast from "react-hot-toast";

const UpdateProfileDialog = ({ open, onClose, onSuccess }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (open) {
      API.get("/users/me")
        .then((res) => setUser(res.data))
        .catch(() => toast.error("Failed to load profile"));
    }
  }, [open]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await API.put("/users/update", user);
      onSuccess?.();
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Profile updated");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Profile</DialogTitle>
      <DialogContent>
        {!user ? (
          <Box textAlign="center" py={5}>
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" noValidate>
            <Box textAlign="center" mb={3}>
              <Avatar
                src={user.profileImageUrl}
                alt={user.name}
                sx={{ width: 100, height: 100, mx: "auto", mb: 1 }}
              />
              <Typography variant="caption" color="text.secondary">
                Profile image (not editable)
              </Typography>
            </Box>

            <TextField
              label="Name"
              name="name"
              fullWidth
              margin="normal"
              value={user.name}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              value={user.email}
              onChange={handleChange}
            />
            <TextField
              label="Mobile Number"
              name="mobileNumber"
              fullWidth
              margin="normal"
              value={user.mobileNumber}
              onChange={handleChange}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="error" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!user}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProfileDialog;
