import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Background from '../../components/backgroundComponent/background';
import '../../global.css';
import './styles.css';

import auth from '../../services/auth.js';

import { AuthContext } from '../../context/authContext.js';

export default function Login() {
  const [email, setEmail] = useState(' ');
  const [senha, setSenha] = useState(' ');

  const { userCredencial, setUserCredencial } = useContext(AuthContext);

  async function handleLogInWithEmailAndPassword() {
    const response = await auth.singin(email, senha);
    if (response != 0) setUserCredencial(response);
  }

  return (
    <>
      <main className="container">
        <div className="loginBox">
          <h1 className="loginTitle">Entrar</h1>
          <form>
            <div className="inputContainer">
              <TextField
                className="input"
                required
                id="filled-required"
                label="NOME DE USUÁRIO"
                variant="filled"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="inputContainer">
              <TextField
                className="input"
                id="filled-password-input"
                label="SENHA"
                type="password"
                autoComplete="current-password"
                variant="filled"
                required
                onChange={(e) => {
                  setSenha(e.target.value);
                }}
              />
            </div>
          </form>

          <button
            className="button-red"
            onClick={handleLogInWithEmailAndPassword}
          >
            Login
          </button>
          <span className="button-forget">
            <Link to="/recover">Esqueceu a Senha?</Link>
          </span>
          <div className="line" />
          <p className="textCreateAcount">Não tem uma conta?</p>
          <button className="button-green">
            <Link to="/background"> Criar </Link>{' '}
          </button>
        </div>
      </main>
    </>
  );
}
