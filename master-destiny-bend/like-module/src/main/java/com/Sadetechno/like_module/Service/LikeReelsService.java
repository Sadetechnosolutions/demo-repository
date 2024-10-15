package com.Sadetechno.like_module.Service;

import com.Sadetechno.like_module.DTO.UserDTO;
import com.Sadetechno.like_module.FeignClient.ReelsFeignClient;
import com.Sadetechno.like_module.FeignClient.UserFeignClient;
import com.Sadetechno.like_module.Repository.LikeReelsRepository;
import com.Sadetechno.like_module.model.LikeReels;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LikeReelsService {

    @Autowired
    private LikeReelsRepository likeReelsRepository;

    @Autowired
    private UserFeignClient userFeignClient;

    @Autowired
    private ReelsNotificationService reelsNotificationService;

    @Autowired
    private ReelsFeignClient reelsFeignClient;

    public LikeReels toggleLikeReels(Long reelsId, Long userId){

        Optional<LikeReels> existingLikeReels = likeReelsRepository.findByReelsIdAndUserId(reelsId, userId);

        if(existingLikeReels.isPresent()){
            likeReelsRepository.delete(existingLikeReels.get());
            return null;
        }else{
            LikeReels likeReels = new LikeReels();
            likeReels.setReelsId(reelsId);
            likeReels.setUserId(userId);
            likeReelsRepository.save(likeReels);

            UserDTO userDetail = userFeignClient.getUserById(userId);
            String profileImagePath = userDetail.getProfileImagePath();
            String userEmail = userDetail.getEmail();  // Get the email
            String userName =  userFeignClient.getUserById(userId).getName();

            Long reelsOwnerId = reelsFeignClient.getUserDetailsByReelsId(reelsId).getUserId();

            LikeReels savedLikeReels = likeReelsRepository.save(likeReels);

            // Create a notification after saving the new request
            if (!userId.equals(reelsOwnerId)) {
                String notificationMessage = "liked your reels.";
                reelsNotificationService.createNotificationForReels(userId, notificationMessage, userEmail,"REEL-LIKE" , likeReels.getReelsId(), userName,profileImagePath,reelsOwnerId);
            }
           return savedLikeReels;
        }
    }
}
