import { useEffect, useState, useContext } from "react";
import { SocketContext } from '../context/socketContext';
// import socketIOClient from "socket.io-client";
//import useDice from "./useDice";
 
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const NEW_DICE_MESSAGE_EVENT = "newDiceMessage";
// const SOCKET_SERVER_URL = "http://localhost:4000";
 

const useChat = (roomId) => {
  const socket = useContext(SocketContext)
  const [messages, setMessages] = useState([]);
 // const { handleRollDice } = useDice();
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
  socket.on(NEW_DICE_MESSAGE_EVENT, handleNewMessage);

  // Cleanup function
  return () => {
    socket.off(NEW_CHAT_MESSAGE_EVENT, handleNewMessage);
    socket.off(NEW_DICE_MESSAGE_EVENT, handleNewMessage);
  };
});

  const currentDate = new Date();
  const sendMessage = (messageBody, senderId, senderAvatar) => {
    socket.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      timestamp: `${currentDate.getHours()}:${currentDate.getMinutes()}`,
      senderId: senderId,
      senderAvatar: senderAvatar
    });
  };
 
  // Send dice message
  const diceMessage = (results, senderId, senderAvatar) => {
    //const results = handleRollDice(num, range);
    const currentDate = new Date();
    socket.emit(NEW_DICE_MESSAGE_EVENT, {
      results: results,
      timestamp: `${currentDate.getHours()}:${currentDate.getMinutes()}`,
      senderId: senderId,
      senderAvatar: senderAvatar
    });
  };

  return { messages, sendMessage, diceMessage };
};
 
export default useChat;