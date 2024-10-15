package com.Sadetechno.comment_module.Controller;
import com.Sadetechno.comment_module.DTO.*;
import com.Sadetechno.comment_module.Repository.CommentStatusRepository;
import com.Sadetechno.comment_module.Repository.PostRepository;
import com.Sadetechno.comment_module.Repository.ReelsRepository;
import com.Sadetechno.comment_module.Repository.StatusRepository;
import com.Sadetechno.comment_module.Service.*;
import com.Sadetechno.comment_module.model.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.management.Notification;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/comments")
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

    @Autowired
    private PostNotificationService postNotificationService;

    @Autowired
    private ReelsNotificationService reelsNotificationService;

    @Autowired
    private StatusNotificationService statusNotificationService;

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
    @GetMapping("/uploads/{fileName:.+}")
    public ResponseEntity<Resource>serveFile(@PathVariable String fileName){
        try {
            Path filePath = Paths.get("static/uploads/").resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if(resource.exists()){
                String contentType = determineContentType(fileName);

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION,"inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            }else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    private String determineContentType(String fileName) {
        if (fileName.toLowerCase().endsWith(".mp4")) {
            return "video/mp4";
        } else if (fileName.toLowerCase().endsWith(".jpg") || fileName.toLowerCase().endsWith(".jpeg")) {
            return "image/jpeg";
        } else if (fileName.toLowerCase().endsWith(".png")) {
            return "image/png";
        } else {
            return "application/octet-stream";
        }
    }

    @DeleteMapping("/notification/{id}/{type}")
    public ResponseEntity<String> deleteNotification(@PathVariable Long id,@PathVariable String type){
        switch (type){
            case "POST-COMMENT", "COMMENT-REPLY" -> postNotificationService.deleteNotificationForPost(id, type);
            case "REELS-COMMENT" -> reelsNotificationService.deleteNotificationForReels(id, type);
            case "STATUS-COMMENT" -> statusNotificationService.deleteNotificationForStatus(id, type);
            default -> throw new IllegalArgumentException("No id found or type mismatch.");
        }
        return ResponseEntity.ok("Notification deleted.");
    }

    @DeleteMapping("/notification/delete-all")
    public ResponseEntity<String> deleteAll(){
        List<PostNotification> notifications = postRepository.findAll();
        List<ReelsNotification> notifications1 = reelsRepository.findAll();
        List<StatusNotification> notifications2 = statusRepository.findAll();

        if(!notifications.isEmpty() && !notifications1.isEmpty() && !notifications2.isEmpty()){
            postRepository.deleteAll();
            reelsRepository.deleteAll();
            statusRepository.deleteAll();
        }else {
            throw new IllegalArgumentException("No notifications to delete.");
        }
        return ResponseEntity.ok("Notifications deleted.");
    }
}