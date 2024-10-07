package com.sadetech.friend_request_module.Service;

import org.springframework.stereotype.Service;
import com.sadetech.friend_request_module.Model.Notification;
import com.sadetech.friend_request_module.Repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public void createNotification(Long userId, String message, String type, String email,String profileImagePath) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setMessage(message);
        notification.setType(type);
        notification.setEmail(email);
        notification.setProfileImagePath(profileImagePath);
        notificationRepository.save(notification);
    }

}
