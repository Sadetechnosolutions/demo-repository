package com.Sadetechno.like_module.Service;

import com.Sadetechno.like_module.Repository.StatusNotificationRepository;
import com.Sadetechno.like_module.model.StatusNotification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatusNotificationService {


    @Autowired
    private StatusNotificationRepository statusNotificationRepository;

    public void createStatusNotification(Long userId, String message, String email, String type,Long id,String name, String profileImagePath,Long statusOwnerId){
        StatusNotification statusNotification = new StatusNotification();
        statusNotification.setUserId(userId);
        statusNotification.setMessage(message);
        statusNotification.setEmail(email);
        statusNotification.setType(type);
        statusNotification.setStatusId(id);
        statusNotification.setName(name);
        statusNotification.setProfileImagePath(profileImagePath);
        statusNotification.setStatusOwnerId(statusOwnerId);
        statusNotificationRepository.save(statusNotification);
    }
}
