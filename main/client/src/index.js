import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import io from 'socket.io-client';
//import reportWebVitals from './reportWebVitals'; // TODO: check if we need/want this

window.connection = {};
window.connection.socket = null;
window.connection.connect = function() {
  if (!window.connection.socket) {
    window.connection.socket = io('193.175.85.52:443');
  }
};
window.connection.disconnect = function()  {
  if (window.connection.socket) {
    window.connection.socket.close();
    window.connection.socket = null;
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
