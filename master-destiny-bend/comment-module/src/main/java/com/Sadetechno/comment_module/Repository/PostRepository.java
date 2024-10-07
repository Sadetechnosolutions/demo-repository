package com.Sadetechno.comment_module.Repository;

import com.Sadetechno.comment_module.model.PostNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<PostNotification,Long> {
}
