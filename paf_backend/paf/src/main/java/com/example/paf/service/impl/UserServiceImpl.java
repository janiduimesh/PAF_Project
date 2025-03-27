package com.example.paf.service.impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.paf.service.UserService;
import com.example.paf.service.FirebaseStorageService;
import com.example.paf.service.JwtUtil;


import com.example.paf.model.RegistrationSource;
import com.example.paf.model.User;

import com.example.paf.DTO.UserDTO;
import com.example.paf.DTO.UserResDTO;

import com.example.paf.repo.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Map;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class UserServiceImpl implements UserService,UserDetailsService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private FirebaseStorageService firebaseStorageService;

    @Autowired
    private JwtUtil jwtUtil;
    @Override
    public ResponseEntity<Object> createUser(User user) {

        if (user.getSource() == null) {
            if (userRepository.existsByEmail(user.getEmail())) {
                return new ResponseEntity<>("Username already exists", HttpStatus.CONFLICT);
            }

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setSource(RegistrationSource.CREDENTIAL);

            if (user.getProfileImage() != null && !user.getProfileImage().isEmpty()) {
                try {
                    String imageUrl = firebaseStorageService.uploadProfileImage(user.getProfileImage(), user.getEmail());
                    user.setProfileImageUrl(imageUrl);
                } catch (Exception e) {
                    // Handle upload error
                    return new ResponseEntity<>("Failed to upload profile image: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

            User savedUser = userRepository.save(user);
            UserDTO savedUserDTO = new UserDTO();
            BeanUtils.copyProperties(savedUser, savedUserDTO);
            return new ResponseEntity<>("Register Successfully", HttpStatus.OK);
        }

        if(Objects.equals(user.getSource(), RegistrationSource.GOOGLE)){

            String email = user.getEmail();
            if (userRepository.existsByEmail(email)) {
                User googleUser = userRepository.findByEmail(email);
                UserResDTO userDto = new UserResDTO();
                BeanUtils.copyProperties(googleUser, userDto);
                return  new ResponseEntity<>(userDto, HttpStatus.OK);
            }

            User googleUser = new User();
            googleUser.setName(user.getName());
            googleUser.setEmail(user.getEmail());
            // googleUser.setProfileImage(user.getProfileImage());
            googleUser.setSource(RegistrationSource.GOOGLE);
            try {
                userRepository.save(googleUser);
                UserResDTO userDto = new UserResDTO();
                BeanUtils.copyProperties(googleUser, userDto);
                return new ResponseEntity<>("Register Successfully from google", HttpStatus.OK);
            } catch (DataIntegrityViolationException e) {
                return new ResponseEntity<>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return null;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities("USER") 
                .build();
    }


    @Override
    public UserDTO getUserById(String userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            UserDTO userDTO = new UserDTO();
            BeanUtils.copyProperties(optionalUser.get(), userDTO);
            return userDTO;
        }
        return null;
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOs = new ArrayList<>();
        for (User user : users) {
            UserDTO userDTO = new UserDTO();
            BeanUtils.copyProperties(user, userDTO);
            userDTOs.add(userDTO);
        }
        return userDTOs;
    }

    // @Override
    // public ResponseEntity<Object> followUser(String userId, String followedUserId) {
    //     try {
    //         User user= userRepository.findById(userId)
    //                 .orElseThrow(() -> new RuntimeException("User not found with id " + userId));

    //         User followUser = userRepository.findById(followedUserId)
    //                 .orElseThrow(() -> new RuntimeException("User not found with id: " + followedUserId));

    //         if (user.getFollowedUsers() == null) {
    //             user.setFollowedUsers(new ArrayList<>());
    //         }

    //         if (followUser.getFollowingUsers() == null) {
    //             followUser.setFollowingUsers(new ArrayList<>());
    //         }


    //         if (user.getFollowedUsers().contains(followedUserId)) {
    //             user.getFollowedUsers().remove(followedUserId);
    //             followUser.getFollowingUsers().remove(userId);
    //             user.setFollowersCount(user.getFollowersCount() - 1);
    //             followUser.setFollowingCount(followUser.getFollowingCount() -1);
    //             userRepository.save(user);
    //             userRepository.save(followUser);
    //             return new ResponseEntity<>(user, HttpStatus.OK);
    //         } else {
    //             user.getFollowedUsers().add(followedUserId);
    //             followUser.getFollowingUsers().add(userId);
    //             user.setFollowersCount(user.getFollowersCount() + 1);
    //             followUser.setFollowingCount(followUser.getFollowingCount() + 1);
    //             userRepository.save(user);
    //             userRepository.save(followUser);
    //             return new ResponseEntity<>(user, HttpStatus.OK);
    //         }
    //     } catch (RuntimeException e) {
    //         e.printStackTrace();
    //         return new ResponseEntity<>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }


    @Override
    public ResponseEntity<Object> loginUser(String email, String password) {
        System.out.println("Login attempt for email: " + email);

        User user = userRepository.findByEmail(email);
        System.out.println("User fetched: " + user);

        if (user == null || user.getPassword() == null) {
            System.out.println("Invalid user or missing password");
            return new ResponseEntity<>("Invalid password or email", HttpStatus.UNAUTHORIZED);
        }

        System.out.println("Comparing password...");
        if (passwordEncoder.matches(password, user.getPassword())) {
            UserResDTO userDto = new UserResDTO();
            BeanUtils.copyProperties(user, userDto);
            System.out.println("Login success");

            // ✅ Generate JWT token
            String token = jwtUtil.generateToken(user.getEmail());

            // ✅ Return both user and token
            return ResponseEntity.ok(Map.of(
                "user", userDto,
                "token", token
            ));
        } else {
            System.out.println("Password mismatch");
            return new ResponseEntity<>("Invalid password or email", HttpStatus.UNAUTHORIZED);
        }
    }

    @Override
    public ResponseEntity<Object> updateUser(String email, UserDTO request) {
        User user = userRepository.findByEmail(email);
    
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    
        if (request.getName() != null) user.setName(request.getName());
        if (request.getEmail() != null) user.setEmail(request.getEmail());
        if (request.getMobileNumber() != null) user.setMobileNumber(request.getMobileNumber());
        if (request.getProfileImageUrl() != null) user.setProfileImageUrl(request.getProfileImageUrl());
    
        userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    

    @Override
    public ResponseEntity<?> resetPassword(String email, UserDTO request) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            return new ResponseEntity<>("Current password is incorrect", HttpStatus.BAD_REQUEST);
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            return new ResponseEntity<>("New passwords do not match", HttpStatus.BAD_REQUEST);
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return new ResponseEntity<>("Password updated successfully", HttpStatus.OK);
    }



        
        
    }
