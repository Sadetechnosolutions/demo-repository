package com.Sadetechno.comment_module.Service;

import com.Sadetechno.comment_module.Repository.ReelsRepository;
import com.Sadetechno.comment_module.model.ReelsNotification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReelsNotificationService {

    @Autowired
    private ReelsRepository reelsRepository;

    public void createNotificationForReels(Long userId, String message, String email, String type, Long reelsId, String name, String profileImagePath,Long reelsOwnerId) {
        ReelsNotification notification = new ReelsNotification();
        notification.setUserId(userId);
        notification.setMessage(message);
        notification.setEmail(email);
        notification.setType(type);
        notification.setReelsId(reelsId);
        notification.setName(name);
        notification.setProfileImagePath(profileImagePath);
        notification.setReelsOwnerId(reelsOwnerId);

        reelsRepository.save(notification);

    }
}
