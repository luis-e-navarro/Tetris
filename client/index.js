import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './styles.css';

// const root = ReactDOM.createRoot(document.getElementById("app"));
// root.render(
//   <React.StrictMode>
//     <App key="appkey"/>
//   </React.StrictMode>
// );



import store from './store';

render(
  // wrap the App in the Provider Component and pass in the store
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('contents')
);
