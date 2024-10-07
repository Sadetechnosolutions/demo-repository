package com.Sadetechno.like_module.Repository;

import com.Sadetechno.like_module.model.ReelsNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReelsNotificationRepository extends JpaRepository<ReelsNotification,Long> {
}
