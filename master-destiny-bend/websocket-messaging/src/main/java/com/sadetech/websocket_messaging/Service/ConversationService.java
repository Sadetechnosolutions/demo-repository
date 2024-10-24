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

    @Transactional(readOnly = true)
    public Optional<Conversation> getConversationByParticipants(Long participantOneId, Long participantTwoId) {
        return conversationRepository.findByParticipants(participantOneId, participantTwoId);
    }

    public Optional<Message> getMessageById(Long id){
        Optional<Message> message = messageRepository.findById(id);
        if(message.isPresent()){
            return message;
        }else {
            throw new IllegalArgumentException("No messages found");
    }
    }

    public List<Conversation> getAllConversation(){
        List<Conversation> conversations = conversationRepository.findAll();
        if(!conversations.isEmpty()){
            return conversations;
        }else {
            throw new IllegalArgumentException("No conversation found");
    }
    }



}