import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Grid
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import Header from "../component/TopHeader";
import NaviBar from "../component/NaviBar";      
import NaviBar2 from "../component/Navibar2";

import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Insert_Recipies = () => {
  const initialFormState = {
    topic: '',
    ingredients: '',
    description: '',
    link1: '',
    link2: '',
    image: null,
    pdf: null // New state for the PDF file
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);          
  const [imagePreview, setImagePreview] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null);            // State to preview the PDF file name
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const location = useLocation();
  const userId = location.state?.userid;

  if (!userId) {
    return (
      <Typography variant="h6" color="error" sx={{ mt: 10, ml: 30 }}>
        User not found. Please navigate from the My_Recipe page.
      </Typography>
    );
  }

  const handleChange = (e) => {                              //added some changers
    const { name, value, files } = e.target;

    if (name === 'image') {
      const file = files[0];
      if (file && file.type.startsWith('image/')) {
        setFormData({ ...formData, image: file });
        setImagePreview(URL.createObjectURL(file));
        setError('');
      } else {
        setError('Please select a valid image file.');
        setFormData({ ...formData, image: null });
        setImagePreview(null);
      }
    } else if (name === 'pdf') {
      const file = files[0];
      if (file && file.type === 'application/pdf') {
        setFormData({ ...formData, pdf: file });
        setPdfPreview(file.name); // Preview PDF file name
        setError('');
      } else {
        setError('Please select a valid PDF file.');
        setFormData({ ...formData, pdf: null });
        setPdfPreview(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      setError('Please upload a valid image.');
      return;
    }

    const data = new FormData();
    data.append('userid', userId);
    data.append('recipetopic', formData.topic);
    data.append('recipeingrediants', formData.ingredients);
    data.append('recipedescription', formData.description);
    data.append('recipeprimarylink', formData.link1);
    data.append('recipesecondarylink', formData.link2);
    data.append('recipeimage', formData.image);

    // Append PDF if provided
    if (formData.pdf) {
      data.append('recipepdf', formData.pdf);            //newly added
    }

    try {
      const response = await fetch('http://localhost:8081/recipe/create', {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        setSuccessMessage('Recipe submitted successfully!');
        toast.success("Recipe submitted successfully!");
        setFormData(initialFormState);
        setImagePreview(null);
        setPdfPreview(null); 
      } else {
        const text = await response.text();
        setError(`Error: ${text}`);
        toast.error(`Error: ${text}`);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      toast.error(`Error: ${err.message}`);
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setImagePreview(null);
    setPdfPreview(null);                   //newly added
    setError('');
    setSuccessMessage('');
  };

  return (
    <Grid container>
      <Grid item xs={12}><Header /></Grid>

      <Grid item xs={12} sx={{ display: "flex" }}>
        <NaviBar />

        <Container maxWidth="sm" sx={{ ml: 30, mt: 5 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ top: 50, left: -200 }}>
            <ArrowBackIcon fontSize="large" />
          </IconButton>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5, mb: 5, p: 4, border: '1px solid black', borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Submit Your Recipe</Typography>

            <TextField fullWidth label="Topic" name="topic" value={formData.topic} onChange={handleChange} required margin="normal" />
            <TextField fullWidth label="Ingredients" name="ingredients" value={formData.ingredients} onChange={handleChange} required multiline rows={3} margin="normal" />
            <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} required multiline rows={6} inputProps={{ maxLength: 10000 }} margin="normal" />
            <Typography variant="body2">Word count: {formData.description.trim().split(/\s+/).filter(Boolean).length}</Typography>

            <TextField fullWidth label="Link 1" name="link1" type="url" value={formData.link1} onChange={handleChange} margin="normal" />
            <TextField fullWidth label="Link 2" name="link2" type="url" value={formData.link2} onChange={handleChange} margin="normal" />

            <Box sx={{ my: 2 }}>
              <Typography variant="body1">Upload Image</Typography>
              <input type="file" name="image" accept="image/*" onChange={handleChange} />
              {error && <Typography color="error">{error}</Typography>}
              {successMessage && <Typography color="success.main">{successMessage}</Typography>}
              {imagePreview && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">Image Preview:</Typography>
                  <Box component="img" src={imagePreview} alt="Preview" sx={{ width: '50%', maxHeight: 200, objectFit: 'cover' }} />
                </Box>
              )}
            </Box>

              {/* newly added part */}

            <Box sx={{ my: 2 }}>
              <Typography variant="body1">Upload PDF</Typography>
              <input type="file" name="pdf" accept="application/pdf" onChange={handleChange} />
              {pdfPreview && <Typography variant="body2">Selected PDF: {pdfPreview}</Typography>}
            </Box>

            <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
              <Grid item>
                <Button onClick={handleReset} variant="outlined" color="secondary" 
                sx={{bgcolor: 'white',
                  borderRadius:6,
                  color: 'black',
                  border: '1px solid black',
                  '&:hover': {
                    bgcolor: 'black',
                    color: 'white',
                    border: '1px solid black',}}}>
                  Reset
                </Button>
              </Grid>
              <Grid item>
                <Button type="submit" variant="outlined" color="primary" 
                sx={{bgcolor: 'white',
                  color: 'black',
                  border: '1px solid black',
                  borderRadius:6,
                  '&:hover': {
                    bgcolor: 'black',
                    color: 'white',
                    border: '1px solid black',}}}>
                  Submit Recipe</Button>
              </Grid>
            </Grid>
          </Box>
        </Container>

        <NaviBar2 logUser={{ userid: userId }} />
      </Grid>

      {/* Toast Container */}
      <ToastContainer />
    </Grid>
  );
};

export default Insert_Recipies;
