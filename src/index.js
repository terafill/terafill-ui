import App from './App';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';

// window.Buffer = window.Buffer || require("buffer").Buffer;
import { Buffer } from 'buffer';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
