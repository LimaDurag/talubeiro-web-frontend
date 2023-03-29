import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import '../../global.css';
import './styles.css';

// Import Images
import avatarImg from '../../assets/avatarIcon.jpg';
import logo from '../../assets/dados.png';

export default function Header() {
  return (
    <header className="header-container">
      <Stack direction="row" spacing={55}>
        <img className="logo-img" alt="logo" src={logo} />
        <h1 className="header-title">Talubeiro</h1>
        <Button>
          <Link to="/userprofile">
            <Avatar
              alt="User Avatar"
              src={avatarImg}
              className="avatar-content"
              sx={{ width: 70, height: 70, alignSelf: 'center' }}
            />
          </Link>
        </Button>
      </Stack>
    </header>
  );
}
