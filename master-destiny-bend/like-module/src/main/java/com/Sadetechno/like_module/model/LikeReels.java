package com.Sadetechno.like_module.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LikeReels {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reels_id")
    private Long reelsId;

    @Column(name = "user_id")
    private Long userId;

    @CreationTimestamp
    private LocalDateTime notificationTime;
}