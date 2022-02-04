import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
// import { w3cwebsocket as W3CWebSocket } from "websocket";
// const client = new W3CWebSocket('ws://127.0.0.1:8000');
const { io } = require("socket.io-client")("https://192.168.0.91:5000");
// const socket = io("https://127.0.0.1:5000");
socket.on("connect_error", (err) => {  console.log(`connect_error due to ${err.message}`);});
// socket.on("connect", () => {  console.log(socket.id); });
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
