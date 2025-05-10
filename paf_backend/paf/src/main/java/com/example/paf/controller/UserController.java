package com.example.paf.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.paf.DTO.ForgotPasswordRequest;
import com.example.paf.DTO.ResetPasswordConfirmRequest;
import com.example.paf.DTO.UserDTO;
import com.example.paf.model.User;
import com.example.paf.model.Notification;
import com.example.paf.repo.UserRepository;
import com.example.paf.service.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.MediaType;
import java.util.Map;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;



@RestController
@RequestMapping("/users")

public class UserController {

    @Autowired
    private  UserRepository userRepository;

     @Autowired
    private UserService userService;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${groq.api.key}")
    private String groqApiKey;


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

    @PostMapping("/{userId}/follow/{followedUserId}")
    public ResponseEntity<Object> followUser(
        @PathVariable String userId,
        @PathVariable String followedUserId) {
        return userService.followUser(userId, followedUserId);
    }

    @GetMapping("/{userId}/notifications")
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable String userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));
    return ResponseEntity.ok(user.getNotifications());
}


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
    @PutMapping(value = "/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateUser(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("mobileNumber") String mobileNumber,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {
        return userService.updateUser(userDetails.getUsername(), name, email, mobileNumber, file);
    }

    @PutMapping("/resetpassword")
    public ResponseEntity<?> resetPassword(
        @AuthenticationPrincipal UserDetails userDetails,
        @RequestBody UserDTO request) {

        return userService.resetPassword(userDetails.getUsername(), request);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<?> deleteUserById(@PathVariable String id) {
            return userService.deleteUserById(id);
        }

            
        @PutMapping("/{userId}/notifications/mark-all-read")
        public ResponseEntity<String> markAllNotificationsAsRead(@PathVariable String userId) {
            User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
            if (user.getNotifications() != null) {
                user.getNotifications().forEach(n -> n.setRead(true));
            }
        
            userRepository.save(user);
            return ResponseEntity.ok("Marked all as read");
        }


        @PostMapping("/forgot-password")
            public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
                return userService.sendPasswordResetToken(request.getEmail());
            }

        @PostMapping("/reset-password-confirm")
            public ResponseEntity<?> resetPasswordConfirm(@RequestBody ResetPasswordConfirmRequest request) {
                return userService.resetPasswordWithToken(request);
            }

        @PostMapping("/chat")
        public ResponseEntity<?> chatWithGroq(
                @AuthenticationPrincipal UserDetails userDetails,
                @RequestBody Map<String, String> payload
        ) {
            try {
                String userPrompt = payload.get("prompt");

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                headers.setBearerAuth(groqApiKey);

                Map<String, Object> body = Map.of(
                    "model", "llama3-8b-8192",
                    "messages", List.of(
                        Map.of("role", "system", "content", "You are a friendly and expert cooking assistant. Only answer cooking-related questions like recipes, ingredients, and kitchen techniques. If the question is not about cooking, politely decline with very short reply."),
                        Map.of("role", "user", "content", userPrompt)
                    )
                );
                

                HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

                ResponseEntity<String> response = restTemplate.postForEntity(
                        "https://api.groq.com/openai/v1/chat/completions",
                        request,
                        String.class
                );

                ObjectMapper mapper = new ObjectMapper();
                JsonNode root = mapper.readTree(response.getBody());

                String aiReply = root
                        .path("choices")
                        .get(0)
                        .path("message")
                        .path("content")
                        .asText();

                return ResponseEntity.ok(Map.of("response", aiReply));

            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("error", "AI chat failed", "details", e.getMessage()));
            }
        }

            

        
            
}
