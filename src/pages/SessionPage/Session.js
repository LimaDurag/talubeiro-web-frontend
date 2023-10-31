/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect} from 'react';
import { useParams } from "react-router-dom";
import '../../global.css';
import './styles.css';

import { Grid, Paper, Box, Button, Drawer } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { SocketContext } from "../../context/socketContext.js";

import userAPI from '../../services/userAPI';
import { searchRoom } from '../../services/database'

import PasswordPopup from "../../components/PasswordPopupComponent/PasswordPopup";
export default function Session(props) {
  const socket = useContext(SocketContext)
  
  const { roomId } = useParams();
  const navigate = useNavigate();
  
  const [isAutenticated, setAutenticated] = useState(false); 
  const [user, setUser] = useState({});
  const [roomInfo, setRoomInfo] = useState({});
  // const { messages, sendMessage } = useChat(roomId);
  // const [newMessage, setNewMessage] = React.useState("");
  async function handleSearchRoom(roomId){
    setRoomInfo(await searchRoom(roomId));
  }
  
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    handleSearchRoom(roomId);
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
  }, [roomId]);

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