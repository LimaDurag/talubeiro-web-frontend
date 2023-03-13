import React from 'react';
import ReactDOM from 'react-dom/client';
import { Login } from './pages/loginPage/login';
import Background from './components/backgroundComponent/background';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);

reportWebVitals();
