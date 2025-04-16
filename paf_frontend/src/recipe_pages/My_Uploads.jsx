//import React from 'react'
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Grid, Box} from "@mui/material";
import Header from "../component/TopHeader";
import NaviBar from "../component/NaviBar";      
import NaviBar2 from "../component/Navibar2";    
//import TextField from '@mui/material/TextField';
import recipeimg from '../images/recipe.png'
import React, { useEffect } from 'react';
import recipeimg2 from '../images/recipepostimg.jpg'



const My_Uploads = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify({ userid: "use005" }));
  }, []);

  const handleClick = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.userid : null;

    if (userId) {
      navigate("/My_Recipies", { state: { userId } });
    } else {
      console.error("User not logged in or user ID not found.");
    }
  };

  // rest of the component...


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

      <Grid container spacing={3} justifyContent="center" sx={{ mt: 5 }}>
      <Grid item>
        <Box
        sx={{
          mt:0,
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
          src={recipeimg} // Replace with your image path
          alt="Recipies"
          style={{
            width: '90%',
            height: 'auto',
            borderRadius: '8px',
            marginBottom: '8px',
          }}
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
          ml:10,
          mt:0,
          border: '1px solid #ccc',
          borderRadius: 2,
          textAlign: 'center',
          boxShadow: 3,
        }}
      >
        <img
          src={recipeimg2}
          alt="Recipies"
          style={{
            width: '90%',
            height: 'auto',
            borderRadius: '8px',
            marginBottom: '8px',
          }}
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

      {/* Right Sidebar */}
      <NaviBar2 logUser={JSON.parse(localStorage.getItem("user"))} />
    </Grid>
  </Grid>



  );
};

export default My_Uploads;
