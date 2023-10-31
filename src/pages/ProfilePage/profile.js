import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Avatar } from '@mui/material';
import '../../global.css';
import './styles.css';

// Import Components
import ButtonRed from '../../components/buttonRed/buttonRed';
import ButtonGreen from '../../components/buttonGreen/buttonGreen';
import BackButton from '../../components/backButton/backButton';
import InputForm from '../../components/InputForm';
import ProfileModal from '../../components/ProfileModal/profileModal';

import userAPI from '../../services/userAPI.js';
import auth from '../../services/auth.js';

// Import Images
import editIcon from '../../assets/Images/icons/edit.png';
import uploadIcon from '../../assets/Images/icons/upload.png';
import profileUserImage from '../../assets/Images/icons/userImg.png';

export default function Profile() {
  //const [file, setFile] = useState(new File());
  const [user, setUser] = useState({});
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();
  const [openModal, setopenModal] = useState(false);

  useEffect(() => {
    var userInfo = JSON.parse(localStorage.getItem('info'));
    if (userInfo && userInfo.uid) {
      setUser(userInfo);
    } else {
      const userAuth = JSON.parse(localStorage.getItem('user'));
      userAPI.getByToken(userAuth.uid).then((response) => {
        localStorage.setItem('info', JSON.stringify(response));
      });
      userInfo = JSON.parse(localStorage.getItem('info'));
      setUser(userInfo);
    }
  }, []);

  const handleSignOff = () => {
    auth.singOutUser();
    navigate('/');
    setTimeout(window.location.reload(), 2000);
  };

  // function handleFileChange(event) {
  //   setFile(event.target.files[0]);
  // }

  const [image, setImage] = useState(null);

  function handleImageUpload(event) {
    const file = event.target.files[0];
    setImage(file);
  }

  function handleSetNickname(event) {
    setNickname(event.target.value);
  }

  const handleUploadAvatar = async () => {
    // userAPI.uploadImageToFirebaseStorage(user.token, image);
    console.log(user.id);
    await userAPI.setAvatar(user.token, image).then(async (response) => {
      if (response !== 0) {
        userAPI.getByToken(user.token).then(async (response) => {
          //console.log(response)
        });
      }
    });
    setUser(JSON.parse(localStorage.getItem('info')));
    // window.location.reload();
  };

  const handleUpdateNickname = async () => {
    await userAPI.update(
      user.id,
      nickname,
      user.email,
      user.token,
      user.avatar_link
    );
    window.location.reload();
  };

  const handleDeactivate = async () => {
    await userAPI.deactivateUser(user.token);
    handleSignOff();
  };

  return (
    <main className="container">
      <ProfileModal
        isOpen={openModal}
        setCloseModal={() => setopenModal(!openModal)}
      />
      <div className="header-profile">
        <BackButton previousPage={() => navigate('/')} />
        <h1 className="header-title">EDITAR PERFIL</h1>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 190,
          width: '100%',
        }}
      >
        <Container maxWidth>
          <div className="div-input-user">
            <p className="label-input-user">Nome de exibição</p>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <InputForm label={user.name} onChange={handleSetNickname}/>
              <img
                src={editIcon}
                alt="edit user input img"
                className="edit-icon"
                onClick={handleUpdateNickname}
              />
            </div>
            <p className="label-input-user">E-mail</p>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <InputForm label={user.email} />
              {/* <img
                src={editIcon}
                alt="edit user input img"
                className="edit-icon"
              /> */}
            </div>

            <p className="label-input-user">Senha</p>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <InputForm label={'**********'} />
              {/* <img
                src={editIcon}
                alt="edit user input img"
                className="edit-icon"
              /> */}
            </div>
          </div>
          <div className="style-button-delete">
            <ButtonRed
              buttonText={'Desativar conta'}
              onClick={() => setopenModal(true)}
            />
          </div>
          <div className="style-button-cancel">
            <ButtonRed buttonText={'Cancelar'} />
          </div>
        </Container>
        <Container maxWidth>
          <div className="div-edit-profile-img">
              <img
                src={user.avatar_link ? user.avatar_link : profileUserImage}
                alt="Profile user Img"
                className="profile-user-image"
              />
            <p className="text-edit-img-user">Editar foto de perfil</p>
            <ButtonGreen
              buttonText={'Upload'}
              alt={'image to upload img'}
              imgButton={uploadIcon}
              onClick={handleUploadAvatar}
            />
            <input type="file" onChange={handleImageUpload} />
          </div>
          <div className="style-button-confirm">
            <ButtonGreen buttonText={'Confirmar'} />
          </div>
        </Container>
      </div>
      {/* <div className="menu-boxx">
        <h1 className="menu-title">{user.name}</h1>
        <div className="div-buttons">
          {user.avatar_link ? (
            <Avatar
              alt="Profile photo"
              src={user.avatar_link}
              sx={{ width: 100, height: 100 }}
            />
          ) : (
            <Avatar alt="Profile photo" sx={{ width: 100, height: 100 }}>
              U
            </Avatar>
          )}

          <br></br>
          <input
            type="file"
            onClick={handleImageUpload}
            placeholder="Alterar Foto de Perfil"
          />
          {image && (
            <img src={URL.createObjectURL(image)} alt="Uploaded image" />
          )}
          <button className="button" onClick={handleUploadAvatar}>
            Confirmar
          </button>

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
          <button className="button" onClick={handleUpdateNickname}>
            Alterar NickName
          </button>
          <button className="button" onClick={handleDeactivate}>
            Desativar Conta
          </button>
        </div>
        <button className="disconnect-button" onClick={handleSignOff}>
          <Link to="/"> Sair da minha conta </Link>
        </button>
      </div> */}
    </main>
  );
}
