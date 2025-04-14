package com.example.paf.service;
import com.example.paf.DTO.ResetPasswordConfirmRequest;
import com.example.paf.DTO.UserDTO;
import com.example.paf.model.User;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface UserService {

    ResponseEntity<Object> createUser(User user);
    UserDTO getUserById(String userId);
    List<UserDTO> getAllUsers();
    // ResponseEntity<Object> followUser(String userId, String followedUserId);
    ResponseEntity<Object> followUser(String userId, String followedUserId);

    ResponseEntity<Object> loginUser(String email, String password);  
    ResponseEntity<?> updateUser(String email, String name, String emailInput, String mobile, MultipartFile file);
    ResponseEntity<?> resetPassword(String email, UserDTO request);

    ResponseEntity<?> sendPasswordResetToken(String email);
    ResponseEntity<?> resetPasswordWithToken(ResetPasswordConfirmRequest request);

    ResponseEntity<?> deleteUserById(String userId);


  
    
}
