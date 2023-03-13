import React from 'react';
import TextField from '@mui/material/TextField';
import Background from '../../components/backgroundComponent/background';
import '../../global.css';
import './styles.css';

export function Register() {
  return (
    <>
      <Background />
      <main className="container">
        <div className="loginBox">
          <h1 className="loginTitle">Cadastro</h1>
          <form>
            <div className="inputContainer">
              <TextField
                className="input"
                required
                id="filled-required"
                label="NOME DE USUÁRIO"
                variant="filled"
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
              />
            </div>
            <div className="inputContainer">
              <TextField
                className="input"
                id="filled-input"
                label="EMAIL"
                type="email"
                variant="filled"
                required
              />
            </div>
          </form>
          <div className="line" />
          <button className="button-green">Criar</button>
          <p className="textCreateAcount"> Ou </p>
          {/* google auth */}
        </div>
      </main>
    </>
  );
}
