import React from 'react';
import '../../global.css';
import background from '../../assets/background.png';

function Background() {
  return (
    <div className="container">
      <img
        src={background}
        alt="Fundo com dados coloridos"
        className="backgroundImg"
      />
      <div className="fotter"></div>
    </div>
  );
}

export default Background;
