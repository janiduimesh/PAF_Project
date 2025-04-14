package com.example.paf.controller;


import com.example.paf.model.RegistrationSource;
import com.example.paf.model.User;
import com.example.paf.DTO.UserResDTO;
import com.example.paf.repo.UserRepository;

import com.example.paf.service.UserService;
import com.example.paf.service.JwtUtil;

import org.springframework.http.HttpHeaders; 

import lombok.RequiredArgsConstructor;

import java.net.URI;
import java.util.Map;


import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    private final UserService userService;

    private final PasswordEncoder passwordEncoder;


    @Value("${app.frontend.url}")
    private String frontendUrl;

    @GetMapping("/")
    public ResponseEntity<Void> redirectToFrontend() {
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(frontendUrl));
        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }

    // @PostMapping("/login")
    // public ResponseEntity<?> login(@RequestBody UserResDTO req) {
    //     User user = userRepository.findByEmail(req.getEmail());
    
    //     if (user == null || !passwordEncoder.matches(req.getPassword(), user.getPassword())) {
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    //     }
    
    //     String token = jwtUtil.generateToken(user.getEmail());
    
    //     return ResponseEntity.ok(Map.of("token", token));
    // }
    

    @GetMapping("/user")
    public ResponseEntity<Object> getUsername(@AuthenticationPrincipal OAuth2User principal) {
    if (principal != null) {
        String name = principal.getAttribute("name");
        String email = principal.getAttribute("email");

        User user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setSource(RegistrationSource.GOOGLE);

        return userService.createUser(user);
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}

}
