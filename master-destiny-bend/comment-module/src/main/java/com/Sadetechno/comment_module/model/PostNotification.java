package com.Sadetechno.comment_module.model;

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
@AllArgsConstructor
@NoArgsConstructor
public class PostNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private String message;
    private String email;
    private Long postId;
    private Long repliedToUserId;
    private String name;
    private String profileImagePath;
    private String type;
    private Long postOwnerId;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
