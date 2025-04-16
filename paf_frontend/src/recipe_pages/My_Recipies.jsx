import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Container,
  Dialog,
  DialogContent,
  IconButton,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Header from "../component/TopHeader";
import NaviBar from "../component/NaviBar";
import NaviBar2 from "../component/Navibar2";
import Update_Recipies from "./Update_Recipe"; // Ensure correct path
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// RecipeCard component now accepts an image URL and topic dynamically
const RecipeCard = ({ title, image, onUpdate, recipeId, onDelete }) => {
  return (
    <Card sx={{ minWidth: 250, ml: 0 }}>
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          sx={{ fontFamily: 'Times New Roman' }}
        >
          {title}
        </Typography>
        <Box sx={{ height: 170, backgroundColor: "#f5f5f5" }}>
          <img
            src={image}
            alt={title}
            style={{ width: '220px', height: '170px', borderRadius: '8px', objectFit: 'cover' }}
          />
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
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
          onClick={() => onDelete(recipeId)} // Delete function call
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onUpdate(recipeId)}  // Pass recipeId to the update handler
          sx={{
            borderRadius: '30px',
            fontFamily: 'Times New Roman',
            fontSize: '16px',
            border: '2px solid',
            '&:hover': {
              backgroundColor: '#00008B',
              color: 'white',
              borderColor: 'blue'
            }
          }}
        >
          Update
        </Button>
      </CardActions>
    </Card>
  );
};

const My_Recipies = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  const [recipes, setRecipes] = useState([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);  // To hold selected recipe details

  // Fetch user recipes on component mount
  useEffect(() => {
    const fetchUserRecipes = async () => {
      if (userId) {
        try {
          console.log("User ID in My_Recipies:", userId); // Log the userId

          const response = await axios.get(`http://localhost:8081/recipe/user/${userId}`);
          
          // Log the fetched recipes
          console.log("Fetched recipes:", response.data);

          setRecipes(response.data); // Set the recipes in state
        } catch (error) {
          console.error("Error fetching recipes for user:", error);
        }
      }
    };

    fetchUserRecipes();
  }, [userId]); // Dependency array ensures it re-fetches if userId changes

  // Callback invoked when the Update button is clicked
  const handleUpdateClick = (recipeId) => {
    // Find the recipe by ID
    const selectedRecipe = recipes.find(recipe => recipe.id === recipeId);
    setSelectedRecipe(selectedRecipe); // Set selected recipe data
    setOpenUpdateModal(true); // Open the update modal
  };

  // Delete the recipe from MongoDB (leaving Firebase image intact)
  const handleDeleteClick = async (recipeId) => {
    try {
      // Update the URL to match the backend endpoint
      await axios.delete(`http://localhost:8081/recipe/delete/${recipeId}`);  // Correct URL
      setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== recipeId)); // Remove deleted recipe from state
      console.log(`Recipe with ID ${recipeId} deleted from MongoDB.`);
      toast.success('Recipe successfully deleted!'); 
    } catch (error) {
      console.error("Error deleting recipe:", error);
      toast.error('Failed to delete recipe.'); 
    }
  };

  const handleCloseModal = () => {
    setOpenUpdateModal(false);
  };

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      {/* Top Header */}
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
      </Grid>

      {/* Main Layout: Sidebar, Content, etc. */}
      <Grid container spacing={5} sx={{ display: "flex" }}>
        {/* Left Sidebar */}
        <Grid item>
          <NaviBar />
        </Grid>

        {/* Content */}
        <Grid item xs>
          <Box sx={{ padding: 2, marginBottom: 4, textAlign: "center" }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              textAlign="center"
              sx={{ fontFamily: 'Times New Roman' }}
            >
              My Recipes
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 0 }}>
              <IconButton onClick={() => navigate('/Insert_Recipies', { state: { userid: 'use005' } })} sx={{ p: 0, ml: 100 }}>
                <AddCircleOutlineIcon sx={{ fontSize: 40, color: 'black' }} />
              </IconButton>
            </Box>
          </Box>

          <Grid container spacing={5}>
            {recipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
                <RecipeCard
                  title={recipe.recipetopic}
                  image={recipe.recipeimageurl}
                  recipeId={recipe.id}  // Pass recipeId to the card
                  onUpdate={handleUpdateClick}  // Pass the update handler
                  onDelete={handleDeleteClick} // Pass the delete handler
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Sidebar */}
        <Grid item>
          <NaviBar2 logUser={JSON.parse(localStorage.getItem("user"))} />
        </Grid>
      </Grid>

      {/* Dialog Popup for updating recipes */}
      <Dialog
        open={openUpdateModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent>
          {/* Pass the selectedRecipe prop to the Update_Recipies form */}
          <Update_Recipies recipe={selectedRecipe} onClose={handleCloseModal} />
          {/* Optionally, add a close button here */}
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleCloseModal}
              sx={{
                borderRadius: 5,
                bgcolor: 'white',
                color: 'black',
                border: '1px solid black',
                '&:hover': {
                  bgcolor: 'black',
                  color: 'white',
                  border: '1px solid black',
                },
              }}
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </Container>
  );
};


export default My_Recipies;
