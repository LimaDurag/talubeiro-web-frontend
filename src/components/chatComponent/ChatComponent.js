import React, {useContext, useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { SocketContext } from "../../context/socketContext.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function ChatComponent() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const socket = useContext(SocketContext);

    React.useEffect(() => {
        socket.on("MESSAGE_RESPONSE", data => {setMessages([...messages, data])})
        console.log(messages)
    }, [socket, messages])

    
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
        socket.emit('SEND_MESSAGE', {
            text: message,
            //name: localStorage.getItem('userName'),
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id,
        });
        }
        setMessage('');
    };

  return (
    <Box component="div" sx={{ p: 2, border: '2px black', backgroundColor: "grey", height: "100vh", justifyContent: "center" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <Item sx={{width: "100%"}}>
                    <Grid
                    container
                    direction="column"
                    justifyContent="flex-end"
                    alignItems="flex-start"
                    sx={{width: "100%", height: "80vh"}}
                >
                        {messages.map((value) => { return (
                            <Grid item>
                                {value.text}
                            </Grid>
                         ) })}
                </Grid>
            </Item>
        </Grid>
        <Grid item xs={10}>
          <TextField sx={{width: "100%", height: "80%"}} value={message} onChange={(e)=> {setMessage(e.target.value)}} />
        </Grid>
        <Grid item xs={2}>
          <Button sx={{width: "100%", height: "100%"}} onClick={handleSendMessage}>Enviar</Button>
        </Grid>
      </Grid>
    </Box>
  );
}