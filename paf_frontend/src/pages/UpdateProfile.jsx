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
import { storage, ref, uploadBytes, getDownloadURL } from "../firebase";

const UpdateProfileDialog = ({ open, onClose, onSuccess }) => {
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);

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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    setUploading(true);
    const storageRef = ref(storage, `profile-images/${user.email}-${Date.now()}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setUser((prev) => ({ ...prev, profileImageUrl: downloadURL }));
      toast.success("Image uploaded");
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      await API.put("/users/update", user);
      toast.success("Profile updated");
      onSuccess?.();
      onClose();
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
            <Box textAlign="center" mb={2}>
              <Avatar
                src={user.profileImageUrl}
                sx={{ width: 100, height: 100, mx: "auto", mb: 1 }}
              />
              <Button variant="outlined" component="label" disabled={uploading}>
                {uploading ? "Uploading..." : "Change Image"}
                <input type="file" hidden onChange={handleImageChange} accept="image/*" />
              </Button>
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
        <Button onClick={handleSubmit} variant="contained" disabled={uploading || !user}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProfileDialog;
