package com.Sadetechno.comment_module.DTO;

import com.Sadetechno.comment_module.model.PostNotification;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostNotificationDTO {
    private List<PostNotification> notifications;
    private int count;
}