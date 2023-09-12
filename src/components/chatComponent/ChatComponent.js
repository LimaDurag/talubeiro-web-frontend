import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import userAPI from '../../services/userAPI.js';

import useChat from '../../hooks/useChat.js';

import Message from '../MessageComponent/MessageComponent.js';
import DiceMessage from '../DiceMessageComponent.js';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ChatComponent(props) {
  // const [messages, setMessages] = useState([]);
  // const [message, setMessage] = useState('');
  // const socket = useContext(SocketContext);

  // React.useEffect(() => {
  //     socket.on("MESSAGE_RESPONSE", data => {setMessages([...messages, data])})
  //     console.log(messages)
  // }, [socket, messages])

  // const handleSendMessage = (e) => {
  //     e.preventDefault();
  //     if (message.trim()) {
  //     socket.emit('SEND_MESSAGE', {
  //         text: message,
  //         //name: localStorage.getItem('userName'),
  //         id: `${socket.id}${Math.random()}`,
  //         socketID: socket.id,
  //     });
  //     }
  //     setMessage('');
  // };

  const { roomId } = props;
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState('');
  const [user, setUser] = useState({});
  const chatContainerRef = useRef(null);

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

    const chatContainer = chatContainerRef.current;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, []);

  const handleSendMessage = () => {
    if (newMessage !== '') {
      console.log(user.name);
      sendMessage(newMessage, user.name, user.avatar_link);
      setNewMessage('');
      console.log(messages);
    } else {
      console.log('nao pode mandar msg vazia');
    }
  };

  return (
    <Box
      component="div"
      sx={{
        p: 2,
        border: '2px black',
        backgroundColor: 'grey',
        height: '100vh',
        justifyContent: 'center',
      }}
    >
      <Paper>
        <h1>Room: {roomId} </h1>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item sx={{ width: '100%' }}>
          <Box
            ref={chatContainerRef}
            component={Paper}
            sx={{ height: '80vh', overflow: 'auto' }}
          >
              {messages.map((value, index) => {
                if(value.isDiceMessage){
                  return (
                    <DiceMessage name={value.senderId} avatar={value.senderAvatar} time={value.timestamp} results={value.results} key={index} />
                  )  
                }else{
                  return (
                    <Message name={value.senderId} avatar={value.senderAvatar} time={value.timestamp} message={value.body} key={index} />
                  );
                }
              })}
            </Box>
          </Item>
        </Grid>
        <Grid item xs={10}>
          <TextField
            placeholder="Digite sua mensagem..."
            sx={{ width: '100%', height: '80%' }}
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            sx={{
              width: '100%',
              height: '100%',
              color: 'black',
              borderWidth: '4px',
            }}
            onClick={handleSendMessage}
          >
            Enviar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
