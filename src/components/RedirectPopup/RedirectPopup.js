import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

function RedirectPopup() {
  const [open, setOpen] = useState(false);
  const [sessionNumber, setSessionNumber] = useState('');
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRedirect = () => {
    navigate(`/session/${sessionNumber}`);
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setSessionNumber(event.target.value);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Entrar na Sala
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Redirecionar para sessão</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Número da sessão"
            type="number"
            fullWidth
            value={sessionNumber}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleRedirect} variant="contained" color="primary">
            Redirecionar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RedirectPopup;
