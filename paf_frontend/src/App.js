// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Recipe_Home from './recipe_pages/Recipe_Home'; // Make sure this path is correct
import MyUploads from './recipe_pages/My_Uploads';
import MyRecipies from './recipe_pages/My_Recipies';
import UpdateRecipies from './recipe_pages/Update_Recipe';
import InsertRecipies from './recipe_pages/Insert_Recipies';
import Recipies from './recipe_pages/Recipies';
import FullRecipies from './recipe_pages/Full_Recipies';



const App = () => {
  return (
    <Router>
      {/* Navigation Bar */}
      <nav style={{ display: "flex", gap: "20px", padding: "20px", borderBottom: "1px solid #ccc" }}>
        <Link to="/"></Link>
        <Link to="/My_Uploads"></Link>
        <Link to="/My_Recipies"></Link>
        <Link to="/Update_Recipies"></Link>
        <Link to="/Insert_Recipies"></Link>
        <Link to="/Recipies"></Link>
        <Link to="/Full_Recipies"></Link>
      </nav>

      {/* Route Definitions */}
      <Routes>
        <Route path="/" element={<Recipe_Home />} />
        <Route path="/My_Uploads" element={<MyUploads />} />
        <Route path="/My_Recipies" element={<MyRecipies />} />
        <Route path="/Update_Recipies" element={<UpdateRecipies />} />
        <Route path="/Insert_Recipies" element={<InsertRecipies />} />
        <Route path="/Recipies" element={<Recipies />} />
        <Route path="/Full_Recipies/:id" element={<FullRecipies />} />
        {/* Add other routes here as needed */}
      </Routes>
    </Router>

    
  );
};

export default App;
