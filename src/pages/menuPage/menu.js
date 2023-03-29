import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../../global.css';
import './styles.css';

import auth from "../../services/auth.js";
// Import Components
import Header from '../../components/headerComponent/header';

export default function Menu() {

  const handleSignOff = () => {
    auth.singOutUser();
    window.location.reload();
  }

  return (
    <main className="container">
      <Header />
      <div className="menu-box">
        <div className="div-buttons">
          <button className="button">CRIAR NOVA SALA</button>
          <button className="button">JUNTAR-SE Á SALA</button>
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
