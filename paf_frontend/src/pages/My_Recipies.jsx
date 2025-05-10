import { useNavigate, useLocation } from 'react-router-dom';
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
import Header from "../components/TopHeader";
import NaviBar from "../components/NaviBar";
import NaviBar2 from "../components/Navibar2";
import Update_Recipies from "./Update_Recipie";
import React, { useEffect, useState } from 'react';
import API from '../api';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          onClick={() => onDelete(recipeId)}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onUpdate(recipeId)}
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
  const userFromState = location.state?.userId;
  const storedUser = JSON.parse(localStorage.getItem("user"));
 const userId = userFromState || storedUser?.email;

  const [recipes, setRecipes] = useState([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      console.log("👤 Resolved userId/email:", userId); // ✅ Log userId
  
      if (userId) {
        try {
          const response = await API.get(`/recipe/user/${userId}`);
          console.log("📥 Response data:", response.data); // ✅ Log API response
          setRecipes(response.data);
        } catch (error) {
          console.error("❌ Error fetching recipes:", error);
        }
      }
    };
  
    fetchUserRecipes();
  }, [userId]);

  const handleUpdateClick = (recipeId) => {
    const selected = recipes.find(recipe => recipe.id === recipeId);
    setSelectedRecipe(selected);
    setOpenUpdateModal(true);
  };

  const handleDeleteClick = async (recipeId) => {
    try {
      await API.delete(`/recipe/delete/${recipeId}`);
      setRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
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
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
      </Grid>

      <Grid container spacing={5} sx={{ display: "flex" }}>
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
              My Recipes
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 0 }}>
              <IconButton onClick={() => navigate('/insertrecipie', { state: { userid: userId } })} sx={{ p: 0, ml: 100 }}>
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
                  recipeId={recipe.id}
                  onUpdate={handleUpdateClick}
                  onDelete={handleDeleteClick}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item>
          <NaviBar2 logUser={JSON.parse(localStorage.getItem("user"))} />
        </Grid>
      </Grid>

      <Dialog
        open={openUpdateModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent>
          <Update_Recipies recipe={selectedRecipe} onClose={handleCloseModal} />
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
