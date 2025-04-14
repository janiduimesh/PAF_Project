package com.example.paf.DTO;

import lombok.Data;

@Data
public class ResetPasswordConfirmRequest {
    private String token;
    private String newPassword;
    private String confirmPassword;
}
