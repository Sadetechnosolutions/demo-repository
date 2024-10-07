package com.sadetech.reels_module.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content; // Path to the reel file
    private String type; // E.g., "video"
    private int duration; // In seconds
    private String caption;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private Long userId; // ID of the user who uploaded the reel

}

