package com.example.paf.model;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Builder;
import lombok.Data;

@Document(collection = "recipe")
@Data
@Builder
public class Recipe {

    private String userid;
    private String recipetopic;
    private String recipeingrediants;
    private String recipedescription;
    private String recipeprimarylink;
    private String recipesecondarylink;
    private String recipeimageurl;

}

