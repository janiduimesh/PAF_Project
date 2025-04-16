import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
import Header from "../component/TopHeader";
import NaviBar from "../component/NaviBar";
import NaviBar2 from "../component/Navibar2";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/Full_Recipies/${recipe.id}`); // Pass recipe ID to detail page
  };

  return (
    <Card sx={{ minWidth: 250 }}>
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
          image={recipe.recipeimageurl}
          alt="Recipe"
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
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

//import React, { useEffect, useState } from 'react';
//import axios from 'axios';

const Recipies = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:8081/recipe/all"); // ✅ all recipes
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);


  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
      </Grid>

      <Grid container spacing={5}>
        <Grid item>
          <NaviBar />
        </Grid>

        <Grid item xs>
          <Box sx={{ padding: 2, marginBottom: 4, textAlign: "center" }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              textAlign="center"
              sx={{ fontFamily: 'Times New Roman' }}
            >
              Welcome To Recipe Page
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {recipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item>
        <NaviBar2 logUser={JSON.parse(localStorage.getItem("user"))} />
      </Grid>
      </Grid>
    </Container>
  );
};

export default Recipies;
