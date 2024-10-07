package com.Sadetechno.comment_module.Controller;
import com.Sadetechno.comment_module.DTO.*;
import com.Sadetechno.comment_module.Repository.CommentStatusRepository;
import com.Sadetechno.comment_module.Repository.PostRepository;
import com.Sadetechno.comment_module.Repository.ReelsRepository;
import com.Sadetechno.comment_module.Repository.StatusRepository;
import com.Sadetechno.comment_module.Service.CommentReelsService;
import com.Sadetechno.comment_module.Service.CommentService;
import com.Sadetechno.comment_module.Service.CommentStatusService;
import com.Sadetechno.comment_module.model.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentStatusService commentStatusService;

    @Autowired
    private CommentReelsService commentReelsService;

    @Autowired
    private ReelsRepository reelsRepository;

    @Autowired
    private StatusRepository statusRepository;

    @PostMapping
    public ResponseEntity<CommentResponse> createComment(
            @RequestParam(value = "file",required = false) MultipartFile file,
            @RequestParam("request") String requestJson) throws IOException {
        CommentRequest request = new ObjectMapper().readValue(requestJson, CommentRequest.class);
        CommentResponse createdComment = commentService.createComment(request, file);
        return new ResponseEntity<>(createdComment, HttpStatus.OK);
    }
    @PostMapping("/comment-status")
    public ResponseEntity<CommentStatus> createCommentForStatus(
            @RequestParam("statusId") Long statusId,
            @RequestParam("userId") Long userId ,
            @RequestParam("textContent")String textContent){
        CommentStatus commentStatus = commentStatusService.createCommentForStatus(statusId, userId, textContent);
        return ResponseEntity.status(HttpStatus.CREATED).body(commentStatus);
    }
    @PostMapping("/comment-reels")
    public ResponseEntity<CommentReels> createCommentForReels(
            @RequestParam("reelsId") Long reelsId,
            @RequestParam("userId") Long userId ,
            @RequestParam("textContent")String textContent){
        CommentReels commentReels = commentReelsService.createCommentForReels(reelsId, userId, textContent);
        return ResponseEntity.status(HttpStatus.CREATED).body(commentReels);
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentResponse>> getCommentsByPostId(@PathVariable Long postId) {
        List<CommentResponse> comments = commentService.getCommentsByPostId(postId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @GetMapping("/replies/{parentId}")
    public ResponseEntity<List<CommentResponse>> getRepliesByParentId(@PathVariable Long parentId) {
        List<CommentResponse> replies = commentService.getRepliesByParentId(parentId);
        return new ResponseEntity<>(replies, HttpStatus.OK);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId, @RequestParam Long userId) {
        try {
            commentService.deleteComment(commentId, userId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/notification-comment/post-reply/{postOwnerId}")
    public PostNotificationDTO getNotificationsForPostOwner(@PathVariable Long postOwnerId) {
        List<PostNotification> notifications = postRepository.findAll().stream()
                .filter(notification -> notification.getPostOwnerId().equals(postOwnerId) && notification.getRepliedToUserId() == null)
                .collect(Collectors.toList());

        int count = notifications.size();
        return new PostNotificationDTO(notifications, count);
    }
    @GetMapping("/notification-comment/comment-reply/{repliedToUserId}")
    public PostNotificationDTO getRepliedUserCount(@PathVariable Long repliedToUserId) {
        List<PostNotification> notifications = postRepository.findAll().stream()
                .filter(notification -> notification.getRepliedToUserId() == repliedToUserId)
                .collect(Collectors.toList());

        int count = notifications.size();
        return new PostNotificationDTO(notifications, count);
    }
    @GetMapping("/notification-comment/status-reply/{statusOwnerId}")
    public StatusNotificationDTO getNotificationCountForStatus(@PathVariable Long statusOwnerId) {
        List<StatusNotification> notifications = statusRepository.findAll().stream()
                .filter(notification -> notification.getStatusOwnerId().equals(statusOwnerId) )
                .collect(Collectors.toList());

        int count = notifications.size();
        return new StatusNotificationDTO(notifications, count);
    }
    @GetMapping("/notification-comment/reels-reply/{reelsOwnerId}")
    public ReelsNotificationDTO getNotificationCountForReels(@PathVariable Long reelsOwnerId) {
        List<ReelsNotification> notifications = reelsRepository.findAll().stream()
                .filter(notification -> notification.getReelsOwnerId().equals(reelsOwnerId) )
                .collect(Collectors.toList());

        int count = notifications.size();
        return new ReelsNotificationDTO(notifications, count);
    }
}