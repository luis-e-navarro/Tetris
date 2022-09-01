import * as types from '../constants/types';
import { GRID, TETROMINOS, SHAPES} from '../constants/tetromino';
import _ from 'lodash'
import { timervalue } from '../actions/actions.js';
import {clearDropTimeout} from '../actions/actions.js'

const initalState = {
  currentGrid: GRID,
  tetroPiece: 'T',
  tetroGrid: [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
  tetroPosition: {
    x: 3,
    y: -2
  },
  players: []
  }
 
 const tetrisReducer = (state = initalState, action) => {
  let players, tetroPiece, tetroPosition, tetroGrid;
   switch (action.type) {

     case types.MOVE:
      tetroPosition = _.assign({}, state.tetroPosition, {
        x: state.tetroPosition.x + action.payload
      })
       return {
        ...state, 
        tetroPosition
    };

    case types.ROTATE:

    if (state.tetroPiece === 'O'){
      return {
        ...state
      }
    }else{
      const array1 = state.tetroGrid
      const newarr = [];

      for (let z = 0; z < array1.length; z++ ){
        let sub =[];
      for (let i = array1.length -1; i > -1; i--){
        sub.push(array1[i][z])
      }
        newarr.push(sub);
      }

      tetroGrid = state.tetroGrid.slice(state.tetroGrid.length)
      tetroGrid.push(...newarr)

    return {
      ...state,
      tetroGrid
    }
  }
    
     case types.START:
      const rand = Math.floor(Math.random() * TETROMINOS.length)
      state.tetroPiece = '';
      state.tetroPiece += TETROMINOS[rand];
      tetroPiece = state.tetroPiece
      const position = {
      x: Math.round(5) - Math.round(SHAPES[tetroPiece][0].length / 2), 
      y: -2
      }
      tetroPosition = _.assign(state.tetroPosition, position)
      tetroGrid = state.tetroGrid.slice(state.tetroGrid.length)
      tetroGrid = SHAPES[tetroPiece]

      return {
        ...state,
        tetroPiece,
        tetroPosition,
        tetroGrid
      }
   
     
     case types.UPDATE_PLAYERS:
      players = state.players.slice(state.players.length)
      players.push(...action.data)
     return{
      ...state,
      players,
     }
     // DROP REDUCER CASE -----
     case types.DROP:
      tetroPosition = _.assign({}, state.tetroPosition, {
        y: state.tetroPosition.y + 1
      })
      if (state.tetroPosition.y > 5) {
 

        return {
          ...state,
          tetroPosition
        }
      }

      return {
        ...state,
        tetroPosition
      }
    

      // drop until it hits something
      // if (isPositionAvailable(grid, currTetroGrid, newPosition)) {
      //   return updateTetrisStateStorage(_.assign({}, state, { currTetroPosition: newPosition }))
      // }
      
      // position is not available => reaches the bottom-most position of the well
      
      // there is no extra room for the new tetromino, game over
 
      
      // let newGrid = transferTetroGridIntoWell({
      //   grid,
      //   tetroGrid: currTetroGrid,
      //   tetroPosition: currTetroPosition, // not newPosition!!
      //   color: COLORS[currTetromino]
      // })

      // if (hasLineToClear(newGrid)) {
      //   return updateTetrisStateStorage(_.assign({}, state, {
      //     score: score + 10,
      //     linesCleared: linesCleared + 1,
      //     grid: clearLines(newGrid),
      //     currTetromino: nextTetromino,
      //     currTetroGrid: SHAPES[nextTetromino],
      //     currTetroPosition: getInitTetroPosition(nextTetromino),
      //     nextTetromino: getRandomTetromino(),
      //     dropInterval: dropInterval <= DROP_INTERVAL_MIN ? DROP_INTERVAL_MIN :  dropInterval - DROP_INTERVAL_DEC
      //   }))
      // } else {
        return {
          ...state
        }
      
    
      // }
  
 
    
 
     default: {
       return state;
     }
   }
 };
 
 export default tetrisReducer;
 