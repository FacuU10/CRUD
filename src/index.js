import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <App />
    
  </React.StrictMode>
);

// Si quieres comenzar a medir el rendimiento en tu aplicación, pasa una función
// para registrar resultados (por ejemplo: reportWebVitals(console.log))
// o envíalos a un punto final de análisis. Aprende más: https://bit.ly/CRA-vitals
reportWebVitals();
