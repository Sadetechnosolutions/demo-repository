package com.Sadetechno.comment_module.DTO;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class CommentResponse {
    private Long id;
    private Long postId;
    private Long userId;
    private Long repliedToUserId;
    private String textContent;
    private String imagePath;
    private LocalDateTime createdAt;
    private String profileImagePath;
    private String parentIdName;
    private Set<CommentResponse> replies;
}
