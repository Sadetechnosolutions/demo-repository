package com.Sadetechno.comment_module.Repository;

import com.Sadetechno.comment_module.model.CommentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentStatusRepository extends JpaRepository<CommentStatus,Long> {
}
