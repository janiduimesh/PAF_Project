import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  Button 
} from '@mui/material';
import axios from 'axios';
import Header from "../component/TopHeader";
import NaviBar from "../component/NaviBar";
import NaviBar2 from "../component/Navibar2";

const Full_Recipies = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/recipe/${id}`);
        console.log("Fetched recipe:", response.data); // 👈 add this
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
  
    fetchRecipe();
  }, [id]);
  

  if (!recipe) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      <Grid container>
        <Grid xs={12}><Header /></Grid>
      </Grid>

      <Grid container spacing={0} sx={{ display: "flex" }}>
        <Grid item><NaviBar /></Grid>

        <Grid xs>
          <Typography 
            variant="h2" 
            align="center" 
            sx={{ fontFamily: 'Times New Roman', mb: 5,mt:5 }}
          >
            👨‍🍳 {recipe.recipetopic} 👨‍🍳
          </Typography>
          
          <Box component="main" sx={{ px: 0, pt: 0, border: '1px', mt: 4, padding: '40px', width: '100%', boxShadow: 'inset 0 0 10px rgba(113, 113, 113, 0.3)', backgroundColor: '#fdfdfd', position: 'relative', mb: 5 }}>
            
            <Grid container spacing={10} alignItems="flex-start" sx={{ mb: 6, ml: 0, mt: 0 }}>
              <Grid xs={12} md={6}>
                <Box
                  component="img"
                  src={recipe.recipeimageurl}
                  alt="Recipe"
                  sx={{ width: 500, height: 400, borderRadius: 2, ml: 0 }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <Typography variant="h4" sx={{ fontFamily: 'Times New Roman', mb: 3 }}>
                  Ingredients
                </Typography>
                <ul style={{ fontFamily: 'Times New Roman', fontSize: '20px', marginLeft: '30px', lineHeight: '1.8' }}>
                  {recipe.recipeingrediants.split(',').map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                  ))}
                </ul>
              </Grid>
            </Grid>

            <Typography variant="h4" sx={{ fontFamily: 'Times New Roman', mb: 3 }}>
              Making Steps
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontFamily: 'Times New Roman', mb: 4, mx: 0 }}>
              {recipe.recipedescription}
            </Typography>

            <Typography 
              variant="h4" 
              sx={{ fontFamily: 'Times New Roman', mb: 2, ml: 0 }}
            >
              Links
            </Typography>
            {recipe.recipeprimarylink && (
              <Typography sx={{ fontFamily: 'Times New Roman', mb: 1, ml: 0 }}>
                <Box component="span" sx={{ fontSize: '17px' }}>Primary Link: </Box>
                <Link 
                  href={recipe.recipeprimarylink}
                  underline="hover"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ fontSize: '15px' }}
                >
                  {recipe.recipeprimarylink}
                </Link>
              </Typography>
            )}

            {recipe.recipesecondarylink && (
              <Typography sx={{ fontFamily: 'Times New Roman', mb: 1, ml: 0 }}>
                <Box component="span" sx={{ fontSize: '17px' }}>Secondary Link: </Box>
                <Link 
                  href={recipe.recipesecondarylink}
                  underline="hover"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ fontSize: '15px' }}
                >
                  {recipe.recipesecondarylink}
                </Link>
              </Typography>
            )}

            {/* newly added part pdf download button */}
            {/* Bottom-right Download Button */}    
            <Box 
              sx={{ 
                position: 'absolute', 
                bottom: 20, 
                right: 20 
              }}
            >
              <Button 
                variant="contained" 
                color="success" 
                sx={{ 
                  px: 2, 
                  py: 1, 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  borderRadius: 6 
                }}
                href={recipe.recipepdfurl}
                target="_blank"
                download={`Recipe_${recipe.recipetopic}.pdf`}
              >
                📄 Download PDF
              </Button>
            </Box>


          </Box>
          
        </Grid>

        <Grid item>
          <NaviBar2 logUser={JSON.parse(localStorage.getItem("user"))} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Full_Recipies;
