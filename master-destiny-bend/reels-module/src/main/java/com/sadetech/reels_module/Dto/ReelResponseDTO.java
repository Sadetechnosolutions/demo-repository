package com.sadetech.reels_module.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReelResponseDTO {

    private Long id;
    private String content;
    private String caption;
    private int duration;
    private LocalDateTime createdAt;
    private Long userId;
    private String profileImagePath;  // New field for profile image path
}

