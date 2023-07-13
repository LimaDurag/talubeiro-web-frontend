import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import '../../global.css';
import './styles.scss';

import { useNavigate } from 'react-router-dom';

// Import Components
import InputForm from '../../components/InputForm';
import ButtonRed from '../../components/buttonRed/buttonRed';
import ButtonGreen from '../../components/buttonGreen/buttonGreen';
import ButtonYellow from '../../components/buttonYellow/buttonYellow';

import auth from '../../services/auth.js';
import userAPI from '../../services/userAPI.js';

// Import Images
import logo from '../../assets/Images/logo.png';
import logoBottom from '../../assets/Images/logoBottom.png';
import divide from '../../assets/Images/divideImg.png';
import idea from '../../assets/Images/icons/idea.png';
import lock from '../../assets/Images/icons/lock.png';
import chat from '../../assets/Images/icons/chat.png';
import GoogleSignInNormalImage from '../../assets/Images/googleSign.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  //const { userCredencial, setUserCredencial } = useContext(AuthContext);

  const navigate = useNavigate();

  async function handleLogInWithEmailAndPassword() {
    // const response = await auth.singin(email, senha);
    // if (response !== 0){
    //   setUserCredencial(response);
    //   console.log(response);
    //   localStorage.setItem("user", JSON.stringify(userCredencial))
    //   //window.location.reload()
    // }

    auth
      .singin(email, senha)
      .then((response) => {
        if (response !== 0) {
          localStorage.setItem('user', JSON.stringify(response));
          userAPI.getByToken(response.uid).then((response) => {
            localStorage.setItem('info', JSON.stringify(response));
          });
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log('ERROR LOGIN: ' + error);
      });
  }
  async function handleLogInWithGoogle() {
    auth
      .singinWithGoogle()
      .then((response) => {
        if (response !== 0) {
          localStorage.setItem('user', JSON.stringify(response));
          userAPI.getByToken(response.uid).then((response) => {
            localStorage.setItem('info', JSON.stringify(response));
          });
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log('ERROR LOGIN: ' + error);
      });
  }

  return (
    <>
      <header className="header-logo">
        <img src={logo} alt="logo" className="logo" />
      </header>
      <main className="container">
        <div className="content-box">
          <Container>
            <h1 className="login-title">ENTRAR</h1>
            <Stack direction="column" spacing={2}>
              <div className="input-container">
                <InputForm
                  label={'NOME DE USUÁRIO'}
                  defaultValue={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="input-container">
                <InputForm
                  label={'SENHA'}
                  defaultValue={senha}
                  type={'password'}
                  onChange={(e) => {
                    setSenha(e.target.value);
                  }}
                />
              </div>
              <span className="button-forget">
                <Link to="/recover">Esqueci minha senha</Link>
              </span>
            </Stack>
            <div className="button-div">
              <ButtonRed
                buttonText={'LOGIN'}
                onClick={handleLogInWithEmailAndPassword}
              />
            </div>
          </Container>
          <img src={divide} alt="Divide Content" className="divide-img" />
          <Container>
            <Stack direction="row" spacing={1}>
              <img src={idea} alt="idea img" className="icons-1" />
              <p className="desc-icons">Crie os jogos que quiser!</p>
              <img src={lock} alt="lock img" className="icons-2" />
              <p className="desc-icons">Crie salas privadas!</p>
              <img src={chat} alt="chat img" className="icons-3" />
              <p className="desc-icons">Converse enquanto joga!</p>
            </Stack>
            <div className="line" />
            <ButtonGreen buttonText={'CRIAR CONTA'} linkButton={'/register'} />
            <img
              src={GoogleSignInNormalImage}
              onClick={handleLogInWithGoogle}
              className="img-google"
              alt="Google sign"
            />
            <ButtonYellow buttonText={'ENTRAR COMO CONVIDADO'} />
          </Container>
        </div>
        <img src={logoBottom} alt="logoBottom" className="logo-bottom" />
      </main>
    </>
  );
}
