package com.example.paf.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;


@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        try (InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream("pafproject-40100-firebase-adminsdk-fbsvc-36d0ee343a.json")) {
            if (serviceAccount == null) {
                throw new FileNotFoundException("Firebase config file not found in classpath.");
            }

            GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(credentials)
                    .build();

            FirebaseApp app = FirebaseApp.initializeApp(options);
            System.out.println("FirebaseApp initialized successfully: " + app.getName());
            return app;
        } catch (IOException e) {
            System.err.println("Failed to initialize FirebaseApp: " + e.getMessage());
            throw new RuntimeException("Failed to initialize FirebaseApp: " + e.getMessage(), e);
        }
    }

    @Bean
    public StorageClient storageClient(FirebaseApp firebaseApp) {
        System.out.println("Using FirebaseApp: " + firebaseApp.getName());
        return StorageClient.getInstance(firebaseApp);
    }


}