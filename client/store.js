import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import tetrisReducer from './reducers/tetrisReducer';
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

const persistedState = localStorage.getItem('FIRST_VISIT') 
? {userVisited: false} 
: {userVisited: true};


const store = createStore(
  tetrisReducer,
  applyMiddleware(thunk),
);

export default store;