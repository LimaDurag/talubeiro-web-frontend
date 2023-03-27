import React, {useState} from 'react';
import { useParams } from "react-router-dom";
import '../../global.css';
import './styles.css';

import ChatComponent from "../../components/chatComponent/ChatComponent.js";
// import useChat from "../../hooks/useChat.js";

export default function Session(props) {
  const { roomId } = useParams();
  // const { messages, sendMessage } = useChat(roomId);
  // const [newMessage, setNewMessage] = React.useState("");

  return (
    <>
      <ChatComponent roomId={roomId}/>
    </>
  );
}
