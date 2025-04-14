package com.example.paf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.paf.dto.RecipeTO;
import com.example.paf.model.Recipe;
import com.example.paf.repository.RecipeRepository;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private FirebaseStorageService firebaseStorageService;

    public String createRecipe(RecipeTO recipeTO) {
        try {
            // Upload image to Firebase and get the URL
            String imageUrl = firebaseStorageService.uploadProfileImage(
                recipeTO.getRecipeimage(), recipeTO.getUserid()
            );

            // Build the Recipe with the image URL
            Recipe recipe = Recipe.builder()
                    .userid(recipeTO.getUserid())
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
}
