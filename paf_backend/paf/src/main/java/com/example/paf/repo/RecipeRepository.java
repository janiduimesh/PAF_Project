package com.example.paf.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


import com.example.paf.model.Recipe;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, String>{

    List<Recipe> findByUserid(String userid);

} 