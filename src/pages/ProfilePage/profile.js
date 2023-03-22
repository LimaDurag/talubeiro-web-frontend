import React, {useEffect, useState, useContext} from 'react'
import { Link } from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import '../../global.css';
import './styles.css';

import userAPI from "../../services/userAPI.js";

import { AuthContext } from "../../context/authContext.js";

export default function Profile () {

    const [user, setUser] = useState({})

    const { userCredencial, setUserCredencial } = useContext(AuthContext);

    useEffect(()=>{
        setUser(userAPI.getByToken(userCredencial.uid));
    }, [])

  return (
    <main className="container">
      <div className="menu-box">
        <h1 className="menu-title">{user.name}</h1>
        <div className="div-buttons">
        {user.avatar_link ? <Avatar
            alt="Profile photo"
            src={user.avatar_link}
            sx={{ width: 56, height: 56 }}
            /> : <Avatar
            alt="Profile photo"
            sx={{ width: 56, height: 56 }}
        >U</Avatar>}

          <br></br>
          <button className="button" onClick={userAPI.setAvatar}>Alterar Foto de Perfil</button>
          <button className="button">Alterar NickName</button>
          
        </div>
        <button className="disconnect-button">
          <Link to="/background"> Sair da minha conta </Link>
        </button>
      </div>
    </main>
  );
}

