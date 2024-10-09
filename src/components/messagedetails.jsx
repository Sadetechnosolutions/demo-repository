import React, { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { Icon } from "@iconify/react/dist/iconify.js";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Messagelist from "./chatpeople";
import Navbar from "./navbar";

const MessageDetails = ({ data }) => {

  const stompClientRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [recipientId, setRecipientId] = useState(2);
  useEffect(() => {
      const socket = new SockJS('http://localhost:8091/ws');
      const client = new Client({
          webSocketFactory: () => socket,
          onConnect: (frame) => {
              console.log('Connected: ' + frame);
              client.subscribe('/topic/messages', (messageOutput) => {
                  setMessages((prev) => [...prev, JSON.parse(messageOutput.body)]);
                  setRecipientId(2)
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
          console.log(messages)
  
          // Add the message to the messages state
          setMessages((prev) => [...prev, message]); // Push the entire message object
          setMessageInput(''); // Clear input after sending
      }
  };

  const { messagesId } = useParams();
  const message = data.find(event => event.id === parseInt(messagesId));
  const [inputMessages, setInputMessages] = useState({});
  const [reactions, setReactions] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const {Friends} = useSelector((state)=>state.friend)

  const handleMessageChange = (text) => {
    setInputMessages(prevInputMessages => ({
      ...prevInputMessages,
      [message.id]: text
    }));
  };

 
  const handleReactionClick = (reaction) => {
    setReactions(prevReactions => ({
      ...prevReactions,
      [message.id]: reaction
    }));
    setShowPicker(false); 
  };

  const openReaction = () => {
    setShowPicker(true);
  };

  // const closeReaction = () => {
  //   setShowPicker(false); 
  // };

  const currentInputMessage = inputMessages[message.id];
  const selectedReaction = reactions[message.id];

  return (
    <div className="w-full h-auto flex flex-col ">
     <Navbar />
                <div className="flex h-[56rem]">
                  <Messagelist />
                  <div className=" flex flex-col w-full">
                  <div className="flex items-center px-7 justify-between h-20">
                    <div className="flex items-center gap-2">
              <img
                className="w-9 h-9 rounded-full"
                src={`/${message.img}`}
                alt={message.name}
              />
                <span className="font-semibold">{message.name}</span>
                </div>
                <div className="flex items-center gap-4">
                <Icon className="w-5 h-5"  icon="ion:call-sharp" />
                <Icon className="w-6 h-6" icon="mdi:video" />
                </div>
                </div>
                <hr/>
                <div className="flex h-full">
    <div className="w-5/6 h-auto bg-white relative flex flex-col shadow-lg">
      <div className="px-4 flex flex-col py-4 gap-2">
        <div className="flex flex-col gap-2">
          <div className="h-20 rounded-md gap-4 flex flex-col px-4">
                <div className="flex gap-2 items-start"><img className="w-6 h-6 rounded-full" src={`/${message.img}`} alt='' />
                <div className="flex flex-col"><span className="p-3 w-max bg-gray-50 rounded-lg">{message.message}</span>                
                {selectedReaction && (
                  <span className="relative rounded-lg  bg-yellow-200 cursor-pointer" onClick={openReaction}>
                    {selectedReaction}
                  </span>
                )}
                {!selectedReaction && (
                  <Icon className="w-4 h-4 cursor-pointer" icon="quill:add" onClick={openReaction} />
                )}
                <div className="flex flex-col gap-2">
                </div>
                {showPicker && (
                  <div className="block w-max bg-white border border-gray-200 rounded-lg shadow-md">
                    {['😄', '❤️', '😮', '😢', '😡'].map((reaction, index) => (
                      <button className={selectedReaction === reaction ? 'selected' : ''} key={index} onClick={() => handleReactionClick(reaction)}>
                        {reaction}
                      </button>
                    ))}
                  </div>
                )}
                </div>
                </div>
              </div>
        </div>
      </div>
      <div className="bottom-0 w-full absolute p-3 flex items-center">
        <InputEmoji value={currentInputMessage}
          onChange={handleMessageChange}
          cleanOnEnter
          placeholder="Type your message..."
          className="border h-9 rounded-md border-gray-400 flex-1 mr-2" />
        <Icon className="text-cta cursor-pointer"
          icon="majesticons:send"
          width="1.5em"
          height="1.6em"
          strokeWidth="2"
          onClick={sendMessage}/>
      </div>
    </div>
    <div className="w-1/2 h-full relative flex flex-col shadow-lg">
    <div >
      {Friends.map((friend)=>(
        <div key={friend.id}>
         {friend.id === message.id && 
         <div>
          <div className="flex flex-col items-center justify-center gap-2 w-full h-56">
         <img className="w-24 h-24 rounded-full" src={`/${friend.img}`} alt="" />
         <p className="text-lg font-semibold text-highlight">{friend.name}</p> 
         </div>
         <div className="px-6 flex flex-col gap-4" >
    <div className="flex flex-col gap-2" >
      <p className="text-lg font-semibold">About</p>
      <div className="border p-2 rounded-md border-gray-300">
      {friend.about}
      </div>
          </div>
      <div className="flex flex-col gap-1">
      <p className="text-lg font-semibold">Website</p>
      <p>{friend.website}</p>
      </div>
      <div className="flex flex-col gap-1">
      <p className="text-lg font-semibold">Phone</p>
      <p>{friend.phone}</p>
      </div>
      <div className="flex flex-col gap-1">
      <p className="text-lg font-semibold">Email</p>
      <p>{friend.email}</p>
      </div>
      <div className="flex flex-col gap-1">
      <p className="text-lg font-semibold">Place</p>
      <p>{friend.place}</p>
      </div>
    </div>
         </div>} 
         <div>
    </div>
         </div>
      ))}
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default MessageDetails;
