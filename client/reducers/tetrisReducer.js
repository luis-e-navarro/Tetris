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
  players: [],
  stateFlip: false
  }
 
 const tetrisReducer = (state = initalState, action) => {
  let players, tetroPiece, tetroPosition, tetroGrid, currentGrid, stateFlip;
   switch (action.type) {
    // move ------------------------------------------------------
     case types.MOVE:
      tetroPosition = _.assign({}, state.tetroPosition, {
        x: state.tetroPosition.x + action.payload
      })
       return {
        ...state, 
        tetroPosition
    };
    // rotate ------------------------------------------------------
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
          stateFlip = false
          currentGrid = state.currentGrid.slice(state.currentGrid.length)
          const gridBuilder = state.currentGrid.reduce((result, row) => {
          if (!row.every(el => el !== null)) {
            result.push([...row])
          } else {
    
            result.unshift([null, null, null, null, null, null, null, null, null, null])
          }
          return result
        }, [])

        currentGrid.push(...gridBuilder)


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
        tetroGrid,
        currentGrid,
        stateFlip
      }
   
     
     case types.UPDATE_PLAYERS:
      players = state.players.slice(state.players.length)
      players.push(...action.data)
     return{
      ...state,
      players,
     }
     
     // DROP REDUCER CASE ----------------------------------------------------------------------
     case types.DROP:
      let howManyAdded;
      let checkerY = state.tetroPosition.y
      let currentPosition;
      if (state.tetroPiece === 'O'){
       currentPosition = {
          0:[],
          1:[]
        }
        howManyAdded = 1
        currentPosition['0'].push(state.tetroPosition.x,state.tetroPosition.y + 1)
        currentPosition['1'].push(state.tetroPosition.x + 1, state.tetroPosition.y + 1)
      }else if (state.tetroPiece === 'I'){
        howManyAdded = 3
        currentPosition = {
          0:[],
          1:[],
          2:[],
          3:[],
        }

      }else{
        howManyAdded = 2
        currentPosition = {
          0:[],
          1:[],
          2:[],
        }
      }
        let flip = false
        for (let row = state.tetroGrid.length - 1; row > -1; row--){
          for(let column = state.tetroGrid[0].length - 1; column > -1; column--){
            if (state.tetroGrid[row][column] === 1){
              flip = true
              if(!currentPosition[column].length){
                currentPosition[column].push(state.tetroPosition.x + column, checkerY + row)
              }
            }
          }
          if (!flip){
            howManyAdded--
          }
        }
      checkerY += howManyAdded


      const allValues = Object.values(currentPosition)

      for (const crosshair of allValues){
        let checkSpot = state.currentGrid[crosshair[1]+1]
        if(checkerY === 19){
          let relativeX, relativeY;
          currentGrid = state.currentGrid

          for (let row = 0; row < state.tetroGrid.length; row++) {
            for (let col = 0; col < state.tetroGrid[0].length; col++) {
              if (!state.tetroGrid[row][col]) continue
              relativeX = state.tetroPosition.x + col
              relativeY = state.tetroPosition.y + row
        
              currentGrid[relativeY][relativeX] = 'green'
            }
          }
          stateFlip = true
          return {
            ...state,
            currentGrid,
            stateFlip
          }
        }else if (checkSpot !== undefined){

           if (checkSpot[crosshair[0]] === 'green'){
             let relativeX, relativeY;
             currentGrid = state.currentGrid
   
             for (let row = 0; row < state.tetroGrid.length; row++) {
               for (let col = 0; col < state.tetroGrid[0].length; col++) {
                 if (!state.tetroGrid[row][col]) continue
                 relativeX = state.tetroPosition.x + col
                 relativeY = state.tetroPosition.y + row
           
                 currentGrid[relativeY][relativeX] = 'green'
               }
             }
             stateFlip = true
             return {
               ...state,
               currentGrid,
               stateFlip
             }
           }
           }
      }

      
      tetroPosition = _.assign({}, state.tetroPosition, {
        y: state.tetroPosition.y + 1
      })
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
        // return {
        //   ...state
        // }
      
    
      // }
  
 
    
 
     default: {
       return state;
     }
   }
 };
 
 export default tetrisReducer;
 