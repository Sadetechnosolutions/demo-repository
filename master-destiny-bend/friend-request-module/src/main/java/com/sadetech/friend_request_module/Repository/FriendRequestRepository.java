package com.sadetech.friend_request_module.Repository;

import com.sadetech.friend_request_module.Model.FriendRequest;
import com.sadetech.friend_request_module.Model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {

    Optional<FriendRequest> findBySenderIdAndRecipientId(Long senderId, Long recipientId);

    List<FriendRequest> findAllBySenderIdAndStatus(Long senderId, Status status);

    List<FriendRequest> findAllByRecipientIdAndStatus(Long recipientId, Status status);

}
