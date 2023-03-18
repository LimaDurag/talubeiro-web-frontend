import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './global.css';

import { SocketContext, socket } from "./context/socketContext.js";

import  Login  from './pages/loginPage/login.js';
import  Register  from "./pages/registerPage/register.js";
import Session from "./pages/SessionPage/Session.js";

//import { socket } from "./config/socket.js";


export default function App() {

  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" Component={Login}/>
          <Route path="/register" Component={Register}/>
          <Route path="/session" Component={Session}/>
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}
