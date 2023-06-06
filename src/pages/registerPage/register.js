import React, { useState, useContext } from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import '../../global.css';
import './styles.css';

import GoogleSignInNormalImage from '../../assets/googleNormal.svg';

import { Link, useNavigate } from 'react-router-dom';
import auth from '../../services/auth.js';

import { AuthContext } from '../../context/authContext.js';

// Import Components
import InputForm from '../../components/InputForm';
import ButtonGreen from '../../components/buttonGreen/buttonGreen';
import BackButton from '../../components/backButton/backButton';

// Import Images
import logo from '../../assets/Images/logo.png';

export default function Register() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [name, setName] = useState('');

  const { userCredencial, setUserCredencial } = useContext(AuthContext);

  const navigate = useNavigate();

  async function handleCreateUser() {
    const response = await auth.register(email, senha, name);
    if (response !== 0) {
      setUserCredencial(response);
      localStorage.setItem('user', JSON.stringify(userCredencial));
      navigate('/');
    }
  }

  // async function handleLogInWithGoogle() {
  //   const response = await auth.singinWithGoogle();
  //   if (response !== 0) {
  //     setUserCredencial(response);
  //     localStorage.setItem('user', JSON.stringify(userCredencial));
  //     navigate('/');
  //   }
  // }

  return (
    <>
      <main className="container">
        <img src={logo} alt="logo" className="logo logo-register" />
        <div className="content-box box-register">
          <Container>
            <BackButton previousPage={'/'} />
            <h1 className="register-title">CADASTRO</h1>
            <Stack direction="column" className="">
              <div className="input-container">
                <InputForm
                  label={'NOME DE USUÁRIO'}
                  defaultValue={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="input-container">
                <InputForm
                  label={'EMAIL'}
                  defaultValue={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="input-container">
                <InputForm
                  label={'SENHA'}
                  type={'password'}
                  defaultValue={senha}
                  onChange={(e) => {
                    setSenha(e.target.value);
                  }}
                />
              </div>
              <ButtonGreen
                buttonText={'CADASTRAR'}
                onClick={handleCreateUser}
              />
            </Stack>
          </Container>
        </div>
      </main>
    </>
  );
}
