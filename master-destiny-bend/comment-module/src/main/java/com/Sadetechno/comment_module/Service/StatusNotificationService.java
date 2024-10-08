package com.Sadetechno.comment_module.Service;

import com.Sadetechno.comment_module.Repository.StatusRepository;
import com.Sadetechno.comment_module.model.StatusNotification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatusNotificationService {

    @Autowired
    private StatusRepository statusRepository;

    public void createNotificationForStatus(Long userId, String message, String email, String type, Long statusId, String name, String profileImagePath,Long statusOwnerId) {
        StatusNotification notification = new StatusNotification();
        notification.setUserId(userId);
        notification.setMessage(message);
        notification.setEmail(email);
        notification.setType(type);
        notification.setStatusId(statusId);
        notification.setName(name);
        notification.setProfileImagePath(profileImagePath);
        notification.setStatusOwnerId(statusOwnerId);

        statusRepository.save(notification);

    }
}
