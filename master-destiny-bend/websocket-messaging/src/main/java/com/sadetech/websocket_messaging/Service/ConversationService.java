package com.sadetech.websocket_messaging.Service;

import com.sadetech.websocket_messaging.Model.Conversation;
import com.sadetech.websocket_messaging.Model.Message;
import com.sadetech.websocket_messaging.Repository.ConversationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sadetech.websocket_messaging.Repository.MessageRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ConversationService {

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private MessageRepository messageRepository;

    private static final Logger logger = LoggerFactory.getLogger(ConversationService.class);

    @Transactional
    public void createConversation(Conversation conversation) {
        if (conversation.getMessages() == null || conversation.getMessages().isEmpty()) {
            throw new IllegalArgumentException("Conversation must contain at least one message.");
        }

        // Extract the participants from the first message
        Message firstMessage = conversation.getMessages().get(0);
        Long senderId = firstMessage.getSenderId();
        Long recipientId = firstMessage.getRecipientId();

        // Set participant IDs in the conversation
        conversation.setParticipantOneId(senderId);
        conversation.setParticipantTwoId(recipientId);

        logger.info("Checking for an existing conversation between senderId: {} and recipientId: {}", senderId, recipientId);

        // Find if there's an existing conversation with the same participants
        Optional<Conversation> existingConversation = findConversationByParticipants(senderId, recipientId);

        if (existingConversation.isPresent()) {
            // If conversation exists, add new messages to it
            Conversation conversationToUpdate = existingConversation.get();
            List<Message> existingMessages = conversationToUpdate.getMessages();

            for (Message newMessage : conversation.getMessages()) {
                newMessage.setConversation(conversationToUpdate);  // Associate the new message with the conversation
                existingMessages.add(newMessage);  // Add the new message to the existing messages
            }

            conversationRepository.save(conversationToUpdate);
            logger.info("Added new message(s) to the existing conversation between senderId: {} and recipientId: {}",
                    senderId, recipientId);
        } else {
            // If no conversation exists, create a new one
            Conversation newConversation = new Conversation();
            for (Message message : conversation.getMessages()) {
                message.setConversation(newConversation);  // Associate message with the new conversation
            }

            newConversation.setMessages(conversation.getMessages());  // Set the messages for the new conversation
            conversationRepository.save(newConversation);

            logger.info("Created a new conversation and added message(s) between senderId: {} and recipientId: {}",
                    senderId, recipientId);
        }
    }

    private Optional<Conversation> findConversationByParticipants(Long senderId, Long recipientId) {
        List<Conversation> allConversations = conversationRepository.findAll();  // Load all conversations

        // Look for a conversation where participants match the sender and recipient
        for (Conversation conversation : allConversations) {
            for (Message message : conversation.getMessages()) {
                boolean hasSenderAndRecipient = (message.getSenderId().equals(senderId) && message.getRecipientId().equals(recipientId)) ||
                        (message.getSenderId().equals(recipientId) && message.getRecipientId().equals(senderId));
                if (hasSenderAndRecipient) {
                    return Optional.of(conversation);
                }
            }
        }
        return Optional.empty();  // No matching conversation found
    }
    }



