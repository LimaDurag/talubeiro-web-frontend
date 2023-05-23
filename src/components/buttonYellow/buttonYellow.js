import React from 'react';
import '../../global.css';
import './styles.css';

function ButtonYellow({ onClick, buttonText }) {
  return (
    <button className="button-yellow" onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default ButtonYellow;
