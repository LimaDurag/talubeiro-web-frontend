import React from 'react';
import '../../global.css';
import './styles.css';

function ButtonRed({ onClick, buttonText }) {
  return (
    <button
      className="button-red button-create-room button-delete-account button-cancel-changes button-delete-account"
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}

export default ButtonRed;
