import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import { redirect } from "react-router-dom";

import '../../global.css';
import './styles.css';

import GoogleSignInNormalImage from '../../assets/googleNormal.svg';

import { Link } from 'react-router-dom';
import auth from '../../services/auth.js'

export default function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [name, setName] = useState("");

  async function handleCreateUser(){
    const response = await auth.register(email, senha, name);
    console.log(response)
  }

  async function handleLogInWithGoogle(){
    const response = await auth.singinWithGoogle();
  }


  return (
    <>
      <main className="container">
        <div className="loginBox">
          <h1 className="loginTitle">Cadastro</h1>
            <div className="inputContainer">
              <TextField
                className="input"
                required
                id="filled-required"
                label="NOME DE USUÁRIO"
                variant="filled"
                onChange={(e)=> {setName(e.target.value)}}
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
                onChange={(e) => {setSenha(e.target.value)}}
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
                onChange={(e)=> {setEmail(e.target.value)}}
              />
            </div>
          <button className="button-green" onClick={handleCreateUser}>Criar</button>
          <img src={GoogleSignInNormalImage} onClick={handleLogInWithGoogle} width="50px" />
          <p className="textCreateAcount"><Link to="/"> Voltar </Link> </p>
          {/* google auth */}
        </div>
      </main>
    </>
  );
}
