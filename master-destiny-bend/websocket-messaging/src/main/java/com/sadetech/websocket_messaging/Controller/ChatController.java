package com.sadetech.websocket_messaging.Controller;

import com.sadetech.websocket_messaging.Model.Message;
import com.sadetech.websocket_messaging.Service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class  ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // WebSocket endpoint for receiving messages from clients
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public Message receiveMessage(Message message) {
        // Save message to the conversation in the database
        chatService.saveMessage(message);
        return message;
    }

    // Programmatically broadcast message to a specific conversation topic
    public void broadcastToConversation(Long conversationId, Message message) {
        messagingTemplate.convertAndSend("/topic/conversation/" + conversationId, message);
    }

//    public void notifyMessageDeletion(Long conversationId, Long id, Long userId) {
//        messagingTemplate.convertAndSend("/topic/conversation/" + conversationId,
//                "Message " + id + " was deleted by user " + userId);
//    }
//
//    public void notifyMessageDeletedForEveryone(Long conversationId, Long id) {
//        messagingTemplate.convertAndSend("/topic/conversation/" + conversationId,
//                "Message " + id + " was deleted for everyone.");
//    }

}
