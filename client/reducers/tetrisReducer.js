import * as types from '../constants/types';
import { GRID, TETROMINOS, SHAPES, TETROCOLORS} from '../constants/tetromino';
import _ from 'lodash'
import { coordinateBuilder, moveAllTetros, moveTetroI, rotateLeft, rotateRight } from '../constants/utils';
import single from '../constants/audio/single.wav'; 
import double from '../constants/audio/double.wav'; 
const initalState = {
  currentGrid: GRID,
  tetroPiece: '',
  tetroGrid: [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
  tetroPosition: {
    x: 3,
    y: -2
  },
  players: [],
  stateFlip: false,
  ongoingScore: 0,
  gameOver: false,
  finalScore: 0,
  innerState: false,
  superGate: false,
  sound: false
  }
 
 const tetrisReducer = (state = initalState, action) => {
  let players, tetroPiece, tetroPosition, tetroGrid, currentGrid, stateFlip, ongoingScore, gameOver,finalScore, innerState, superGate, sound;
   switch (action.type) {
    // turnoff stateflip -------------------------------------------------
    case types.STATE_FLIP_OFF:
      stateFlip = false;
      return{
        ...state,
        stateFlip
      }
    // move --------------------------------------------------------------
     case types.MOVE:
      let sidePosition = undefined

      if (state.tetroPiece === 'I'){
        sidePosition = moveTetroI(state.tetroGrid, state.tetroPosition);
      }else{
        sidePosition = moveAllTetros(state.tetroGrid, state.tetroPosition)
      }

      if (sidePosition.right < 9 && sidePosition.left > 0){
        tetroPosition = _.assign({}, state.tetroPosition, { x: state.tetroPosition.x + action.payload })
      }else if(sidePosition.right === 9  && action.payload < 0){
        tetroPosition = _.assign({}, state.tetroPosition, { x: state.tetroPosition.x + action.payload })
      }else if (sidePosition.left === 0 && action.payload > 0){
        tetroPosition = _.assign({}, state.tetroPosition, { x: state.tetroPosition.x + action.payload })
      }
 
      if(tetroPosition){
        return {
          ...state,
          tetroPosition
        }
      }else{
        return {
          ...state
        };
      }

    // rotate ------------------------------------------------------
      case types.ROTATE:
        if (state.tetroPiece === 'O'){
          return {
            ...state
          }
        }else{
          const array1 = state.tetroGrid
          tetroGrid = state.tetroGrid.slice(state.tetroGrid.length)
          tetroPosition = state.tetroPosition
          if(action.payload){
            tetroGrid.push(...rotateLeft(array1))
          }else{
            tetroGrid.push(...rotateRight(array1))
          }

          const holder = tetroGrid.every(row => row[0] === 0)
            if (state.tetroPosition.x < 0 && !holder){
              if(state.tetroPiece === 'I' && state.tetroPosition.x < -1){
                tetroPosition.x++
              }
              tetroPosition.x++
            }else if(state.tetroPiece === 'I' && state.tetroPosition.x > 6){
              if(state.tetroPosition.x > 7){
                tetroPosition.x-- 
              }
              tetroPosition.x-- 
            }else if (state.tetroPosition.x > 7){
              tetroPosition.x--
            }

            return {
              ...state,
              tetroGrid,
              tetroPosition
            }
        }

      // color lines ------------------------------------------------
      case types.COLOR_LINES:
        innerState = false
        let counter = 0
        let col = TETROCOLORS.C
        currentGrid = state.currentGrid.slice(state.currentGrid.length)
        const colorBuilder = state.currentGrid.reduce((result, row) => {
          if (!row.every(el => el !== null)) {
            result.push([...row])
          } else {
            counter++
            innerState = true
            result.push([col, col, col, col, col, col, col, col, col, col])
          }
          return result
        }, [])
        counter > 1 ? sound = new Audio(double) : sound = new Audio(single);
        
        currentGrid.push(...colorBuilder)
        superGate = false

        return {
          ...state,
          currentGrid,
          innerState,
          superGate,
          sound
        }
        
      // start ------------------------------------------------------
        case types.START:
          ongoingScore = state.ongoingScore
          currentGrid = state.currentGrid.slice(state.currentGrid.length)
          innerState = false


            const gridBuilder = state.currentGrid.reduce((result, row) => {
              if (!row.every(el => el !== null)) {
                result.push([...row])

              } else {
                ongoingScore += 12
 
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
        ongoingScore,
        innerState
      }
   
     // updated CASE ----------------------------------------------------------------------
     case types.UPDATE_PLAYERS:
      players = state.players.slice(state.players.length)
      players.push(...action.data)
     return{
      ...state,
      players,
     }

      // FLOORDROP CASE ----------------------------------------------------------------------
      case types.FLOOR_DROP:
          let droppedBlockPosition = state.tetroPosition
          const adv = Object.values(coordinateBuilder(state.tetroGrid, state.tetroPosition, state.tetroPiece))
          let checkingGrid1 = null
          let checkingGrid2 = null
          let checkingGrid3 = null
          let checkingGrid4 = null
          if (adv[0].length) checkingGrid1 = state.currentGrid[adv[0][1]+1][adv[0][0]]
          if (adv[1].length) checkingGrid2 = state.currentGrid[adv[1][1]+1][adv[1][0]]
          if (adv[2].length) checkingGrid3 = state.currentGrid[adv[2][1]+1][adv[2][0]]
          if (adv[3].length) checkingGrid4 = state.currentGrid[adv[3][1]+1][adv[3][0]]

          while(!checkingGrid1 && !checkingGrid2 && !checkingGrid3 && !checkingGrid4){
            adv[4]++
            if(adv[4] === 19){
              droppedBlockPosition.y++
              checkingGrid1 = true
            }else{
              if(adv[0].length){
                adv[0][1]++
                checkingGrid1 = state.currentGrid[adv[0][1]+1][adv[0][0]]
              }
  
              if(adv[1].length){
                adv[1][1]++
                checkingGrid2 = state.currentGrid[adv[1][1]+1][adv[1][0]]      
              }
  
              if(adv[2].length){
                adv[2][1]++
                checkingGrid3 = state.currentGrid[adv[2][1]+1][adv[2][0]]
              }
  
              if(adv[3].length){
                adv[3][1]++
                checkingGrid4 = state.currentGrid[adv[3][1]+1][adv[3][0]]
              }
              droppedBlockPosition.y++
            }
            
          }
          currentGrid = state.currentGrid
          let relX,relY;
          
          for (let row = 0; row < state.tetroGrid.length; row++) {
            for (let col = 0; col < state.tetroGrid[0].length; col++) {
              if (!state.tetroGrid[row][col]) continue
              relX = droppedBlockPosition.x + col
              relY = droppedBlockPosition.y + row
              currentGrid[relY][relX] = TETROCOLORS[state.tetroPiece]
            }
          }
          stateFlip = true
          superGate = true
          tetroGrid = state.tetroGrid.map((curr)=>{
            return curr.map((el)=>{
              return 0
            })
          })
        return{
          ...state,
          currentGrid,
          stateFlip,
          superGate,
          tetroGrid
        }
     
     // DROP REDUCER CASE ----------------------------------------------------------------------
     case types.DROP:
      innerState = false
      superGate = false
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
        
              currentGrid[relativeY][relativeX] = TETROCOLORS[state.tetroPiece]
            }
          }
          superGate = true
          stateFlip = true
          tetroGrid = state.tetroGrid.map((curr)=>{
            return curr.map((el)=>{
              return 0
            })
          })
          return {
            ...state,
            currentGrid,
            stateFlip,
            superGate,
            tetroGrid
          }
        }else if (checkSpot !== undefined){

           if (checkSpot[crosshair[0]] !== null){
            currentGrid = state.currentGrid
            let upperY = checkerY - howManyAdded
            if (upperY < 0){
              finalScore = state.ongoingScore
              ongoingScore = 0
              gameOver = true
              return {
                ...state,
                currentGrid,
                gameOver,
                ongoingScore,
                finalScore,
                innerState,
                superGate
              }
            }else{
              let relativeX, relativeY;
              for (let row = 0; row < state.tetroGrid.length; row++) {
                for (let col = 0; col < state.tetroGrid[0].length; col++) {
                  if (!state.tetroGrid[row][col]) continue
                  relativeX = state.tetroPosition.x + col
                  relativeY = state.tetroPosition.y + row
            
                  currentGrid[relativeY][relativeX] = TETROCOLORS[state.tetroPiece]
                }
              }
              superGate = true
              stateFlip = true
              tetroGrid = state.tetroGrid.map((curr)=>{
                return curr.map((el)=>{
                  return 0
                })
              })
              return {
                ...state,
                currentGrid,
                stateFlip,
                superGate,
                tetroGrid
              }
            }

           }
           }
      }

      
      tetroPosition = _.assign({}, state.tetroPosition, {
        y: state.tetroPosition.y + 1
      })
      return {
        ...state,
        tetroPosition,
        innerState
      }
       default: {
       return state;
     }
   }
 };
 
 export default tetrisReducer;








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