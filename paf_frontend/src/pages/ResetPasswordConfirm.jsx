import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import toast from "react-hot-toast";
import API from "../api";
import { useSearchParams, useNavigate } from "react-router-dom";

const ResetPasswordConfirm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.newPassword || !form.confirmPassword) {
      return toast.error("Please fill all fields");
    }

    if (form.newPassword !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await API.post("/users/reset-password-confirm", {
        token,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });

      toast.success("Password reset successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data || "Reset failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 10 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Reset Your Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="New Password"
            type="password"
            name="newPassword"
            fullWidth
            margin="normal"
            value={form.newPassword}
            onChange={handleChange}
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            fullWidth
            margin="normal"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <Box mt={3}>
            <Button type="submit" variant="contained" fullWidth>
              Reset Password
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPasswordConfirm;
