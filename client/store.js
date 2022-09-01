import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import tetrisReducer from './reducers/tetrisReducer';


const store = createStore(
  tetrisReducer,
  composeWithDevTools()
);

export default store;