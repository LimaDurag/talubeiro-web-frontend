import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../global.css';
import './styles.css';

import backbutton from '../../assets/Images/navigationImage/backButton.png';

function BackButton({ onClick, buttonText }) {
  const navigate = useNavigate();

  return (
    <button className="button-back">
      <Link to="/">
        <img src={backbutton} alt="button back" className="back-img" />
      </Link>
    </button>
  );
}

export default BackButton;
