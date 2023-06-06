import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './global.css';

import { SocketContext, socket } from './context/socketContext.js';
import { AuthContext } from './context/authContext.js';

import Login from './pages/loginPage/login.js';
import Register from './pages/registerPage/register.js';
import Session from './pages/SessionPage/Session.js';
import CreateRoom from './pages/createRoomPage/createRoom';
import Menu from './pages/menuPage/menu';
import Recover from './pages/RecoverPage/recover.js';
import Profile from './pages/ProfilePage/profile.js';
import FreeMode from './pages/FreeModePage/FreeMode.js';

//import { socket } from "./config/socket.js";

export default function App() {
  const [userCredencial, setUserCredencial] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [userToken, setUserToken] = useState('');
  const valueAuth = {
    userCredencial: userCredencial,
    setUserCredencial: setUserCredencial,
    isLogged: isLogged,
    user_token: userToken,
  };

  useEffect(() => {
    let localUserReq = localStorage.getItem('user');
    if (localUserReq && localUserReq !== undefined) {
      let localUserJson = JSON.parse(localUserReq);
      setUserToken(localUserJson.uid);
      setIsLogged(true);
      setUserCredencial(localUserJson);
    }
    console.log(isLogged);
  }, []);
  return (
    <SocketContext.Provider value={socket}>
      <AuthContext.Provider value={valueAuth}>
        {isLogged ? (
          <BrowserRouter>
            <Routes>
              <Route index path="/" Component={Menu} />
              <Route path="/create-room" Component={CreateRoom} />

              <Route path="/session/:roomId" Component={Session} />
              <Route path="/userprofile" Component={Profile} />
              <Route path="/freemode" Component={FreeMode} />
            </Routes>
          </BrowserRouter>
        ) : (
          // AUTH ROUTES
          <BrowserRouter>
            <Routes>
              <Route index path="/" Component={Login} />
              <Route path="/register" Component={Register} />
              <Route path="/recover" Component={Recover} />
              <Route path="/userprofile" Component={Profile} />
            </Routes>
          </BrowserRouter>
        )}
      </AuthContext.Provider>
    </SocketContext.Provider>
  );
}
