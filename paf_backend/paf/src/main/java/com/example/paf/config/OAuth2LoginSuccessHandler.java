package com.example.paf.config;

import com.example.paf.model.RegistrationSource;
import com.example.paf.model.User;
import com.example.paf.repo.UserRepository;
import com.example.paf.service.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;

        String registrationId = authToken.getAuthorizedClientRegistrationId(); // "google" or "facebook"
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String picture;

        if ("facebook".equals(registrationId)) {
            String id = oAuth2User.getAttribute("id");
            picture = "https://graph.facebook.com/" + id + "/picture?type=large";

            if (email == null) {
                // Facebook often does not return email in dev mode
                email = id + "@facebook.dev";
            }
        } else {
            picture = oAuth2User.getAttribute("picture"); // works for Google
        }

        // Optional: log the attributes for debugging
        System.out.println("OAuth2 attributes: " + oAuth2User.getAttributes());

        User existingUser = userRepository.findByEmail(email);
        if (existingUser == null) {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName(name);
            newUser.setProfileImageUrl(picture);
            newUser.setMobileNumber("N/A");
            newUser.setPassword(""); // OAuth users don't need password
            newUser.setSource(
                "facebook".equals(registrationId) ? RegistrationSource.FACEBOOK : RegistrationSource.GOOGLE
            );
            userRepository.save(newUser);
        }

        String token = jwtUtil.generateToken(email);
        String redirectUrl = frontendUrl + "/oauth-success?token=" + token;
        response.sendRedirect(redirectUrl);
    }
}
