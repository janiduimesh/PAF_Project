package com.example.paf.service;
import com.example.paf.DTO.UserDTO;
import com.example.paf.model.User;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    ResponseEntity<Object> createUser(User user);
    UserDTO getUserById(String userId);
    List<UserDTO> getAllUsers();
    // ResponseEntity<Object> followUser(String userId, String followedUserId);
    ResponseEntity<Object> loginUser(String email, String password);  
    ResponseEntity<Object> updateUser(String email, UserDTO request);
    ResponseEntity<?> resetPassword(String email, UserDTO request);

  
    
}
