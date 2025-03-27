package com.example.paf.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.paf.DTO.UserDTO;
import com.example.paf.model.User;
import com.example.paf.repo.UserRepository;
import com.example.paf.service.UserService;
import org.springframework.http.MediaType;



@RestController
@RequestMapping("/users")

public class UserController {

    @Autowired
    private  UserRepository userRepository;

     @Autowired
    private UserService userService;

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> createUser(@ModelAttribute User user) {
    return userService.createUser(user);
    }

    @GetMapping("/{userId}")
    public UserDTO getUserById(@PathVariable String userId) {
        return userService.getUserById(userId);
    }

    @GetMapping("/all")
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    // @PostMapping("/follow")
    // public ResponseEntity<Object> followUser(@RequestParam String userId, @RequestParam String FollowedUserId) {
    //     return userService.followUser(userId,FollowedUserId);
    // }
    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody User user) {

        return userService.loginUser(user.getEmail(), user.getPassword());

    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        // Fetch the user from the database by email (or username)
        User user = userRepository.findByEmail(userDetails.getUsername());

        if (user == null) {
            return ResponseEntity.status(404).body(null); // Not Found
        }

        return ResponseEntity.ok(user); 
}
        @PutMapping("/update")
        public ResponseEntity<Object> updateUser(
                @AuthenticationPrincipal UserDetails userDetails,
                @RequestBody UserDTO request
        ) {
            return userService.updateUser(userDetails.getUsername(), request);
        }


        @PutMapping("/resetpassword")
        public ResponseEntity<?> resetPassword(
        @AuthenticationPrincipal UserDetails userDetails,
        @RequestBody UserDTO request) {

        return userService.resetPassword(userDetails.getUsername(), request);
        }
}
