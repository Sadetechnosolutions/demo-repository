package com.sadetech.websocket_messaging.Repository;

import com.sadetech.websocket_messaging.Model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation,Long> {
}
