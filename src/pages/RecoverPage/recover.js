import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import { Link, redirect } from 'react-router-dom';
import '../../global.css';
import './styles.css';

import auth from '../../services/auth.js'

export default function RecoverPage() {
  const [email, setEmail] = useState(" ");

  async function handleSendPasswordRecoverEmail(){
    const response = await auth.sendRecoverEmail(email);
    if(response == 200){
        redirect('/');
      }
  }

  return (
    <>
      <main className="container">
        <div className="loginBox">
          <h1 className="loginTitle">RECUPERAR</h1>
          <form>
            <div className="inputContainer">
              <TextField
                className="input"
                required
                id="filled-required"
                label="E-MAIL DA SUA CONTA"
                variant="filled"
                onChange={(e)=> {setEmail(e.target.value)}}
              />
            </div>
          </form>

          <button className="button-red" onClick={handleSendPasswordRecoverEmail}>Recuperar</button>
          <div className="line" />
          <Link to="/"><span className="button-forget">Voltar</span></Link>
        </div>
      </main>
    </>
  );
}
