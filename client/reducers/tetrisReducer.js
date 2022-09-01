import * as types from '../constants/types';
import { GRID, TETROMINOS, SHAPES} from '../constants/tetromino';
import axios from "axios";

const initalState = {
  currentGrid: GRID,
  tetroPiece: '',
  tetroPosition: [],
  players: []
  }
 
 const tetrisReducer = (state = initalState, action) => {
  let players;
   switch (action.type) {
    //move left action
     case types.MOVE_LEFT:

       return {
        ...state
    };
    //move right action
     case types.MOVE_RIGHT:
    
       return {
        ...state
    };
    
     case types.START:
      const rand = Math.floor(Math.random() * TETROMINOS.length)
      tetroPiece = TETROMINOS[rand];
     return {
      ...state,
      tetroPiece
     }
     
     case types.UPDATE_PLAYERS:
      players = state.players.slice(state.players.length)
      players.push(...action.data)
      console.log('-->', action.data);
     return{
      ...state,
      players,
     }
  
 
    
 
     default: {
       return state;
     }
   }
 };
 
 export default tetrisReducer;
 