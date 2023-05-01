import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../../global.css';
import './styles.css';

import {generateRandomNumbers} from "../../utils/random";
import auth from "../../services/auth.js";
// Import Components
import Header from '../../components/headerComponent/header';
import RedirectPopup from '../../components/RedirectPopup/RedirectPopup';

export default function Menu() {
  const navigate = useNavigate();

  const handleCreate = () => {
    const randomNumbers = generateRandomNumbers(1, 5);
    const randomNumber = randomNumbers[0];
    navigate(`/session/${randomNumber}`);
  };

  const handleSignOff = () => {
    auth.singOutUser();
    window.location.reload();
  }

  return (
    <main className="container">
      <Header />
      <div className="menu-box">
        <div className="div-buttons">
        <Button variant="contained" onClick={handleCreate}>
          CRIAR SALA
        </Button>
          <RedirectPopup />
        </div>
        <Button variant="text" className="disconnect-button">
          <Link to="/" className="disconnect-text" onClick={handleSignOff}>
            {' '}
            Sair da minha conta{' '}
          </Link>
        </Button>
      </div>
    </main>
  );
}
