package com.example.follow_module.Service;

import com.example.follow_module.Model.Notification;
import com.example.follow_module.Repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public void createNotification(Long userId, String message, String email,String profileImagePath){
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setMessage(message);
        notification.setEmail(email);
        notification.setProfileImagePath(profileImagePath);
        notificationRepository.save(notification);
    }
}
