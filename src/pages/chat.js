import React, { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const Chat = () => {
    const stompClientRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [recipientId, setRecipientId] = useState(2); // Example recipient ID

    useEffect(() => {
        const socket = new SockJS('http://localhost:8091/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: (frame) => {
                console.log('Connected: ' + frame);
                client.subscribe('/topic/messages', (messageOutput) => {
                    setMessages((prev) => [...prev, JSON.parse(messageOutput.body)]);
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });

        client.activate();
        stompClientRef.current = client;

        return () => {
            if (client) {
                client.deactivate();
            }
        };
    }, []);

    const sendMessage = () => {
        const senderId = 1; // Replace with the actual sender ID from your user context or state
    
        if (messageInput && stompClientRef.current && stompClientRef.current.connected) {
            const message = {
                senderId,        // Sender's ID
                recipientId,     // Recipient's ID
                content: messageInput,
            };
            stompClientRef.current.publish({
                destination: '/app/chat',
                body: JSON.stringify(message),
            });
            console.log(JSON.stringify(message));
    
            // Add the message to the messages state
            setMessages((prev) => [...prev, message]); // Push the entire message object
            setMessageInput(''); // Clear input after sending
        }
    };

    return (
        <div>
            <h1>WebSocket Chat</h1>
            <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Enter message"
            />
            <button onClick={sendMessage}>Send Message</button>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg.content}</p>
                ))}
            </div>
        </div>
    );
};

export default Chat;
