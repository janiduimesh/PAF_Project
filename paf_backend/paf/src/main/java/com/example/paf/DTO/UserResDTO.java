package com.example.paf.DTO;

import com.example.paf.model.RegistrationSource;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserResDTO {

    private String id;

    private String name;

    private String email;

    private String password;

    private String profileImageUrl;

    private RegistrationSource source;

    private List<String> followedUsers;
    
}
