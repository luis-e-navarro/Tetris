import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

//App consists of one feed

// Render an <App> component to the #app div in the body

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);