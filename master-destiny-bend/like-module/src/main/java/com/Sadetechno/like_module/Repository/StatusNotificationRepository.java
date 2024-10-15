package com.Sadetechno.like_module.Repository;

import com.Sadetechno.like_module.model.StatusNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusNotificationRepository extends JpaRepository<StatusNotification,Long> {
    void deleteByIdAndType(Long id, String type);
}
