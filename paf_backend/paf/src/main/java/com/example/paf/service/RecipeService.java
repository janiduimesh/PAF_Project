package com.example.paf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.paf.DTO.RecipeTO;
import com.example.paf.model.Recipe;
import com.example.paf.repo.RecipeRepository;

import java.util.List;


@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private FirebaseStorageService firebaseStorageService;

    public String createRecipe(RecipeTO recipeTO, String userEmail) {
        try {
            // Upload image to Firebase and get the URL
            String imageUrl = firebaseStorageService.uploadRecipeImage(
                    recipeTO.getRecipeimage(), userEmail
            );
    
            // Build the Recipe with the image URL and logged-in user's email
            Recipe recipe = Recipe.builder()
                    .userid(userEmail) 
                    .recipetopic(recipeTO.getRecipetopic())
                    .recipeingrediants(recipeTO.getRecipeingrediants())
                    .recipedescription(recipeTO.getRecipedescription())
                    .recipeprimarylink(recipeTO.getRecipeprimarylink())
                    .recipesecondarylink(recipeTO.getRecipesecondarylink())
                    .recipeimageurl(imageUrl)
                    .build();
    
            recipeRepository.save(recipe);
            return "Recipe Created Successfully";
    
        } catch (Exception e) {
            throw new RuntimeException("Error while creating recipe", e);
        }
    }
    

    // Retrieve a recipe by ID
    public Recipe getRecipeById(String id) {
        return recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found with id: " + id));
    }

    // Retrieve all recipes
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    // RecipeService.java
    public List<Recipe> getRecipesByUserId(String userid) {
        return recipeRepository.findByUserid(userid);
    }



    public String deleteRecipeById(String id) {
        try {
            Recipe recipe = recipeRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Recipe not found with id: " + id));
    
            recipeRepository.deleteById(id);
    
            return "Recipe deleted successfully.";
        } catch (Exception e) {
            throw new RuntimeException("Error while deleting recipe", e);
        }
    }
    


    public String updateRecipe(String id, RecipeTO updatedRecipeTO) {
        Recipe existingRecipe = recipeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Recipe not found with id: " + id));
    
        // Check if a new image is provided
        if (updatedRecipeTO.getRecipeimage() != null && !updatedRecipeTO.getRecipeimage().isEmpty()) {
    
            // Upload new image to Firebase
            String newImageUrl = firebaseStorageService.uploadRecipeImage(
                updatedRecipeTO.getRecipeimage(), updatedRecipeTO.getUserid());
            existingRecipe.setRecipeimageurl(newImageUrl);
        }
    
        // Update other fields
        existingRecipe.setUserid(updatedRecipeTO.getUserid());
        existingRecipe.setRecipetopic(updatedRecipeTO.getRecipetopic());
        existingRecipe.setRecipeingrediants(updatedRecipeTO.getRecipeingrediants());
        existingRecipe.setRecipedescription(updatedRecipeTO.getRecipedescription());
        existingRecipe.setRecipeprimarylink(updatedRecipeTO.getRecipeprimarylink());
        existingRecipe.setRecipesecondarylink(updatedRecipeTO.getRecipesecondarylink());
    
        recipeRepository.save(existingRecipe);
        return "Recipe updated successfully";
    }
    
    
    
    

}