package com.Sadetechno.comment_module.Repository;

import com.Sadetechno.comment_module.model.CommentReels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentReelsRepository extends JpaRepository<CommentReels,Long> {
}
