package com.example.paf.DTO;

import org.springframework.data.annotation.Transient;
import org.springframework.web.multipart.MultipartFile;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RecipeTO {

    private String id;  

    private String userid;
    private String recipetopic;
    private String recipeingrediants;
    private String recipedescription;
    private String recipeprimarylink;
    private String recipesecondarylink;

    @Transient 
    private MultipartFile recipeimage;
}