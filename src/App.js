import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './global.css';

import { SocketContext, socket } from './context/socketContext.js';
import { AuthContext } from './context/authContext.js';

import Login from './pages/loginPage/login.js';
import Register from './pages/registerPage/register.js';
import Session from './pages/SessionPage/Session.js';
import Menu from './pages/homePage/home';
import Recover from './pages/RecoverPage/recover.js';
import Background from './components/backgroundComponent/background';

//import { socket } from "./config/socket.js";

export default function App() {
  const [userCredencial, setUserCredencial] = useState({});
  const valueAuth = { userCredencial, setUserCredencial };
  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/recover" Component={Recover} />
          <Route path="/session" Component={Session} />
          <Route path="/menu" Component={Menu} />
          <Route path="/background" Component={Background} />
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}
