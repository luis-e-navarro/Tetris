import * as types from '../constants/types';
import { GRID, TETROMINOS, SHAPES, TETROCOLORS} from '../constants/tetromino';
import _, { has } from 'lodash'
import { moveAllTetros, moveTetroI, rotateLeft, ghostTetroPositionBuilder, rotateRight } from '../constants/utils';
import single from '../constants/audio/single.wav'; 
import doubles from '../constants/audio/doubles.wav';
import quad from '../constants/audio/quad.wav'
const initalState = {
  currentGrid: GRID,
  tetroPiece: '',
  tetroGrid: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
  tetroPosition: {
    x: 3,
    y: -2
  },
  ghostTetroPosition:{
    x: 3,
    y: 18
  },
  players: [],
  stateFlip: false,
  ongoingScore: 0,
  gameOver: false,
  finalScore: 0,
  innerState: false,
  superGate: false,
  sound: false,
  savedTetromino: '',
  hasSaved: false,
  currentlyPicked: false,
  incomingTetros: ['','','','','',''],
  colorBool: true
}

const tetrisReducer = (state = initalState, action) => {
  let players, tetroPiece, currentlyPicked, tetroPosition, tetroGrid, incomingTetros, currentGrid, hasSaved,
  stateFlip, ongoingScore, colorBool, gameOver,finalScore, innerState, superGate, sound, ghostTetroPosition, savedTetromino;
  switch (action.type) {
    case types.COLOR_BOOL:
      colorBool = action.payload;
      return {
        ...state,
        colorBool
      }
    // turnoff stateflip -------------------------------------------------
    case types.STATE_FLIP_OFF:
      stateFlip = false;
      return{
        ...state,
        stateFlip
      }
    // saved tetro ---------------------------------------------------------
    case types.SAVE_TETRO:
      if(!state.hasSaved){
        savedTetromino = state.tetroPiece;
      }  
      return{
        ...state,
        savedTetromino,
        currentlyPicked
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
        const ghostPositionArg = _.assign({},tetroPosition)
        ghostTetroPosition = ghostTetroPositionBuilder(ghostPositionArg, state.tetroGrid, state.tetroPiece, state.currentGrid);
        return {
          ...state,
          tetroPosition,
          ghostTetroPosition
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
            const ghostPositionArg = _.assign({},tetroPosition)
            const ghostTetroGridArg = [...tetroGrid]
            ghostTetroPosition = ghostTetroPositionBuilder(ghostPositionArg, ghostTetroGridArg, state.tetroPiece, state.currentGrid);
            return {
              ...state,
              tetroGrid,
              tetroPosition,
              ghostTetroPosition
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
        counter === 4 ? sound = new Audio(quad) : counter > 1 ? sound = new Audio(doubles) : sound = new Audio(single);
        
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
        let scoreCounter = 0
        let bonus = 0
        const gridBuilder = state.currentGrid.reduce((result, row) => {
          if (!row.every(el => el !== null)) {
            result.push([...row])
          } else {
            if(scoreCounter === 1) bonus += 6
            if(scoreCounter === 2) bonus += 8
            if(scoreCounter === 3) bonus += 10
            scoreCounter++
            result.unshift([null, null, null, null, null, null, null, null, null, null])
          }
          return result
        }, [])
        scoreCounter *= 12
        scoreCounter += bonus
        ongoingScore += scoreCounter
        currentGrid.push(...gridBuilder)
        let rand = Math.floor(Math.random() * TETROMINOS.length)
        rand = TETROMINOS[rand];
        hasSaved = state.hasSaved
        incomingTetros = state.incomingTetros
        const tempTetros = {};
        const TETROMINOS_CLONE = JSON.parse(JSON.stringify(TETROMINOS));
        if(!state.incomingTetros[0].length){
          incomingTetros = state.incomingTetros.map((el) => {
            let newTetro = TETROMINOS_CLONE[Math.floor(Math.random() * TETROMINOS_CLONE.length)]
            if(!tempTetros[newTetro]){
              tempTetros[newTetro] = 1
            }else{
              tempTetros[newTetro]++
            }
            if(tempTetros[newTetro] === 2){
              let tempIndex = TETROMINOS_CLONE.indexOf(newTetro)
              TETROMINOS_CLONE.splice(tempIndex,1)
            }
            return newTetro;
          })
          tetroPiece = rand
          savedTetromino = state.savedTetromino
          currentlyPicked = false;
        }else{
          if(!action.payload){
            tetroPiece = incomingTetros.shift();
            incomingTetros.forEach((el)=> !tempTetros[el] ? tempTetros[el] = 1 : tempTetros[el]++)
            const insertTetroList = TETROMINOS_CLONE.filter((el)=>{
              if(!tempTetros[el] || tempTetros[el] < 2){
                return el
              }
            })
            let newTetromino = insertTetroList[Math.floor(Math.random() * insertTetroList.length)]
            incomingTetros.push(newTetromino)
            savedTetromino = state.savedTetromino
            currentlyPicked = false;
          }else{
            tetroPiece = !state.hasSaved ? incomingTetros.shift() : state.savedTetromino;
            !state.hasSaved ? incomingTetros.push(rand) : null;
            savedTetromino = state.tetroPiece;
            currentlyPicked = true;
            hasSaved = true
          }
        }

        const position = {
          x: Math.round(5) - Math.round(SHAPES[tetroPiece][0].length / 2),
          y: -2
        }
        
        tetroPosition = _.assign(state.tetroPosition, position)
        const ghostPositionArg = _.assign({},tetroPosition)
        ghostPositionArg.y += 3
        tetroGrid = state.tetroGrid.slice(state.tetroGrid.length)
        tetroGrid = SHAPES[tetroPiece]
        ghostTetroPosition = ghostTetroPositionBuilder(ghostPositionArg, tetroGrid, tetroPiece, gridBuilder);
      return {
        ...state,
        incomingTetros,
        hasSaved,
        currentlyPicked,
        savedTetromino,
        tetroPiece,
        tetroPosition,
        tetroGrid,
        currentGrid,
        ongoingScore,
        innerState,
        ghostTetroPosition
      }
   
     // updated CASE ----------------------------------------------------------------------
     case types.UPDATE_PLAYERS:
      players = state.players.slice(state.players.length)
      players.push(...action.data)
     return{
      ...state,
      players,
     }
      case types.FLOOR_DROP:

          currentGrid = state.currentGrid

          let relX,relY;
          
          for (let row = 0; row < state.tetroGrid.length; row++) {
            for (let col = 0; col < state.tetroGrid[0].length; col++) {
              if (!state.tetroGrid[row][col]) continue
              relX = state.ghostTetroPosition.x + col
              relY = state.ghostTetroPosition.y + row;
              currentGrid[relY][relX] = TETROCOLORS[state.tetroPiece];
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
      superGate = false;
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