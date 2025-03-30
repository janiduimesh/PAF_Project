import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Box
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import toast from "react-hot-toast";
import API from "../api";

const ResetPasswordDialog = ({ open, onClose }) => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async () => {
    const { currentPassword, newPassword, confirmPassword } = form;
  
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
  
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
  
    setLoading(true);
    try {
      await API.put("/users/resetpassword", form);
      toast.success("Password updated successfully");
      onClose();
    } catch (err) {
      toast.error(
        err?.response?.data || "Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate>
          <TextField
            label="Current Password"
            name="currentPassword"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={form.currentPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <TextField
            label="New Password"
            name="newPassword"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={form.newPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <TextField
            label="Confirm New Password"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={form.confirmPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="error" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          variant="contained"
          color="primary"
        >
          {loading ? "Saving..." : "Update Password"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResetPasswordDialog;
