import React, { useEffect, useState } from 'react';
import { Button, Grid, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from "../components/TopHeader";
import NaviBar from "../components/NaviBar";
import NaviBar2 from "../components/Navibar2";
import recipeimg from '../images/recipe.png';
import recipeimg2 from '../images/recipepostimg.jpg';
import API from '../api';

const My_Uploads = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // ✅ Fetch user email from secure endpoint
    API.get("/users/me")
      .then(res => {
        setUserEmail(res.data.email);
      })
      .catch(err => {
        console.error("Failed to fetch user:", err);
      });
  }, []);

  const handleClick = () => {
    if (userEmail) {
      navigate("/myrecipies", { state: { userId: userEmail } });
    } else {
      console.error("User not logged in or user ID not found.");
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>

      <Grid item xs={12} sx={{ display: "flex" }}>
        <NaviBar />

        <Grid container spacing={3} justifyContent="center" sx={{ mt: 5 }}>
          <Grid item>
            <Box
              sx={{
                mt: 0,
                ml: 10,
                width: '350px',
                padding: 2,
                border: '1px solid #ccc',
                borderRadius: 2,
                textAlign: 'center',
                boxShadow: 3,
              }}
            >
              <img
                src={recipeimg}
                alt="Recipies"
                style={{ width: '90%', borderRadius: '8px', marginBottom: '8px' }}
              />
              <Button
                variant="contained"
                onClick={handleClick}
                sx={{
                  borderRadius: 5,
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: '1px solid #000000',
                  '&:hover': {
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    border: '1px solid #000000',
                  },
                  width: '90%',
                  height: '50px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  mt: 2,
                }}
              >
                Go to My Recipies
              </Button>
            </Box>
          </Grid>

          <Grid item>
            <Box
              sx={{
                width: '350px',
                padding: 2,
                ml: 10,
                mt: 0,
                border: '1px solid #ccc',
                borderRadius: 2,
                textAlign: 'center',
                boxShadow: 3,
              }}
            >
              <img
                src={recipeimg2}
                alt="Recipies"
                style={{ width: '90%', borderRadius: '8px', marginBottom: '8px' }}
              />
              <Button
                variant="contained"
                onClick={handleClick}
                sx={{
                  borderRadius: 5,
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: '1px solid #000000',
                  '&:hover': {
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    border: '1px solid #000000',
                  },
                  width: '90%',
                  height: '50px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  mt: 2,
                }}
              >
                Go to My Posts
              </Button>
            </Box>
          </Grid>
        </Grid>

        <NaviBar2 logUser={{ email: userEmail }} />
      </Grid>
    </Grid>
  );
};

export default My_Uploads;
