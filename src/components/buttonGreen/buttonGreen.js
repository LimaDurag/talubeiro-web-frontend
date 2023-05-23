import React from 'react';
import '../../global.css';
import './styles.css';

function ButtonGreen({ onClick, buttonText }) {
  return (
    <button className="button-green button-register" onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default ButtonGreen;
