package com.Sadetechno.comment_module.Service;
import com.Sadetechno.comment_module.DTO.CommentRequest;
import com.Sadetechno.comment_module.DTO.CommentResponse;
import com.Sadetechno.comment_module.DTO.UserDTO;
import com.Sadetechno.comment_module.FeignClient.PostFeignClient;
import com.Sadetechno.comment_module.FeignClient.UserFeignClient;
import com.Sadetechno.comment_module.Repository.CommentRepository;
import com.Sadetechno.comment_module.model.Comment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private UserFeignClient userFeignClient;

    @Autowired
    private PostNotificationService postNotificationService;

    @Autowired
    private PostFeignClient postFeignClient;

    private static final Logger logger = LoggerFactory.getLogger(CommentService.class);

    public CommentResponse createComment(CommentRequest request, MultipartFile file) throws IOException {

        String filePath = null;  // Initialize filePath as null

        // Check if the file is provided and not empty
        if (file != null && !file.isEmpty()) {
            // Upload the file and set the file path
            filePath = fileUploadService.uploadFile(file);

            // Check if the uploaded file is an image, otherwise throw an exception
            String contentType = file.getContentType();
            if (contentType != null && contentType.startsWith("image")) {
                logger.info("Image uploaded.");
            } else {
                throw new IllegalArgumentException("Video content is not allowed.");
            }
        } else {
            // If no file is uploaded, log that no image is attached
            logger.info("No file uploaded, skipping image path.");
        }

        Comment comment = new Comment();
        comment.setImagePath(filePath);
        comment.setPostId(request.getPostId());
        comment.setUserId(request.getUserId());
        comment.setRepliedToUserId(request.getRepliedToUserId());
        comment.setTextContent(request.getTextContent());
        comment.setCreatedAt(LocalDateTime.now());
        comment.setParentIdName(userFeignClient.getUserById(request.getParentId()).getName());

        UserDTO userDTO = userFeignClient.getUserById(comment.getUserId());
        String name = userDTO.getName();
        String email = userDTO.getEmail();
        String profileImagePath = userDTO.getProfileImagePath();

        if (request.getParentId() != null) {
            Comment parentComment = commentRepository.findById(request.getParentId())
                    .orElseThrow(() -> new IllegalArgumentException("Parent comment not found"));
            comment.setParentComment(parentComment);

            UserDTO repliedToUserDTO = userFeignClient.getUserById(parentComment.getUserId());
            String replyMessage = name + " replied to your comment.";
            logger.info("Notification sent successfully to user id {}",parentComment.getUserId());

            Long postOwnerId = postFeignClient.getPostWithUserDetails(comment.getPostId()).getUserId();

            postNotificationService.createNotification(comment.getUserId(), replyMessage, repliedToUserDTO.getEmail(),
                    "COMMENT-REPLY", comment.getPostId(), name, profileImagePath, parentComment.getUserId(),postOwnerId);
        }else{
            // Notify post owner (for new comments)
            // Assuming that the Post service provides the post owner's user ID
            Long userId = comment.getUserId();
            UserDTO postOwnerDTO = userFeignClient.getUserById(userId);
            String commentMessage = name + " commented on your post.";

            Long postOwnerId = postFeignClient.getPostWithUserDetails(comment.getPostId()).getUserId();

            postNotificationService.createNotification(userId, commentMessage, postOwnerDTO.getEmail(),
                    "POST-COMMENT", comment.getPostId(), name, profileImagePath, null,postOwnerId);
        }

        Comment savedComment = commentRepository.save(comment);
        return mapToCommentResponse(savedComment);
    }

    public List<CommentResponse> getCommentsByPostId(Long postId) {
        List<Comment> comments = commentRepository.findByPostIdAndParentCommentIsNull(postId);
        return comments.stream()
                .map(this::mapToCommentResponse)
                .collect(Collectors.toList());
    }

    public List<CommentResponse> getRepliesByParentId(Long parentId) {
        List<Comment> replies = commentRepository.findByParentCommentId(parentId);
        return replies.stream()
                .map(this::mapToCommentResponse)
                .collect(Collectors.toList());
    }

    private CommentResponse mapToCommentResponse(Comment comment) {

        UserDTO userDTO = userFeignClient.getUserById(comment.getUserId());

        CommentResponse response = new CommentResponse();
        response.setId(comment.getId());
        response.setPostId(comment.getPostId());
        response.setUserId(comment.getUserId());
        response.setRepliedToUserId(comment.getRepliedToUserId());
        response.setTextContent(comment.getTextContent());
        response.setImagePath(comment.getImagePath());
        response.setProfileImagePath(userDTO.getProfileImagePath());
        response.setCreatedAt(comment.getCreatedAt());
        response.setParentIdName(comment.getParentIdName());
        response.setReplies(comment.getReplies().stream()
                .map(this::mapToCommentResponse)
                .collect(Collectors.toSet()));
        return response;
    }
    public void deleteComment(Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));

        if (!comment.getUserId().equals(userId)) {
            throw new IllegalArgumentException("User is not authorized to delete this comment");
        }

        commentRepository.delete(comment);
    }
}