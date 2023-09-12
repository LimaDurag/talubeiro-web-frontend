import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../global.css';
import './styles.css';

import backbutton from '../../assets/Images/navigationImage/backButton.png';

function BackButton({ previousPage }) {
  const navigate = useNavigate();

  return (
    <button
      className="button-back button-back-profileUser"
      onClick={previousPage}
    >
      <img src={backbutton} alt="button back" className="back-img" />
    </button>
  );
}

export default BackButton;
