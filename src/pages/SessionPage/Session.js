import React, {useState, useContext, useEffect} from 'react';
import { useParams } from "react-router-dom";
import '../../global.css';
import './styles.css';

import { Grid, Paper, Box, Button } from '@mui/material';

import { SocketContext } from "../../context/socketContext.js";

import userAPI from '../../services/userAPI';

import useDice from '../../hooks/useDice';
import useChat from '../../hooks/useChat';

import ChatComponent from "../../components/chatComponent/ChatComponent.js";
import PasswordPopup from "../../components/PasswordPopupComponent/PasswordPopup";
// import useChat from "../../hooks/useChat.js";

export default function Session(props) {
  const socket = useContext(SocketContext)
  
  const { roomId } = useParams();
  
  const { rollDice } = useDice();
  const { diceMessage } = useChat(roomId)

  const [isAutenticated, setAutenticated] = useState(false); 
  const [user, setUser] = useState({});
  // const { messages, sendMessage } = useChat(roomId);
  // const [newMessage, setNewMessage] = React.useState("");
  socket.emit('join',roomId)


  useEffect(() => {
    var userInfo = JSON.parse(localStorage.getItem('info'));
    if (userInfo && userInfo.uid) {
      setUser(userInfo);
    } else {
      const userAuth = JSON.parse(localStorage.getItem('user'));
      userAPI.getByToken(userAuth.uid).then((response) => {
        localStorage.setItem('info', JSON.stringify(response));
      });
      userInfo = JSON.parse(localStorage.getItem('info'));
      setUser(userInfo);
    }
  }, []);

  function handleChangeAuthentication(value){
    setAutenticated(value)
  }

  function handleRollDice(){
    let results = rollDice({num:2, range:6});
    diceMessage(results, user.name, user.avatar_link)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {isAutenticated ? 
        <><Box sx={{ flexGrow: 1 }}>
          <Paper sx={{ height: '100vh' }}>         
            <Grid container>
              <Button onClick={handleRollDice}>
                ROLAR DADOS
              </Button>
            </Grid>
          </Paper>
        </Box>
        <ChatComponent roomId={roomId} /> </> 
    : 
      <PasswordPopup state={isAutenticated} onAuthenticate={handleChangeAuthentication} roomNumber={roomId} />
    }
      
    </Box>
  );
}
