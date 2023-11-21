import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../global.css';
import './styles.css';

// Import components
import ButtonGreen from '../buttonGreen/buttonGreen';
import ButtonRed from '../buttonRed/buttonRed';

import userAPI from '../../services/userAPI.js';
import auth from '../../services/auth.js';

const BACKGROUND_STYLE = {
  display: 'flex',
  position: 'absolute',
  justifyContent: 'center',
  zIndex: '1000',
  width: '70%',
  height: 800,
  background: '#f2f2f2',
  borderRadius: 25,
};

function ProfileModal({ isOpen, setCloseModal, user }) {
  const navigate = useNavigate();

  const handleSignOff = () => {
    auth.singOutUser();
    navigate('/');
    setTimeout(window.location.reload(), 2000);
  };

  const handleDeactivate = async () => {
    await userAPI.deactivateUser(user.token);
    handleSignOff();
  };

  if (isOpen) {
    return (
      <div style={BACKGROUND_STYLE} className="div-modal-delete-account">
        <h1 className="title-modal-delete">Desativar conta</h1>
        <div className="desc-delete-account-div">
          <p className="desc-delete-account">Deseja desativar a sua conta?</p>
          <p className="desc-delete-account">
            Todos os seus <p style={{ color: 'rgba(191, 4, 19, 1)' }}>dados</p>{' '}
            serão
          </p>
          <p
            className="desc-delete-account"
            style={{ color: 'rgba(191, 4, 19, 1)' }}
          >
            PERMANENTEMENTE PERDIDOS
          </p>
        </div>
        <div className="buttos-div-delete-account">
          <ButtonGreen buttonText={'Voltar'} onClick={setCloseModal} />
          <ButtonRed buttonText={'Desativar'} onClick={handleDeactivate} />
        </div>
      </div>
    );
  }

  return null;
}

export default ProfileModal;
