package com.Sadetechno.like_module.Repository;

import com.Sadetechno.like_module.model.Like;
import com.Sadetechno.like_module.model.LikeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeStatusRepository extends JpaRepository<LikeStatus,Long> {
    Optional<LikeStatus> findByStatusIdAndUserId(Long statusId, Long userId);
}
