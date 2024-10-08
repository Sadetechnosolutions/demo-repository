package com.Sadetechno.post_module.Service;
import com.Sadetechno.post_module.DTO.ResponseDTO;
import com.Sadetechno.post_module.FeignClient.UserFeignClient;
import com.Sadetechno.post_module.Repository.PostRepository;
import com.Sadetechno.post_module.model.Post;
import com.Sadetechno.post_module.model.PostType;
import com.Sadetechno.post_module.model.PrivacySetting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserFeignClient userFeignClient;

    @Autowired
    private FileUploadService fileUploadService; // Injecting FileUploadService

    public Post createPost(Long userId, String postType, String textContent, MultipartFile imageFile, MultipartFile videoFile, String description, String privacySetting) throws IOException {
        Post post = new Post();
        PostType type = PostType.valueOf(postType);
        post.setPostType(type);
        post.setDescription(description);
        post.setUserId(userId);

        PrivacySetting privacy = PrivacySetting.valueOf(privacySetting.toUpperCase());
        post.setPrivacySetting(privacy);  // Set privacy setting

        switch (type) {
            case TEXT:
                post.setTextContent(textContent);
                break;
            case IMAGE:
                if (imageFile != null && !imageFile.isEmpty()) {
                    String imageUrl = fileUploadService.uploadFile(imageFile);
                    post.setImageUrl(imageUrl);
                } else {
                    throw new IllegalArgumentException("Image file is required for IMAGE post type.");
                }
                break;
            case VIDEO:
                if (videoFile != null && !videoFile.isEmpty()) {
                    String videoUrl = fileUploadService.uploadFile(videoFile);
                    post.setVideoUrl(videoUrl);
                } else {
                    throw new IllegalArgumentException("Video file is required for VIDEO post type.");
                }
                break;
            default:
                throw new IllegalArgumentException("Invalid post type");
        }

        return postRepository.save(post);
    }

    public ResponseDTO getPost(Long postId) {
        // Fetch the post by postId
        Post post = postRepository.findById(postId).orElse(null);

        if (post != null) {
            // Fetch the userId from the post
            String userId = String.valueOf(post.getUserId());

            // Fetch the profileImagePath using Feign client
            String profileImagePath = userFeignClient.getUserById(post.getUserId()).getProfileImagePath();

            String name = userFeignClient.getUserById(post.getUserId()).getName();

            // Return ResponseDTO with userId, profileImagePath, and post details
            return new ResponseDTO(
                    userId,
                    profileImagePath,
                    name,
                    post.getPostId(),        // Post ID
                    post.getDescription(),   // Post description
                    post.getTextContent(),   // Post text content
                    post.getImageUrl(),      // Image URL
                    post.getVideoUrl(),      // Video URL
                    post.getPrivacySetting().name(), // Privacy setting as a string
                    post.getCreatedAt(),      // Creation timestamp
                    post.getPostType()
            );
        } else {
            throw new IllegalArgumentException("Post ID not found.");
        }
    }


    public List<ResponseDTO> getAllPost() {
        List<Post> posts = postRepository.findAll();
        return posts.stream().map(post -> {
            String userId = String.valueOf(post.getUserId());
            String profileImagePath = userFeignClient.getUserById(post.getUserId()).getProfileImagePath();

            String name = userFeignClient.getUserById(post.getUserId()).getName();


            // Return ResponseDTO with post details
            return new ResponseDTO(
                    userId,
                    profileImagePath,
                    name,
                    post.getPostId(),
                    post.getDescription(),
                    post.getTextContent(),
                    post.getImageUrl(),
                    post.getVideoUrl(),
                    post.getPrivacySetting().name(),
                    post.getCreatedAt(),
                    post.getPostType()
            );
        }).collect(Collectors.toList());
    }

    public List<ResponseDTO> getPostsByUserId(Long userId) {
        List<Post> posts = postRepository.findByUserIdOrderByCreatedAtDesc(userId);
        String profileImagePath = userFeignClient.getUserById(userId).getProfileImagePath();

        String name = userFeignClient.getUserById(userId).getName();


        return posts.stream().map(post -> new ResponseDTO(
                String.valueOf(userId),
                profileImagePath,
                name,
                post.getPostId(),
                post.getDescription(),
                post.getTextContent(),
                post.getImageUrl(),
                post.getVideoUrl(),
                post.getPrivacySetting().name(),
                post.getCreatedAt(),
                post.getPostType()
        )).collect(Collectors.toList());
    }

    public List<ResponseDTO> getImagePostsByUserId(Long userId) {
        List<Post> posts = postRepository.findByUserIdAndPostTypeOrderByCreatedAtDesc(userId, PostType.IMAGE);
        String profileImagePath = userFeignClient.getUserById(userId).getProfileImagePath();

        String name = userFeignClient.getUserById(userId).getName();


        return posts.stream().map(post -> new ResponseDTO(
                String.valueOf(userId),
                profileImagePath,
                name,
                post.getPostId(),
                post.getDescription(),
                post.getTextContent(),
                post.getImageUrl(),
                post.getVideoUrl(),
                post.getPrivacySetting().name(),
                post.getCreatedAt(),
                post.getPostType()
        )).collect(Collectors.toList());
    }

    public List<ResponseDTO> getVideoPostsByUserId(Long userId) {
        List<Post> posts = postRepository.findByUserIdAndPostTypeOrderByCreatedAtDesc(userId, PostType.VIDEO);
        String profileImagePath = userFeignClient.getUserById(userId).getProfileImagePath();

        String name = userFeignClient.getUserById(userId).getName();


        return posts.stream().map(post -> new ResponseDTO(
                String.valueOf(userId),
                profileImagePath,
                name,
                post.getPostId(),
                post.getDescription(),
                post.getTextContent(),
                post.getImageUrl(),
                post.getVideoUrl(),
                post.getPrivacySetting().name(),
                post.getCreatedAt(),
                post.getPostType()
        )).collect(Collectors.toList());
    }

    public void deletePost(Long postId) throws IOException {
        Post post = postRepository.findById(postId).orElse(null);
        if (post != null) {
            // Delete associated files if they exist
            if (post.getImageUrl() != null) {
                fileUploadService.deleteFile(post.getImageUrl());
            }
            if (post.getVideoUrl() != null) {
                fileUploadService.deleteFile(post.getVideoUrl());
            }
            postRepository.delete(post);
        }
    }
}
