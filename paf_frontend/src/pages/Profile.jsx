import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Avatar, Paper, Button } from "@mui/material";
import Header from "../components/TopHeader";
import NaviBar from "../components/NaviBar";
import NaviBar2 from "../components/Navibar2";
import API from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import Lottie from "lottie-react";
import cookingAnim from "../images/Anime.json";
import UpdateProfileDialog from "./UpdateProfileDialog";
import ResetPasswordDialog from "./ResetPasswordDialog"; 




const Profile = () => {
  const [user, setUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/me");
        setUser(res.data);
      } catch (err) {
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleResetPassword = () => {
    toast("Reset Password feature coming soon!");

    // navigate("/reset-password");
  };
  
  const handleDelete = async () => {
    try {
      await API.delete(`/users/${user.id}`);
      toast.success("Profile deleted");
      localStorage.clear();
      navigate("/register");
    } catch (err) {
      toast.error("Failed to delete profile");
    }
  };

  const handleUpdate = () => {
    navigate("/update-profile");
  };

  return (
    <Grid container>
      {/* Top Header */}
      <Grid item xs={12}>
        <Header />
      </Grid>

      {/* Layout with sidebars */}
      <Grid item xs={12} sx={{ display: "flex", pt: "64px" }}>
        {/* Left Sidebar */}
        <NaviBar />
    
        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            px: 3,
            pt: 0,
            
          }}
        >
          {user ? (
            <Paper
              elevation={3}
              sx={{
                maxWidth: 800,
                mx: "auto",
                p: 4,
                mt:2,
                borderRadius: 2,
                boxShadow: 1,
                textAlign: "center",
                background: 'linear-gradient(145deg,rgb(254, 194, 194),rgb(248, 245, 158))',
                boxShadow: '5px 5px 30px rgba(0.4, 0.4, 0, 0.4)',

              }}
            >
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 ,mt:2}}>
                    PROFILE DETAILS
                </Typography> 
              <Avatar
                src={user.profileImageUrl}
                alt={user.name}
                sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
              />
              <Typography variant="h5" fontWeight="bold">
                {user.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user.email}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                <strong>Mobile:</strong> {user.mobileNumber}
              </Typography>

              <Box display="flex" justifyContent="center" gap={4} mt={3}>
              {/* Following Card */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(0, 0, 0, 0.2)',
                  minWidth: 120,
                  textAlign: 'center',
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  {user.followingCount}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Following
                </Typography>
              </Paper>

              {/* Followers Card */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(0, 0, 0, 0.2)',
                  minWidth: 120,
                  textAlign: 'center',
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  {user.followersCount}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Followers
                </Typography>
              </Paper>
            </Box>

            
              <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "center" }}>
                <Button variant="contained" color="primary"  onClick={() => setEditOpen(true)}>
                  Update Profile
                </Button>

                    <UpdateProfileDialog
                    open={editOpen}
                    onClose={() => setEditOpen(false)}
                    onSuccess={() => window.location.reload()} 
                    />

                    <Button variant="outlined" onClick={() => setResetOpen(true)}>
                    Reset Password
                    </Button>

                    <ResetPasswordDialog
                    open={resetOpen}
                    onClose={() => setResetOpen(false)}
                    />
                    
                <Button variant="contained" color="error" onClick={handleDelete}>
                Delete Profile
                </Button>

              </Box>

              <Box sx={{ width: 130,height:100, mx: "auto", mt:4, }}>
    <Lottie animationData={cookingAnim} loop={true} />
  </Box>
              
            </Paper>
          ) : (
            <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 300,
              mx: "auto",
              maxWidth: 400,
              bgcolor: "#ffffff",
        
              p: 4,
              textAlign: "center",
            }}
          >
            <CircularProgress color="primary" />
            <Typography variant="h6" mt={2} fontWeight="bold">
              Loading Profile...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please wait while we fetch your information.
            </Typography>
          </Box>
          
          )}
        </Box>

        {/* Right Sidebar */}
        <Box sx={{ pt: 8 }}>
          <NaviBar2 logUser={JSON.parse(localStorage.getItem("user"))} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Profile;
