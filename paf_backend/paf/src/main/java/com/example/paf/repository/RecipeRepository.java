package com.example.paf.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.paf.model.Recipe;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, String>{

    
} 

