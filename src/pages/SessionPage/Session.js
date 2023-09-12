import React, {useState, useContext, useEffect} from 'react';
import { useParams } from "react-router-dom";
import '../../global.css';
import './styles.css';

import { Grid, Paper, Box, Button, Drawer } from '@mui/material';

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
  
  const [isAutenticated, setAutenticated] = useState(false); 
  const [user, setUser] = useState({});
  // const { messages, sendMessage } = useChat(roomId);
  // const [newMessage, setNewMessage] = React.useState("");
  socket.emit('join',roomId)

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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

  const userString = JSON.stringify(user);
  console.log(userString);

  return (
    <>
      {/* <Button onClick={handleDrawerOpen} className="overlay-button">Open Chat</Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleDrawerClose}
      >
        <ChatComponent roomId={roomId} />
      </Drawer> */}
      <Box sx={{ display: 'flex' }}>
        {isAutenticated ? 
          <><Box sx={{ flexGrow: 1 }}>
            <Paper sx={{ height: '100vh' }}>         
              <Grid container>
              </Grid>
              <iframe
                title="My application widget"
                src={`http://localhost:3456?roomId=${roomId}&userName=${user.name}&userPhoto=${user.avatar_link}`}>
            </iframe>
            </Paper>
          </Box> </> 
      : 
        <PasswordPopup state={isAutenticated} onAuthenticate={handleChangeAuthentication} roomNumber={roomId} />
      }
        
      </Box>
    </>
  );
}