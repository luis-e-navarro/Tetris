import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import './styles.css';

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <App key="appkey"/>
  </React.StrictMode>
);