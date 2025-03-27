package com.example.paf.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.annotation.Transient;

@Document(collection = "users")
@Data  
@NoArgsConstructor  
@AllArgsConstructor 
public class User {

    @Id
    private String id;
    private String name;
    private String email;
    private String password; 
    private String mobileNumber;
    private String profileImageUrl;
    // private String profileImage;
    private String role;
    private RegistrationSource source; 

    @Transient
    private transient MultipartFile profileImage;
    
}
