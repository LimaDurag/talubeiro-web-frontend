import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { useNavigate } from "react-router-dom";

import { searchRoom } from "../../services/database";


const useStyles = makeStyles({
    error: {
      borderColor: 'red',
    },
    success: {
      borderColor: 'green',
    },
  });

const PasswordPopup = ({state, roomNumber, onAuthenticate}) => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(true);
    const [password, setPassword] = useState("");
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
        navigate("/");
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        // Aqui você pode adicionar a lógica de autenticação do usuário com a senha inserida
        console.log(`Autenticando usuário com senha: ${password}`);

        const room = await searchRoom(roomNumber);
        if(room && room.senha === password) {
            onAuthenticate(true);
            setIsPasswordCorrect(true);
            setOpen(false);
        }else{
            setIsPasswordCorrect(false)
        }
      };
    
    return(
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Entrar na Sala </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                <DialogContentText>
                    Insira a senha da Sala.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Senha"
                    type="password"
                    fullWidth
                    value={password}
                    className={isPasswordCorrect ? classes.success : classes.error}
                    onChange={handlePasswordChange}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit" color="primary">Entrar</Button>
                </DialogActions>
            </form>
        </Dialog>

    )
}

export default PasswordPopup;