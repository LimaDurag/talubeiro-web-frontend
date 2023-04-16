import React, {useState, useContext, useEffect} from 'react';
import { useParams } from "react-router-dom";
import '../../global.css';
import './styles.css';
import ContainerTabuleiro from '../../components/ContainerTabuleiro/ContainerTabuleiro';

import { SocketContext } from "../../context/socketContext.js";

export default function FreeMode(props) {
  return (
    <ContainerTabuleiro/>
  );
}
