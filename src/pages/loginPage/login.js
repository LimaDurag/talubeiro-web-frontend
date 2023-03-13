import React from 'react';
import TextField from '@mui/material/TextField';
import Background from '../../components/backgroundComponent/background';
import '../../global.css';
import './styles.css';

export function Login() {
  return (
    <>
      <Background />
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
          </form>

          <button className="button-red">Login</button>
          <div className="line" />
          <p className="textCreateAcount">Não tem uma conta?</p>
          <button className="button-green">Criar</button>
        </div>
      </main>
    </>
  );
}
