package com.Sadetechno.like_module.Service;

import com.Sadetechno.like_module.Repository.PostNotificationRepository;
import com.Sadetechno.like_module.Repository.StatusNotificationRepository;
import com.Sadetechno.like_module.model.PostNotification;
import com.Sadetechno.like_module.model.StatusNotification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostNotificationService {

    @Autowired
    private PostNotificationRepository postNotificationRepository;

    public void createNotification(Long userId, String message, String email, String type,Long postId,String name, String profileImagePath,Long postOwnerId) {
        PostNotification notification = new PostNotification();
        notification.setUserId(userId);
        notification.setMessage(message);
        notification.setEmail(email);
        notification.setType(type);
        notification.setPostId(postId);
        notification.setName(name);
        notification.setProfileImagePath(profileImagePath);
        notification.setPostOwnerId(postOwnerId);
        postNotificationRepository.save(notification);
    }
    // Additional methods to retrieve notifications can be added here
}



