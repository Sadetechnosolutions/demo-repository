package com.Sadetechno.like_module.Repository;

import com.Sadetechno.like_module.model.PostNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostNotificationRepository extends JpaRepository<PostNotification,Long> {
}
