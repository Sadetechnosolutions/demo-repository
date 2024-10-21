package com.sadetech.websocket_messaging.Repository;

import com.sadetech.websocket_messaging.Model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation,Long> {

    @Query("SELECT c FROM Conversation c WHERE " +
            "(c.participantOneId = :senderId AND c.participantTwoId = :recipientId) OR " +
            "(c.participantOneId = :recipientId AND c.participantTwoId = :senderId)")
    Optional<Conversation> findByParticipants(@Param("senderId") Long senderId,
                                              @Param("recipientId") Long recipientId);
}
