package com.sadetech.websocket_messaging.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long senderId;
    private Long recipientId;

    @Column(columnDefinition = "TEXT")
    private String content;

    private boolean isRead = false;

    @CreationTimestamp
    private LocalDateTime sentAt;

    private LocalDateTime readAt;

    @ManyToOne
    @JoinColumn(name = "conversation_Id",referencedColumnName = "id")
    @JsonIgnore
    private Conversation conversation;

}
