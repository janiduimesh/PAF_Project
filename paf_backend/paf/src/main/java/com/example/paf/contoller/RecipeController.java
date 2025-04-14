package com.example.paf.contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


import com.example.paf.dto.RecipeTO;
import com.example.paf.service.RecipeService;

@RestController
@RequestMapping("/recipe")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;
    
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public String createRecipe(@ModelAttribute RecipeTO recipe) {
        return recipeService.createRecipe(recipe);
    }
}
