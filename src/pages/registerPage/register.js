import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Background from '../../components/backgroundComponent/background';
import '../../global.css';
import './styles.css';

import { Link } from 'react-router-dom';
import auth from '../../services/auth.js'

export default function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [name, setName] = useState("");
  const [cod, setCod] = useState(0);

  async function handleCreateUser(){
    const response = await auth.register(email, senha, name);
    console.log(response);
    setCod(response);
  }

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
          </form>
          <div className="line" />
          <button className="button-green" onClick={handleCreateUser}>Criar</button>
          {/** DEBUG: APAGAR DEPOIS ESSA LINHA */} <p>Código: {cod}</p>
          <p className="textCreateAcount"><Link to="/"> Voltar </Link> </p>
          {/* google auth */}
        </div>
      </main>
    </>
  );
}
