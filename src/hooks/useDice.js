import { useContext } from "react";
import { SocketContext } from '../context/socketContext';
import { generateRandomDiceNumbers } from "../utils/random";
// import socketIOClient from "socket.io-client";
 

// const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
// const SOCKET_SERVER_URL = "http://localhost:4000";
 

const useDice = () => {
    const socket = useContext(SocketContext)
    //   const socketRef = useRef();
    
    const rollDice = ({num, range}) => {
        const results = generateRandomDiceNumbers(num, range);
        return results;


    };
    return { rollDice };
};

export default useDice;