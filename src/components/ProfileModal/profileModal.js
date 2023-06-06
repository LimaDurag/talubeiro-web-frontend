import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../global.css';
import './styles.css';

// Import components
import ButtonGreen from '../buttonGreen/buttonGreen';
import ButtonRed from '../buttonRed/buttonRed';

const BACKGROUND_STYLE = {
  display: 'flex',
  position: 'fixed',
  justifyContent: 'center',
  zIndex: '1000',
  width: '70%',
  height: 800,
  background: '#f2f2f2',
  marginTop: 100,
  borderRadius: 25,
};

function ProfileModal({ isOpen, setCloseModal }) {
  const navigate = useNavigate();

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
          <ButtonRed buttonText={'Desativar'} />
        </div>
      </div>
    );
  }

  return null;
}

export default ProfileModal;
