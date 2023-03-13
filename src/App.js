import React from 'react';
import Background from './components/backgroundComponent/background';
import './global.css';

export function App() {
  return (
    <>
      <div className="container">
        <h1>Entrar</h1>
        <div className="loginBox">
          <form>
            <div className="inputContainer">
              <label htmlFor="username">Nome de Usuário</label>
              <input type="text" name="username" id="username" />
            </div>
            <div className="inputContainer">
              <label htmlFor="password">Senha</label>
              <input type="password" name="password" id="password" />
            </div>
          </form>

          <button className="button">Login</button>
          <div className="line" />
          <p className="textCreateAcount">Não tem uma conta?</p>
          <button className="button">Criar</button>
        </div>
      </div>
    </>
  );
}
