package com.example.paf.model;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    private String message;
    private boolean read = false;
    private LocalDateTime createdAt = LocalDateTime.now();
}