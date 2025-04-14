package com.example.paf.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import com.example.paf.model.Notification;


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
    private List<Notification> notifications;
    private int followersCount;
    private int followingCount;

    
}
