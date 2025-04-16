package com.example.paf.contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.paf.dto.RecipeTO;
import com.example.paf.model.Recipe;
import com.example.paf.service.RecipeService;

import java.util.List; 

@RestController
@RequestMapping("/recipe")
public class RecipeController {
    
    @Autowired
    private RecipeService recipeService;

    // @PostMapping("/create")
    // @ResponseStatus(HttpStatus.CREATED)
    // public String createRecipe(@RequestBody RecipeTO recipe){
    //     return recipeService.createRecipe(recipe);
    // }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public String createRecipe(@ModelAttribute RecipeTO recipe) {
        return recipeService.createRecipe(recipe);
    }

    // Get a single recipe by ID
    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable String id) {
        Recipe recipe = recipeService.getRecipeById(id);
        return ResponseEntity.ok(recipe);
    }

    // Get all recipes
    @GetMapping("/all")
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        List<Recipe> recipes = recipeService.getAllRecipes();
        return ResponseEntity.ok(recipes);
    }

    // RecipeController.java
    @GetMapping("user/{userid}")
    public ResponseEntity<List<Recipe>> getRecipesByUserId(@PathVariable String userid) {
    List<Recipe> recipes = recipeService.getRecipesByUserId(userid);
    return ResponseEntity.ok(recipes);
}


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteRecipeById(@PathVariable String id) {
        String responseMessage = recipeService.deleteRecipeById(id);
        return ResponseEntity.ok(responseMessage);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateRecipe(@PathVariable String id, @ModelAttribute RecipeTO updatedRecipe) {
    String response = recipeService.updateRecipe(id, updatedRecipe);
    return ResponseEntity.ok(response);
    }



}

