import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import Background from './components/backgroundComponent/background';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
