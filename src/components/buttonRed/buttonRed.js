import React from 'react';
import '../../global.css';
import './styles.css';

function ButtonRed({ onClick, buttonText }) {
  return (
    <button className="button-red" onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default ButtonRed;
