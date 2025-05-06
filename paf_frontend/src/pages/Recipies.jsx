import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
} from '@mui/material';
import Header from "../components/TopHeader";
import NaviBar from "../components/NaviBar";
import NaviBar2 from "../components/Navibar2";
import API from "../api";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/fullrecipies/${recipe.id}`);
  };

  return (
    <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Typography
          variant="h6"
          textAlign="center"
          gutterBottom
          sx={{ fontFamily: 'Times New Roman' }}
        >
          {recipe.recipetopic}
        </Typography>
        <CardMedia
          component="img"
          height="170"
          image={recipe.recipeimageurl || "https://via.placeholder.com/150"}
          alt="Recipe"
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "center", mt: "auto" }}>
        <Button
          onClick={handleViewMore}
          variant="outlined"
          color="error"
          sx={{
            borderRadius: '30px',
            fontFamily: 'Times New Roman',
            fontSize: '16px',
            border: '2px solid',
            '&:hover': {
              backgroundColor: '#8B0000',
              color: 'white',
              borderColor: 'red'
            }
          }}
        >
          View More
        </Button>
      </CardActions>
    </Card>
  );
};

const Recipies = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await API.get("/recipe/all");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>

        {/* Left Sidebar */}
        <Grid item md={2}>
          <NaviBar />
        </Grid>

        {/* Center Content */}
        <Grid item xs={12} md={8}>
          <Box sx={{ padding: 2, marginBottom: 4, textAlign: "center" }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ fontFamily: 'Times New Roman', backgroundColor: 'rgb(255, 235, 205)'}}
            >
              Welcome To Recipe Page
            </Typography>
          </Box>

          <Grid container spacing={3} justifyContent="center">
            {recipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
                <RecipeCard  recipe={recipe} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Sidebar */}
        <Grid item md={2}>
          <NaviBar2 logUser={JSON.parse(localStorage.getItem("user"))} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Recipies;
