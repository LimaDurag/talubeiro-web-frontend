import React from 'react';
import { Link } from 'react-router-dom';

import '../../global.css';
import './styles.css';

function ButtonGreen({ linkButton, buttonText, onClick, imgButton, alt }) {
  return (
    <Link to={linkButton}>
      <button
        className="button-green button-register button-join-room button-upload-img button-confirm-changes button-back-account"
        onClick={onClick}
      >
        <img src={imgButton} alt={alt} className="image-button" />
        {buttonText}
      </button>
    </Link>
  );
}

export default ButtonGreen;
