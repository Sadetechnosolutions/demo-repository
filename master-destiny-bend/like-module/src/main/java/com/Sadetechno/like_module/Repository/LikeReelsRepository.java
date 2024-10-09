package com.Sadetechno.like_module.Repository;

import com.Sadetechno.like_module.model.LikeReels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeReelsRepository extends JpaRepository<LikeReels,Long> {
    Optional<LikeReels> findByReelsIdAndUserId(Long reelsId, Long userId);
}
