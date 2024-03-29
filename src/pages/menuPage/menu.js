import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import '../../global.css';
import './styles.css';

import auth from '../../services/auth.js';
import userAPI from '../../services/userAPI';

// Import Components
import RedirectPopup from '../../components/RedirectPopup/RedirectPopup';
import CreatePopup from '../../components/CreatePopupComponent/CreatePopup';
import InputForm from '../../components/InputForm';
import ButtonGreen from '../../components/buttonGreen/buttonGreen';
import ButtonRed from '../../components/buttonRed/buttonRed';

// Import Images
import logo from '../../assets/Images/logo.png';
import logoBottom from '../../assets/Images/logoBottom.png';
import profile from '../../assets/Images/navigationImage/profile.png';

export default function Menu() {
  const navigate = useNavigate();
  const [sessionNumber, setSessionNumber] = useState('');
  const [user, setUser] = useState({});

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
  }, []);

  const handleSignOff = () => {
    auth.singOutUser();
    window.location.reload();
  };

  const handleInputChange = (event) => {
    setSessionNumber(event.target.value);
  };
  const handleRedirect = () => {
    console.log(sessionNumber)
    navigate(`/session/${sessionNumber}`);
  };

  return (
    <main className="container">
      <div className="header-menu">
        <img src={logo} alt="logo" className="logo-menu" />
        {/* <Link to="/" className="disconnect-text" onClick={handleSignOff}>
          Sair da minha conta
        </Link> */}
        <Button
          className="profile-div"
          onClick={() => navigate('/userprofile')}
        >
          {/* onClick={() => navigate('/userprofile')} */}
          <p className="profile-text">{user.name}</p>
          <img src={user.avatar_link ? user.avatar_link : profile} alt="profile" className="profile-img" />
        </Button>
      </div>
      <div className="menu-content">
        <Container style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="content-join-room">
            <p className="code-join-title">CÓDIGO DA SALA</p>
            <InputForm
              label={'Exemplo: 434556'}
              defaultValue={sessionNumber}
              type={'number'}
              margin={'dense'}
              onChange={handleInputChange}
            />
          </div>
          <Link to="/" className="disconnect-text" onClick={handleSignOff}>
            Sair da minha conta
          </Link>
          <div className="div-buttons">
            <div onClick={handleRedirect}>
              <ButtonGreen
                buttonText={'JUNTAR-SE A SALA'}
              />
            </div>
            <CreatePopup />
          </div>
        </Container>
        <Container>
          <div className="container-user-achivements">
            <img src={user.avatar_link ? user.avatar_link : profile} alt="profile" className="achivements-img" />
            <p className="user-name">{user.name}</p>
            <div className="container-achivements">
              <p className="text-achivements">Partidas Jogadas: 0</p>
              <p className="text-achivements">Jogos Ganhos: 0</p>
              <p className="text-achivements">Jogos Perdidos: 0</p>
              <p className="text-achivements">Conquistas: 0</p>
            </div>
          </div>
        </Container>
      </div>
      {/* <div className="div-buttons">
          <CreatePopup />
          <RedirectPopup />
        </div>
        <Button variant="text" className="disconnect-button">
          <Link to="/" className="disconnect-text" onClick={handleSignOff}>
            Sair da minha conta
          </Link>
        </Button>
      </div> */}
      <img src={logoBottom} alt="logoBottom" className="logo-bottom-menu" />
      {/* <CreatePopup /> */}
    </main>
  );
}
