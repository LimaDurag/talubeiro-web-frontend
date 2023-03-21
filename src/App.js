import React, {useState} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './global.css';

import { SocketContext, socket } from "./context/socketContext.js";
import { AuthContext } from "./context/authContext.js";

import  Login  from './pages/loginPage/login.js';
import  Register  from "./pages/registerPage/register.js";
import Session from "./pages/SessionPage/Session.js";
import Recover from "./pages/RecoverPage/recover.js";

//import { socket } from "./config/socket.js";


export default function App() {

  const [userCredencial, setUserCredencial] = useState({});
  const valueAuth = {userCredencial, setUserCredencial} 

  return (
    <SocketContext.Provider value={socket}>
      <AuthContext.Provider value={valueAuth}>
        <BrowserRouter>
          <Routes>
            <Route index path="/" Component={Login}/>
            <Route path="/register" Component={Register}/>
            <Route path="/recover" Component={Recover}/>
            <Route path="/session" Component={Session}/>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </SocketContext.Provider>
  );
}
