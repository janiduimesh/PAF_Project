import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import API from "../api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetLink, setResetLink] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");

    try {
        const res = await API.post("/users/forgot-password", { email });
        toast.success("Token generated");
        setResetLink(`/reset-password?token=${res.data}`);
    } catch (err) {
      toast.error(err?.response?.data || "Failed to send reset link");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 10 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Box mt={3}>
            <Button type="submit" variant="contained" fullWidth>
              Send Reset Link
            </Button>
          </Box>

          {resetLink && (
            <Box mt={2}>
                <Typography variant="body2">
                <strong>Dev Reset Link:</strong>{" "}
                <a href={resetLink}>{window.location.origin + resetLink}</a>
                </Typography>
            </Box>
)}

        </form>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
