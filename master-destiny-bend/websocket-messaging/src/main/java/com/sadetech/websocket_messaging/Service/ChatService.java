package com.sadetech.websocket_messaging.Service;

import com.sadetech.websocket_messaging.Model.Conversation;
import com.sadetech.websocket_messaging.Model.Message;
import com.sadetech.websocket_messaging.Repository.ConversationRepository;
import com.sadetech.websocket_messaging.Repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // Saves message to the conversation and broadcasts it to WebSocket clients
    public void saveMessage(Message message) {
        Optional<Conversation> conversationOptional = findConversationByParticipants(message.getSenderId(), message.getRecipientId());

        if (conversationOptional.isPresent()) {
            // Existing conversation found
            Conversation conversation = conversationOptional.get();
            message.setConversation(conversation);
            messageRepository.save(message);
            messagingTemplate.convertAndSend("/topic/conversation/" + conversation.getId(), message);
        } else {
            // No conversation found, create a new one
            Conversation newConversation = new Conversation();
            newConversation.getMessages().add(message);
            message.setConversation(newConversation);
            conversationRepository.save(newConversation);
            messagingTemplate.convertAndSend("/topic/conversation/" + newConversation.getId(), message);
        }
    }

    // Utility to find a conversation by participants
    private Optional<Conversation> findConversationByParticipants(Long senderId, Long recipientId) {
        List<Conversation> allConversations = conversationRepository.findAll();
        for (Conversation conversation : allConversations) {
            if ((conversation.getParticipantOneId().equals(senderId) && conversation.getParticipantTwoId().equals(recipientId)) ||
                    (conversation.getParticipantOneId().equals(recipientId) && conversation.getParticipantTwoId().equals(senderId))) {
                return Optional.of(conversation);
            }
        }
        return Optional.empty();
    }

}
