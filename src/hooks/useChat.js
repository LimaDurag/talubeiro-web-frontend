import { useEffect, useState, useContext } from "react";
import { SocketContext } from '../context/socketContext';
// import socketIOClient from "socket.io-client";
 
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
// const SOCKET_SERVER_URL = "http://localhost:4000";
 

const useChat = (roomId) => {
  const socket = useContext(SocketContext)
  const [messages, setMessages] = useState([]);
//   const socketRef = useRef();
 
useEffect(() => {
  // Set up listener
  const handleNewMessage = (message) => {
    const incomingMessage = {
      ...message,
      ownedByCurrentUser: message.senderId === socket.id,
    };
    setMessages((messages) => [...messages, incomingMessage]);
  };
  socket.on(NEW_CHAT_MESSAGE_EVENT, handleNewMessage);

  // Cleanup function
  return () => {
    socket.off(NEW_CHAT_MESSAGE_EVENT, handleNewMessage);
  };
}, []);

 
  const sendMessage = (messageBody) => {
    socket.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socket.id,
    });
  };
 
  return { messages, sendMessage };
};
 
export default useChat;