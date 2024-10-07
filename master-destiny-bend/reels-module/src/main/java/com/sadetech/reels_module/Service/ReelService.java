package com.sadetech.reels_module.Service;

import com.sadetech.reels_module.Dto.ReelResponseDTO;
import com.sadetech.reels_module.Dto.UserDTO;
import com.sadetech.reels_module.FeignClient.UserFeignClient;
import com.sadetech.reels_module.Model.Reel;
import com.sadetech.reels_module.Repository.ReelRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReelService {

    @Autowired
    private ReelRepository reelRepository;

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private UserFeignClient userFeignClient;

    private static final int MAX_VIDEO_LENGTH = 30;

    public Reel saveReels(MultipartFile file, String caption, int duration, Long userId) throws IOException {
        String filePath = fileUploadService.uploadFile(file);

        String contentType = file.getContentType();
        if (contentType != null && contentType.startsWith("video")) {
            if (duration > MAX_VIDEO_LENGTH) {
                throw new IllegalArgumentException("Video length cannot exceed 30 seconds");
            }
        } else {
            throw new IllegalArgumentException("Only video content is allowed");
        }

        // Fetch user details using Feign client
        UserDTO userDTO = getUserById(userId);
        String profileImagePath = userDTO.getProfileImagePath();

        Reel reel = new Reel();
        reel.setContent(filePath);
        reel.setCaption(caption);
        reel.setCreatedAt(LocalDateTime.now());
        reel.setDuration(duration);
        reel.setUserId(userId);
        return reelRepository.save(reel);
    }

    public List<ReelResponseDTO> getReelsByUserId(Long userId) {
        // Fetch all reels by userId
        List<Reel> reels = reelRepository.findByUserId(userId);

        // Fetch user profile image path using Feign client
        UserDTO userDTO = userFeignClient.getUserById(userId);  // Call user service
        String profileImagePath = userDTO.getProfileImagePath();  // Extract profile image path

        // Map reels to ReelResponseDTO, including profileImagePath
        List<ReelResponseDTO> responseDTOs = reels.stream()
                .map(reel -> new ReelResponseDTO(
                        reel.getId(),
                        reel.getContent(),
                        reel.getCaption(),
                        reel.getDuration(),
                        reel.getCreatedAt(),
                        reel.getUserId(),
                        profileImagePath  // Add the profile image path to the response
                ))
                .collect(Collectors.toList());

        return responseDTOs;
    }

    public List<ReelResponseDTO> getAllReels() {
        // Fetch all reels
        List<Reel> reels = reelRepository.findAll();

        // Map each reel to ReelResponseDTO, including profileImagePath
        List<ReelResponseDTO> responseDTOs = reels.stream()
                .map(reel -> {
                    // Fetch the user info using Feign client for each reel
                    UserDTO userDTO = userFeignClient.getUserById(reel.getUserId());
                    String profileImagePath = userDTO.getProfileImagePath();  // Extract profile image path

                    // Map Reel to ReelResponseDTO, including profile image path
                    return new ReelResponseDTO(
                            reel.getId(),
                            reel.getContent(),
                            reel.getCaption(),
                            reel.getDuration(),
                            reel.getCreatedAt(),
                            reel.getUserId(),
                            profileImagePath  // Add the profile image path to the response
                    );
                })
                .collect(Collectors.toList());

        return responseDTOs;
    }

    public String deleteReelByUserId(Long userId, Long id) {
        if (!reelRepository.existsByUserIdAndId(userId, id)) {
            throw new EntityNotFoundException("Reel with ID " + id + " for user ID " + userId + " not found.");
        }
        reelRepository.deleteReelByUserIdAndId(userId, id);
        return "Reel with ID " + id + " for user ID " + userId + " deleted successfully.";
    }

    private UserDTO getUserById(Long userId){
        return userFeignClient.getUserById(userId);
    }

    public Optional<Reel> getUserDetailsByReelsId(Long id) {
        return reelRepository.findById(id);
    }
}

