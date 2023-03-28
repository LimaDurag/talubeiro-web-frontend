import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../../global.css';
import './styles.css';

// Import Components
import Header from '../../components/headerComponent/header';

export default function Menu() {
  return (
    <main className="container">
      <Header />
      <div className="menu-box">
        <div className="div-buttons">
          <button className="button">CRIAR NOVA SALA</button>
          <button className="button">JUNTAR-SE Á SALA</button>
        </div>
        <Button variant="text" className="disconnect-button">
          <Link to="/background" className="disconnect-text">
            {' '}
            Sair da minha conta{' '}
          </Link>
        </Button>
      </div>
    </main>
  );
}
