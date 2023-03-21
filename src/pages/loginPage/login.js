import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Background from '../../components/backgroundComponent/background';
import '../../global.css';
import './styles.css';

import auth from '../../services/auth.js';

export default function Login() {
  const [email, setEmail] = useState(' ');
  const [senha, setSenha] = useState(' ');
  const [logged, setLogged] = useState(false);

  async function handleLogInWithEmailAndPassword() {
    console.log(email);
    const response = await auth.singin(email, senha);
    if (response === 200 || response === 201) setLogged(true);
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
