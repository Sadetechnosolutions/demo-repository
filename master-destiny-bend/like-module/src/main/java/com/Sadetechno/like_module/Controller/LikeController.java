package com.Sadetechno.like_module.Controller;
import com.Sadetechno.like_module.DTO.PostNotificationDTO;
import com.Sadetechno.like_module.DTO.ReelsNotificationDTO;
import com.Sadetechno.like_module.DTO.StatusNotificationDTO;
import com.Sadetechno.like_module.Repository.PostNotificationRepository;
import com.Sadetechno.like_module.Repository.ReelsNotificationRepository;
import com.Sadetechno.like_module.Repository.StatusNotificationRepository;
import com.Sadetechno.like_module.Service.LikeReelsService;
import com.Sadetechno.like_module.Service.LikeService;
import com.Sadetechno.like_module.Service.LikeStatusService;
import com.Sadetechno.like_module.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/likes")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @Autowired
    private LikeStatusService likeStatusService;

    @Autowired
    private LikeReelsService likeReelsService;

    @Autowired
    private PostNotificationRepository postNotificationRepository;

    @Autowired
    private StatusNotificationRepository statusNotificationRepository;

    @Autowired
    private ReelsNotificationRepository reelsNotificationRepository;

    @PostMapping("/toggle")
    public ResponseEntity<?> toggleLike(
            @RequestParam("postId") Long postId,
            @RequestParam("userId") Long userId) {

        Like like = likeService.toggleLike(postId, userId);
        if (like == null) {
            return new ResponseEntity<>("Like removed", HttpStatus.OK);
        } else {
            return new ResponseEntity<>(like, HttpStatus.CREATED);
        }
    }

    @PostMapping("/toggle-status")
    public ResponseEntity<?> toggleLikeForStatus(
            @RequestParam("statusId") Long statusId,
            @RequestParam("userId") Long userId) {

        LikeStatus likeStatus = likeStatusService.toggleLikeStatus(statusId, userId);
        if (likeStatus == null) {
            return new ResponseEntity<>("Like removed", HttpStatus.OK);
        } else {
            return new ResponseEntity<>(likeStatus, HttpStatus.CREATED);
        }
    }
    @PostMapping("/toggle-reels")
    public ResponseEntity<?> toggleLikeForReels(
            @RequestParam("reelsId") Long reelsId,
            @RequestParam("userId") Long userId) {

        LikeReels likeReels = likeReelsService.toggleLikeReels(reelsId, userId);
        if (likeReels == null) {
            return new ResponseEntity<>("Like removed", HttpStatus.OK);
        } else {
            return new ResponseEntity<>(likeReels, HttpStatus.CREATED);
        }
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Like>> getLikesByPostId(@PathVariable Long postId) {
        List<Like> likes = likeService.getLikesByPostId(postId);
        return new ResponseEntity<>(likes, HttpStatus.OK);
    }

    @GetMapping("/post/{postId}/count")
    public ResponseEntity<Long> getLikeCountByPostId(@PathVariable Long postId) {
        long count = likeService.getLikeCountByPostId(postId);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/post/{postId}/users")
    public ResponseEntity<List<Long>> getUsersWhoLikedPost(@PathVariable Long postId) {
        List<Long> userIds = likeService.getUserIdsWhoLikedPost(postId);
        return new ResponseEntity<>(userIds, HttpStatus.OK);
    }

    @GetMapping("/post/{postId}/user/{userId}")
    public ResponseEntity<Boolean> hasUserLikedPost(
            @PathVariable Long postId,
            @PathVariable Long userId) {

        boolean hasLiked = likeService.hasUserLikedPost(postId, userId);
        return new ResponseEntity<>(hasLiked, HttpStatus.OK);
    }

    @GetMapping("/notification/{postOwnerId}")
    public PostNotificationDTO getNotificationsForUser(@PathVariable Long postOwnerId) {
        List<PostNotification> notifications = postNotificationRepository.findAll().stream()
                .filter(notification -> notification.getPostOwnerId().equals(postOwnerId))
                .collect(Collectors.toList());

        int count = notifications.size();
        return new PostNotificationDTO(notifications, count);
    }

    @GetMapping("/notification-status/{statusOwnerId}")
    public StatusNotificationDTO getNotificationForStatusUser(@PathVariable Long statusOwnerId){
        List<StatusNotification> statusNotifications = statusNotificationRepository.findAll().stream()
                .filter(statusNotification -> statusNotification.getStatusOwnerId().equals(statusOwnerId))
                .collect(Collectors.toList());

        int count = statusNotifications.size();
        return new StatusNotificationDTO(statusNotifications,count);
    }

    @GetMapping("/notification-reels/{reelsOwnerId}")
    public ReelsNotificationDTO getNotificationForReelUser(@PathVariable Long reelsOwnerId){
        List<ReelsNotification> reelsNotifications = reelsNotificationRepository.findAll().stream()
                .filter(reelsNotification -> reelsNotification.getReelsOwnerId().equals(reelsOwnerId))
                .collect(Collectors.toList());

        int count = reelsNotifications.size();
        return new ReelsNotificationDTO(reelsNotifications,count);
    }
}
