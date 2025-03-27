import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import Header from "../components/TopHeader";
import NaviBar from "../components/NaviBar";      // Left sidebar
import NaviBar2 from "../components/Navibar2";    // Right sidebar
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Home = ({ title, children }) => {
  const token = localStorage.getItem("token");
  console.log(token);

  return (
    <Grid container>
      {/* Top Header */}
      <Grid item xs={12}>
        <Header />
      </Grid>

      {/* Main Layout: Left Sidebar + Content + Right Sidebar */}
      <Grid item xs={12} sx={{ display: "flex" }}>
        {/* Left Sidebar */}
        <NaviBar />

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            px: 3,
            pt: 10, // Add padding to push content below the header
          }}
        >
          {/* Optional Page Title */}
          {title && (
            <Typography variant="h4" sx={{ mb: 4 }}>
              {title}
            </Typography>
          )}

          {/* Form */}
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              maxWidth: 600,
              mx: 'auto',
              p: 4,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              required
            />

            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              required
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ px: 4 }}
              >
                Submit
              </Button>
            </Box>
          </Box>

          {/* Children Components */}
          {children}
        </Box>

        {/* Right Sidebar */}
        <NaviBar2 logUser={JSON.parse(localStorage.getItem("user"))} />
      </Grid>
    </Grid>
  );
};

export default Home;
