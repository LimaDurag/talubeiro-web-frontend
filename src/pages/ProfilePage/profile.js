import React, {useEffect, useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Avatar from "@mui/material/Avatar";
import '../../global.css';
import './styles.css';

import userAPI from "../../services/userAPI.js";
import auth from "../../services/auth.js";

export default function Profile () {
  
  //const [file, setFile] = useState(new File());
  const [user, setUser] = useState({})
  const [nickname, setNickname] = useState("")
  const navigate = useNavigate();


    useEffect(()=>{
        var userInfo = JSON.parse(localStorage.getItem('info'));
        if(userInfo && userInfo.uid){
          setUser(userInfo);
        }else{
          const userAuth = JSON.parse(localStorage.getItem('user'));
          userAPI.getByToken(userAuth.uid).then(response => {
            localStorage.setItem('info', JSON.stringify(response));
          })
          userInfo = JSON.parse(localStorage.getItem('info'));
          setUser(userInfo);
        }
          
    }, [])

    const handleSignOff = () => {
      auth.singOutUser();
      navigate("/");

    }


    // function handleFileChange(event) {
    //   setFile(event.target.files[0]);
    // }

    const [image, setImage] = useState(null);

    function handleImageUpload(event) {
      const file = event.target.files[0];
      setImage(file);

    }
    
    const handleUploadAvatar = async () => {
      // userAPI.uploadImageToFirebaseStorage(user.token, image);
      console.log(user.id)
      await userAPI.setAvatar(user.token, image)
      .then( async (response) => {
        if (response !== 0){
          userAPI.getByToken(user.token).then(async (response) => {
            //console.log(response)
          })
        }
      });
      setUser(JSON.parse(localStorage.getItem("info")));
      // window.location.reload();
    }

    const handleUpdateNickname = async () => {
      await userAPI.update(user.id, nickname, user.email, user.token, user.avatar_link);
      window.location.reload();
    }

    const handleDeactivate = async () => {
      await userAPI.deactivateUser(user.token);
      window.location.reload();
    }
  
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
          <input type="file" onClick={handleImageUpload} placeholder="Alterar Foto de Perfil" />
          {image && (
            <img src={URL.createObjectURL(image)} alt="Uploaded image" />
          )}
          <button className="button" onClick={handleUploadAvatar}>Confirmar</button>
          
          <TextField
                className="input"
                required
                id="filled-required"
                label="NOME DE USUÁRIO"
                variant="filled"
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
              />
          <button className="button" onClick={handleUpdateNickname}>Alterar NickName</button>
          <button className="button" onClick={handleDeactivate}>Desativar Conta</button>
          
        </div>
        <button className="disconnect-button" onClick={handleSignOff}>
          <Link to="/"> Sair da minha conta </Link>
        </button>
      </div>
    </main>
  );
}

