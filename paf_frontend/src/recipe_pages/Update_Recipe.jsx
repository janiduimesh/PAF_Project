import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Grid
} from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update_Recipies = ({ recipe, onClose }) => {
  const initialFormState = {
    topic: '',
    ingredients: '',
    description: '',
    link1: '',
    link2: '',
    image: null,
    pdf: null
  };

  const [formData, setFormData] = useState(initialFormState);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const userId = localStorage.getItem("userId") || recipe.userid || '';

  useEffect(() => {
    if (recipe) {
      setFormData({
        topic: recipe.recipetopic || '',
        ingredients: recipe.recipeingrediants || '',
        description: recipe.recipedescription || '',
        link1: recipe.recipeprimarylink || '',
        link2: recipe.recipesecondarylink || '',
        image: null,
        pdf: null
      });

      setImagePreview(recipe.recipeimageurl || null);
    }
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      const file = files[0];
      if (files.length > 1) {
        setError('Only one image can be uploaded.');
        return;
      }

      if (file && file.type.startsWith('image/')) {
        setFormData(prev => ({ ...prev, image: file }));
        setImagePreview(URL.createObjectURL(file));
        setError('');
      } else {
        setError('Please select a valid image file.');
      }
    } else if (name === 'pdf') {
      const file = files[0];
      if (files.length > 1) {
        setError('Only one PDF can be uploaded.');
        return;
      }

      if (file && file.type === 'application/pdf') {
        setFormData(prev => ({ ...prev, pdf: file }));
        setError('');
      } else {
        setError('Please select a valid PDF file.');
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("id", recipe.id);
    if (userId) {
      data.append("userid", userId);
    } else if (recipe.userid) {
      data.append("userid", recipe.userid);
    }

    data.append("recipetopic", formData.topic || recipe.recipetopic);
    data.append("recipeingrediants", formData.ingredients || recipe.recipeingrediants);
    data.append("recipedescription", formData.description || recipe.recipedescription);
    data.append("recipeprimarylink", formData.link1 || recipe.recipeprimarylink);
    data.append("recipesecondarylink", formData.link2 || recipe.recipesecondarylink);

    if (formData.image) {
      data.append("recipeimage", formData.image);
    } else {
      data.append("existingImageUrl", recipe.recipeimageurl);
    }

    if (formData.pdf) {                             //newly added part
      data.append("recipepdf", formData.pdf);
    } else {
      data.append("existingPdfUrl", recipe.recipepdfurl);
    }

    try {
      const response = await axios.put(`http://localhost:8081/recipe/update/${recipe.id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        toast.success('Recipe updated successfully!');
        onClose();
      }
    } catch (err) {
      console.error("Error updating recipe:", err);
      toast.error('Failed to update recipe. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5, mb: 5, p: 4, border: '1px solid black', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center">Update Your Recipe</Typography>

        <TextField
          fullWidth
          label="Topic"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          multiline
          rows={3}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={6}
          inputProps={{ maxLength: 40000 }}
          margin="normal"
        />
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Word count: {formData.description.trim().split(/\s+/).filter(Boolean).length}
        </Typography>

        <TextField
          fullWidth
          label="Link 1"
          name="link1"
          type="url"
          value={formData.link1}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Link 2"
          name="link2"
          type="url"
          value={formData.link2}
          onChange={handleChange}
          margin="normal"
        />

        <Box sx={{ my: 2 }}>
          <Typography variant="body1">Upload Image</Typography>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          {error && (
            <Typography variant="body2" color="error">{error}</Typography>
          )}
          {imagePreview && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">Image Preview:</Typography>
              <Box
                component="img"
                src={imagePreview}
                alt="Preview"
                sx={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 1 }}
              />
            </Box>
          )}
        </Box>

          {/* newly added one - pdf part view current pdf and update part */}
        <Box sx={{ my: 2 }}>
          <Typography variant="body1">Upload PDF</Typography>
          <input
            type="file"
            name="pdf"
            accept="application/pdf"
            onChange={handleChange}
          />
          {error && (
            <Typography variant="body2" color="error">{error}</Typography>
          )}
          {recipe.recipepdfurl && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">Current PDF:</Typography>
              <a
                href={recipe.recipepdfurl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'blue', textDecoration: 'underline' }}
              >
                View Current PDF
              </a>
            </Box>
          )}
        </Box>

        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ px: 4, py: 1.5, 
                borderRadius: '30px', 
                textTransform: 'none',
                bgcolor: 'white',
                color: 'black',
                border: '1px solid black',
                '&:hover': {
                  bgcolor: 'black',
                  color: 'white',
                  border: '1px solid black',
               }}}
            >
              Update Recipe
            </Button>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default Update_Recipies;
