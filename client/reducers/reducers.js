import * as types from '../constants/types';
import { GRID, TETROMINOS, SHAPES} from '../constants/tetromino';


const initalState = {
  currentGrid: GRID,
  tetroPiece: '',
  tetroPosition: []
  }
 
 const tetrisReducer = (state = initalState, action) => {
   
 
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
 
     case types.RUN:

       return {
         ...state,

       };
     case types.START:
      const rand = Math.floor(Math.random() * TETROMINOS.length)
      tetroPiece = TETROMINOS[rand];
     return {
      ...state,
      tetroPiece
     }
  
 
    
 
     default: {
       return state;
     }
   }
 };
 
 export default tetrisReducer;
 