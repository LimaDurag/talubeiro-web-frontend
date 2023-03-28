import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './global.css';

import { SocketContext, socket } from './context/socketContext.js';
import { AuthContext } from './context/authContext.js';

import Login from './pages/loginPage/login.js';
import Register from './pages/registerPage/register.js';
import Session from './pages/SessionPage/Session.js';
import Menu from './pages/menuPage/menu';
import Recover from './pages/RecoverPage/recover.js';
import Profile from './pages/ProfilePage/profile.js';
//import { socket } from "./config/socket.js";

export default function App() {
  const [userCredencial, setUserCredencial] = useState({});
  const valueAuth = { userCredencial, setUserCredencial };

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) setUserCredencial(JSON.parse(localUser));
  }, []);
  return (
    <SocketContext.Provider value={socket}>
      <AuthContext.Provider value={valueAuth}>
        <BrowserRouter>
          <Routes>
            {/* {userCredencial != null ? <Route index path="/" Component={Login} /> : <Route index path="/" Component={Menu} />} */}
            <Route index path="/" Component={Login} />
            <Route path="/menu" Component={Menu} />
            <Route path="/register" Component={Register} />
            <Route path="/recover" Component={Recover} />
            <Route path="/session" Component={Session} />
            <Route path="/menu" Component={Menu} />
            <Route path="/userprofile" Component={Profile} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </SocketContext.Provider>
  );
}
