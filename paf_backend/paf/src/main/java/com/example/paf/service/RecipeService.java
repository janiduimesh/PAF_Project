package com.example.paf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.paf.dto.RecipeTO;
import com.example.paf.model.Recipe;
import com.example.paf.repository.RecipeRepository;

//import java.io.IOException;
import java.util.List;


@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private FirebaseStorageService firebaseStorageService;

    public String createRecipe(RecipeTO recipeTO) {
        try {
            // Upload image to Firebase and get the URL
            String imageUrl = firebaseStorageService.uploadrecipeImage(
                recipeTO.getRecipeimage(), recipeTO.getUserid()
            );

            // Upload pdf to Firebase and get the URL -> newly added part
            String pdfUrl = null;
            if (recipeTO.getRecipepdf() != null && !recipeTO.getRecipepdf().isEmpty()) {
                pdfUrl = firebaseStorageService.uploadRecipePDF(recipeTO.getRecipepdf(), recipeTO.getUserid());
            }

            // Build the Recipe with the image URL
            Recipe recipe = Recipe.builder()
                    // .recipeid(recipeTO.getRecipeid())
                    .userid(recipeTO.getUserid())
                    .recipetopic(recipeTO.getRecipetopic())
                    .recipeingrediants(recipeTO.getRecipeingrediants())
                    .recipedescription(recipeTO.getRecipedescription())
                    .recipeprimarylink(recipeTO.getRecipeprimarylink())
                    .recipesecondarylink(recipeTO.getRecipesecondarylink())
                    .recipeimageurl(imageUrl) 
                    .recipepdfurl(pdfUrl)      //pdf URL new part
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
    
            // ❌ Don't delete the image from Firebase
            // ✅ Just delete the recipe from MongoDB
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
            // Delete old image from Firebase
            // firebaseStorageService.deleterecipeImage(existingRecipe.getRecipeimageurl());
    
            // Upload new image to Firebase
            String newImageUrl = firebaseStorageService.uploadrecipeImage(updatedRecipeTO.getRecipeimage(), updatedRecipeTO.getUserid());
            existingRecipe.setRecipeimageurl(newImageUrl);
        }

        // Upload new pdf to Firebase -> newly added part
        if (updatedRecipeTO.getRecipepdf() != null && !updatedRecipeTO.getRecipepdf().isEmpty()) {
            String newPdfUrl = firebaseStorageService.uploadRecipePDF(updatedRecipeTO.getRecipepdf(), updatedRecipeTO.getUserid());
            existingRecipe.setRecipepdfurl(newPdfUrl);
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
