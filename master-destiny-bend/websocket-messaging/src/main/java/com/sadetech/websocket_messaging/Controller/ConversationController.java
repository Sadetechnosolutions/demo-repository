package com.sadetech.websocket_messaging.Controller;

import com.sadetech.websocket_messaging.Model.Conversation;
import com.sadetech.websocket_messaging.Service.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/web-socket")
public class ConversationController {

    @Autowired
    private ConversationService conversationService;

    // Endpoint to create or update a conversation
    @PostMapping("/create")
    public ResponseEntity<String> createConversation(@RequestBody Conversation conversation) {
        conversationService.createConversation(conversation);
        return ResponseEntity.ok("Conversation created/updated successfully!");
    }

}
