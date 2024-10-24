package com.sadetech.websocket_messaging.Service;

import com.sadetech.websocket_messaging.Controller.ChatController;
import com.sadetech.websocket_messaging.Model.Conversation;
import com.sadetech.websocket_messaging.Model.Message;
import com.sadetech.websocket_messaging.Repository.ConversationRepository;
import com.sadetech.websocket_messaging.Repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Autowired
    private ChatController chatController;

    @Transactional
    public void saveMessage(Message message) {
        Optional<Conversation> conversationOptional = findConversationByParticipants(message.getSenderId(), message.getRecipientId());

        if (conversationOptional.isPresent()) {
            // Existing conversation found
            Conversation conversation = conversationOptional.get();
            message.setConversation(conversation);  // Associate message with the existing conversation
            messageRepository.save(message);  // Save the message
            messagingTemplate.convertAndSend("/topic/conversation/" + conversation.getId(), message);
        } else {
            // No conversation found, create a new one
            Conversation newConversation = new Conversation();
            newConversation.setParticipantOneId(message.getSenderId());
            newConversation.setParticipantTwoId(message.getRecipientId());

            // Save the new conversation first
            conversationRepository.save(newConversation);  // Save the conversation to get an ID

            // Now associate the message with the new conversation
            message.setConversation(newConversation);
            messageRepository.save(message);  // Save the message with a valid conversation reference

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

    @Transactional
    public void deleteMessageForSelf(Long id, Long userId) {
        Optional<Message> optionalMessage = messageRepository.findById(id);

        if (optionalMessage.isPresent()) {
            Message message = optionalMessage.get();
            if (message.getSenderId().equals(userId)) {
                message.setDeletedBySender(true);  // Mark as deleted by sender
            } else if (message.getRecipientId().equals(userId)) {
                message.setDeletedByRecipient(true);  // Mark as deleted by recipient
            }

            // Save changes
            messageRepository.save(message);

            // Notify the WebSocket topic that the message was deleted for the user
            Long conversationId = message.getConversation().getId();
            chatController.notifyMessageDeletion(conversationId, message.getId(), userId);

            // If both sender and recipient deleted the message, remove it from the database
            if (message.isDeletedBySender() && message.isDeletedByRecipient()) {
                messageRepository.delete(message);
                chatController.notifyMessageDeletedForEveryone(conversationId, message.getId());
            }
        } else {
            throw new IllegalArgumentException("Message not found");
        }
    }

    @Transactional
    public void deleteMessageForEveryone(Long id) {
        Optional<Message> optionalMessage = messageRepository.findById(id);

        if (optionalMessage.isPresent()) {
            Message message = optionalMessage.get();
            Long conversationId = message.getConversation().getId();

            // Delete the message from the database
            messageRepository.delete(message);

            // Notify all participants in the conversation that the message was deleted for everyone
            chatController.notifyMessageDeletedForEveryone(conversationId, message.getId());
        } else {
            throw new IllegalArgumentException("Message not found");
        }
    }



}
