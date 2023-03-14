import React from 'react';
import ReactDOM from 'react-dom';
import {app, analytics} from './config/firebase.js'
import Background from './components/backgroundComponent/background';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './global.css';

import  Login  from './pages/loginPage/login.js';
import  Register  from "./pages/registerPage/register.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" Component={Login}/>
        <Route path="/register" Component={Register}/>
      </Routes>
    </BrowserRouter>
  );
}
