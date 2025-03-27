package com.example.paf.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private String id;
    private String name;
    private String email;
    private String mobileNumber;
    private String profileImage;
    private String profileImageUrl;
    private String password;
    private String role;
    private String currentPassword;
    private String newPassword;
    private String confirmPassword;
    
}
