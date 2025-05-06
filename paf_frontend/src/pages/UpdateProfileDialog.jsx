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
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (open) {
      API.get("/users/me")
        .then((res) => {
          setUser(res.data);
          setPreviewUrl(res.data.profileImageUrl);
        })
        .catch(() => toast.error("Failed to load profile"));
    }
  }, [open]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("mobileNumber", user.mobileNumber);
      if (selectedFile) {
        formData.append("file", selectedFile); // ✅ send image file
      }

      await API.put("/users/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated");
      onSuccess?.();
      onClose();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{backgroundColor: 'rgb(255, 235, 205)'}}>Update Profile</DialogTitle>
      <DialogContent sx={{ backgroundColor: 'rgb(255, 249, 230)' }}>
        {!user ? (
          <Box textAlign="center" py={5}>
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" noValidate>
            <Box textAlign="center" mb={3}>
              <Avatar
                src={previewUrl}
                alt={user.name}
                sx={{ width: 100, height: 100, mx: "auto", mb: 1 }}
              />
              <Button
                component="label"
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              >
                Change Profile Image
                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
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
              InputProps={{ readOnly: true }}
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
