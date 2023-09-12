import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton
} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";

import { useNavigate } from "react-router-dom";
import {generateRandomNumbers} from "../../utils/random";

import { initRoom } from "../../services/database";

const PopUp = () => {
    const [open, setOpen] = useState(false);
    const [modo, setModo] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleModoChange = (event) => setModo(event.target.value);
  
    const navigate = useNavigate();

    const handleCreate = () => {
    // console.log(`Modo: ${modo}, Senha: ${password}`);
    // handleClose();
      const randomNumbers = generateRandomNumbers(1, 5);
      const randomNumber = randomNumbers[0];
      initRoom(randomNumber, {modo: modo, senha: password});
      navigate(`/session/${randomNumber}`)
    };
    //const handleSenhaChange = (event) => setSenha(event.target.value);


    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handlePasswordChange = (event) => setPassword(event.target.value);
  
    return (
      <div>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          CRIAR SALA
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Configurações</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel id="select-modo-label">Modo</InputLabel>
              <Select
                labelId="select-modo-label"
                id="select-modo"
                value={modo}
                onChange={handleModoChange}
              >
                <MenuItem value="bancoimo">Banco Imobiliário</MenuItem>
                <MenuItem value="jogodavida">Jogo da Vida</MenuItem>
                <MenuItem value="modolivre">Modo Livre</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            <div className="flex flex-row">
                <TextField
                    style={{ width: "90%"}}
                    type={showPassword ? "text" : "password"}
                    label="Senha"
                    value={password}
                    onChange={handlePasswordChange}
        //             InputProps={{
        //                 endAdornment: (
        //                     <InputAdornment position="end">
        //                         <IconButton onClick={handleClickShowPassword}>
        //                             {showPassword ? <VisibilityOff /> : <Visibility />}
        //                         </IconButton>
        //                     </InputAdornment>
        //     ),
        //   }}
                />
                <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleCreate} color="primary">
              Criar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  export default PopUp;
