package com.example.paf.service;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

// import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Service
public class FirebaseStorageService {

    private final StorageClient storageClient;

    // @Autowired
    public FirebaseStorageService(StorageClient storageClient) {
        this.storageClient = storageClient;
    }

    public String uploadProfileImage(MultipartFile profileImage, String userEmail) {
    try {
        String fileName = "profile_images/" + userEmail + "_" + UUID.randomUUID() + "_" + profileImage.getOriginalFilename();

        Bucket bucket = storageClient.bucket("pafproject-40100.firebasestorage.app");

        Blob blob = bucket.create(fileName, profileImage.getBytes(), profileImage.getContentType());

        return "https://firebasestorage.googleapis.com/v0/b/" + bucket.getName() + "/o/"
                + URLEncoder.encode(fileName, StandardCharsets.UTF_8.toString()) + "?alt=media";

    } catch (Exception e) {
        throw new RuntimeException("Failed to upload profile image", e);
    }
 }
}
