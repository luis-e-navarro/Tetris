import * as types from '../constants/types';
import { GRID, TETROMINOS, SHAPES} from '../constants/tetromino';
import _ from 'lodash'

import {clearDropTimeout} from '../actions/actions.js'

const initalState = {
  currentGrid: GRID,
  tetroPiece: '',
  tetroGrid: [],
  tetroPosition: {},
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
      const position = {
      x: Math.round(5) - Math.round(SHAPES[tetroPiece][0].length / 2), 
      y: -2
      }
      return _.assign({}, state, {
        tetroPosition: position,
        tetroGrid: SHAPES[tetroPiece]
      })

   
     
     case types.UPDATE_PLAYERS:
      players = state.players.slice(state.players.length)
      players.push(...action.data)
      console.log('-->', action.data);
     return{
      ...state,
      players,
     }
     // DROP REDUCER CASE -----
     case types.DROP:
      // get the newPosition 
      let newPosition = _.assign({}, tetroPosition, {
        y: tetroPosition.y + 1
      })

      // drop until it hits something
      // if (isPositionAvailable(grid, currTetroGrid, newPosition)) {
      //   return updateTetrisStateStorage(_.assign({}, state, { currTetroPosition: newPosition }))
      // }
      
      // position is not available => reaches the bottom-most position of the well
      
      // there is no extra room for the new tetromino, game over
      // if (currTetroPosition.y < 0) {
      //   clearDropTimeout()
      //   updateTetrisStateStorage(null)
      //   return _.assign({}, state, { gameStatus: STOPPED })
      // }
      
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
      //   return updateTetrisStateStorage(_.assign({}, state, {
      //     grid: newGrid,
      //     score: score + 4,
      //     currTetromino: nextTetromino,
      //     currTetroGrid: SHAPES[nextTetromino],
      //     currTetroPosition: getInitTetroPosition(nextTetromino),
      //     nextTetromino: getRandomTetromino()
      //   }))
      // }
  
 
    
 
     default: {
       return state;
     }
   }
 };
 
 export default tetrisReducer;
 