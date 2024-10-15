package com.Sadetechno.comment_module.Repository;

import com.Sadetechno.comment_module.model.ReelsNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReelsRepository extends JpaRepository<ReelsNotification,Long> {
    void deleteByIdAndType(Long id, String type);
}
