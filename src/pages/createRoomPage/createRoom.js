import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Select,
  Button,
  Container,
  InputLabel,
  MenuItem,
  FormControl,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { RadioButton, RadioButtonGroup } from '@carbon/react';

import '../../global.css';
import './styles.css';

import { generateRandomNumbers } from '../../utils/random';
import { initRoom } from '../../services/database';

// Import Components
import InputForm from '../../components/InputForm';
import ButtonGreen from '../../components/buttonGreen/buttonGreen';
import BackButton from '../../components/backButton/backButton';

// Import Images
import logo from '../../assets/Images/logo.png';
import logoBottom from '../../assets/Images/logoBottom.png';
import profile from '../../assets/Images/navigationImage/profile.png';
import bancoImg from '../../assets/ImgGameModes/bancoimio.png';

export default function CreateRoom() {
  const navigate = useNavigate();
  const [modo, setModo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleModoChange = (event) => setModo(event.target.value);

  const handleCreate = () => {
    // console.log(`Modo: ${modo}, Senha: ${password}`);
    // handleClose();
    const randomNumbers = generateRandomNumbers(1, 5);
    const randomNumber = randomNumbers[0];
    initRoom(randomNumber, { modo: modo, senha: password });
    navigate(`/session/${randomNumber}`);
  };

  const handlePasswordChange = (event) => setPassword(event.target.value);

  const CssSelect = styled(Select)({
    '& .MuiSelect-select': {
      borderColor: '#00AB0f',
      color: '#000',
      fontSize: 24,
      paddingTop: 30,
      fontFamily: 'Inter',
      fontStyle: 'normal',
    },
  });

  return (
    <main className="container">
      <div className="header-menu">
        <img src={logo} alt="logo" className="logo-menu" />
        <Button className="profile-div" onClick={() => navigate('/')}>
          <p className="profile-text">Zé da Manga</p>
          <img src={profile} alt="profile" className="profile-img" />
        </Button>
      </div>
      <div className="room-content">
        <div className="back-button-room">
          <BackButton previousPage={() => navigate('/')} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '88%',
            marginTop: 80,
            padding: 20,
          }}
        >
          <Container>
            <p className="text-mode-game">Modo de Jogo</p>
            <FormControl fullWidth className="form-select">
              <InputLabel id="select-modo-label">Escolher...</InputLabel>
              <CssSelect
                labelId="select-modo-label"
                id="select-modo"
                value={modo}
                onChange={handleModoChange}
                label="Escolher..."
              >
                <MenuItem value={'bancoimo'}>Banco Imobiliário</MenuItem>
                <MenuItem value={'jogodavida'}>Jogo da Vida</MenuItem>
                <MenuItem value={'modolivre'}>Modo Livre</MenuItem>
              </CssSelect>
            </FormControl>
            <p className="text-mode-game" style={{ marginTop: 40 }}>
              Modo de entrada
            </p>
            <RadioButtonGroup
              defaultSelected="free"
              name="radio-button-group"
              valueSelected="free"
              orientation="vertical"
              labelPosition="right"
              className="radio-div"
            >
              <RadioButton
                className="radio"
                id="free"
                labelText="Livre"
                value="free"
              />
              <RadioButton
                className="radio"
                id="password"
                labelText="Bloquear com senha"
                value="password"
              />
            </RadioButtonGroup>
            <InputForm
              label={'Senha da sala'}
              type={'password'}
              defaultValue={password}
              onChange={handlePasswordChange}
            />
            <div style={{ marginTop: 30 }}>
              <ButtonGreen buttonText={'CRIAR SALA'} onClick={handleCreate} />
            </div>
          </Container>
          <Container>
            <div className="container-game-select">
              <img
                src={bancoImg}
                alt="Game mode img"
                className="game-mode-img"
              />
            </div>
          </Container>
        </div>
      </div>
      <img src={logoBottom} alt="logoBottom" className="logo-bottom-menu" />
    </main>
  );
}
