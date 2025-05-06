import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Box, TextField, Button, Typography, CircularProgress, Paper
} from "@mui/material";
import axios from "axios";

function ChatBot({ open, onClose }) {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]); 
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    const userMsg = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMsg]); 

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8080/users/chat",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiReply = res.data.response || "No response from AI.";
      const aiMsg = { role: "assistant", content: aiReply };

      setMessages((prev) => [...prev, aiMsg]); 
      setPrompt("");
    } catch (err) {
      console.error("Error chatting with AI:", err);
      setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong." }]);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ backgroundColor: "#fff3e0" }}>Ask the Cooking Assistant 👨‍🍳🔥</DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "#fffaf0",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: "60vh",
          overflowY: "auto",
          pb: 2,
        }}
      >
        {/* Message bubbles */}
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.role === "user" ? "#dcf8c6" : "#f1f0f0",
              color: "#333",
              p: 1.5,
              borderRadius: 2,
              maxWidth: "80%",
              boxShadow: 1,
              whiteSpace: "pre-wrap",
            }}
          >
            <Typography variant="body2" fontWeight="bold">
              {msg.role === "user" ? "You" : "ChefBot"} 🍳
            </Typography>
            <Typography variant="body1">{msg.content}</Typography>
          </Box>
        ))}
      </DialogContent>

      <Box px={3} pb={2}>
        <TextField
          fullWidth
          placeholder="Type your cooking question..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          multiline
          rows={2}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 1 }}
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : "Send"}
        </Button>
      </Box>

      <DialogActions>
        <Button onClick={onClose} color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChatBot;
