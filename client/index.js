import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './styles.css';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(
  <Provider store={store}>
  <App/>
</Provider>,
);





// render(
//   <Provider store={store}>
//     <App/>
//   </Provider>,
//   document.getElementById('contents')
// );
