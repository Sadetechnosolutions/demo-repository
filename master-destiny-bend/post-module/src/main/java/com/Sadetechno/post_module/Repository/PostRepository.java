package com.Sadetechno.post_module.Repository;
import com.Sadetechno.post_module.model.Post;
import com.Sadetechno.post_module.model.PostType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<Post> findByUserIdAndPostTypeOrderByCreatedAtDesc(Long userId, PostType postType);


}

