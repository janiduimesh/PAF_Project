package com.example.paf.dto;

import org.springframework.data.annotation.Transient;
import org.springframework.web.multipart.MultipartFile;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RecipeTO {

    private String id;  // Optional: carry it for updates

    private String userid;
    private String recipetopic;
    private String recipeingrediants;
    private String recipedescription;
    private String recipeprimarylink;
    private String recipesecondarylink;

    @Transient 
    private MultipartFile recipeimage;
}

