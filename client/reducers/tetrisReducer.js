import * as types from '../constants/types';
import { GRID, TETROMINOS, SHAPES, TETROCOLORS} from '../constants/tetromino';
import _, { has } from 'lodash'
import { moveAllTetros,
  moveTetroI,
  rotateFunc,
  checkRotation,
  checkStartTetroRotate,
  newTetroStartingPosition, 
  ghostTetroPositionBuilder,
  checkSides } from '../constants/utils';
import single from '../constants/audio/single.wav'; 
import doubles from '../constants/audio/doubles.wav';
import quad from '../constants/audio/quad.wav';

const firstRenderLocaleState = localStorage.getItem('FIRST_VISIT') 
? true
: false;

const initalState = {
  currentGrid: GRID,
  tetroPiece: '',
  tetroGrid: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
  tetroPosition: {
    x: 3,
    y: 0
  },
  ghostTetroPosition:{},
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
  colorBool: true,
  userVisited: firstRenderLocaleState,
  topValue: 0
}

const tetrisReducer = (state = initalState, action) => {
  let players, tetroPiece, currentlyPicked, tetroPosition, tetroGrid, incomingTetros, currentGrid, hasSaved, userVisited,
  stateFlip, ongoingScore, colorBool, gameOver,finalScore, innerState, superGate, sound, ghostTetroPosition, savedTetromino, topValue;

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
      };

    // user visited -------------------------------------------------      
    case types.FIRST_VISIT:
      userVisited = true;
      return {
        ...state,
        userVisited
      };

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
      let sidePosition = undefined;
  
      if (state.tetroPiece === 'I'){
        sidePosition = moveTetroI(state.tetroGrid, state.tetroPosition);
      }else{
        sidePosition = moveAllTetros(state.tetroGrid, state.tetroPosition);
      }
      
      if (checkSides(state.tetroPosition, state.tetroGrid,  state.currentGrid, action.payload)){
        tetroPosition = _.assign({}, state.tetroPosition, { x: state.tetroPosition.x + action.payload })          
      };
 
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
          const array1 = state.tetroGrid;
          tetroGrid = state.tetroGrid.slice(state.tetroGrid.length);
          tetroPosition = state.tetroPosition;
          tetroGrid.push(...rotateFunc(array1,action.payload));

          const holder = tetroGrid.every(row => row[0] === 0); //first element in every row is blank ( the left part of the tetrogrid)
          if (state.tetroPosition.x < 0 && !holder){
            if(state.tetroPiece === 'I' && state.tetroPosition.x < -1){
              tetroPosition.x++
            };
            tetroPosition.x++

          }else if(state.tetroPiece === 'I' && state.tetroPosition.x > 6){
            if(state.tetroPosition.x > 7){
              tetroPosition.x-- 
            }
            tetroPosition.x-- 
          }else if (state.tetroPosition.x > 7){
            tetroPosition.x--
          };

          if (checkRotation(tetroPosition, tetroGrid, state.currentGrid)){
            let tempPos = tetroPosition.y;
            if (tetroPosition.y === 0){
              const offSet = checkStartTetroRotate(tetroGrid, state.currentGrid, tetroPosition);
              tetroPosition.y += offSet;
            };

            const ghostPositionArg = _.assign({},tetroPosition);
            const ghostTetroGridArg = [...tetroGrid]
            ghostTetroPosition = ghostTetroPositionBuilder(ghostPositionArg, ghostTetroGridArg, state.tetroPiece, state.currentGrid);
            return {
              ...state,
              tetroGrid,
              tetroPosition,
              ghostTetroPosition
            }
          }else{
            return {
              ...state
            } 
          }
        }

      // color lines ------------------------------------------------
      case types.COLOR_LINES:
        ongoingScore = state.ongoingScore
        let scoreCounter = 0
        let bonus = 0
        topValue = state.topValue - 10;
        innerState = false
        let counter = 0;
        let col = TETROCOLORS.C;
        currentGrid = state.currentGrid.slice(state.currentGrid.length);
        const colorBuilder = state.currentGrid.reduce((result, row) => {
          if (!row.every(el => el !== null)) {
            result.push([...row])
          } else {
            if(scoreCounter === 1) bonus += 6
            if(scoreCounter === 2) bonus += 8
            if(scoreCounter === 3) bonus += 10
            scoreCounter++
            counter++
            innerState = true
            result.push([col, col, col, col, col, col, col, col, col, col])
          }
          return result
        }, []);

        counter === 4 ? sound = new Audio(quad) : counter > 1 ? sound = new Audio(doubles) : sound = new Audio(single);
        
        currentGrid.push(...colorBuilder)
        superGate = false
        scoreCounter *= 12
        scoreCounter += bonus
        ongoingScore += scoreCounter
        return {
          ...state,
          currentGrid,
          innerState,
          superGate,
          ongoingScore,
          sound,
          topValue
        }

      // start ------------------------------------------------------
      case types.START:
        currentGrid = state.currentGrid.slice(state.currentGrid.length)
        innerState = false
        const gridBuilder = state.currentGrid.reduce((result, row) => {
          if (!row.every(el => el !== null)) {
            result.push([...row]);
          } else {
            if(scoreCounter === 1) bonus += 6;
            if(scoreCounter === 2) bonus += 8;
            if(scoreCounter === 3) bonus += 10;
            scoreCounter++;
            result.unshift([null, null, null, null, null, null, null, null, null, null]);
          }
          return result;
        }, []);
        currentGrid.push(...gridBuilder)
        let rand = Math.floor(Math.random() * TETROMINOS.length)
        rand = TETROMINOS[rand];
        hasSaved = state.hasSaved
        incomingTetros = state.incomingTetros;
        const tempTetros = {};
        const TETROMINOS_CLONE = JSON.parse(JSON.stringify(TETROMINOS));

        if(!state.incomingTetros[0].length){ /* this part fills up the right tank of incoming tetromino pieces in the very beginning */ 
          incomingTetros = state.incomingTetros.map((el) => {
            let newTetro = TETROMINOS_CLONE[Math.floor(Math.random() * TETROMINOS_CLONE.length)]
            if(!tempTetros[newTetro]){
              tempTetros[newTetro] = 1;
            }else{
              tempTetros[newTetro]++;
            }
            if(tempTetros[newTetro] === 2){
              let tempIndex = TETROMINOS_CLONE.indexOf(newTetro)
              TETROMINOS_CLONE.splice(tempIndex,1)
            }
            return newTetro;
          })
          tetroPiece = rand;
          savedTetromino = state.savedTetromino;
          currentlyPicked = false;
        }else{  /* this part shifts down the right tank of incoming tetromino pieces */ 
          if(!action.payload){
            tetroPiece = incomingTetros.shift();
            incomingTetros.forEach((el)=> !tempTetros[el] ? tempTetros[el] = 1 : tempTetros[el]++)
            const insertTetroList = TETROMINOS_CLONE.filter((el)=>{
              if(!tempTetros[el] || tempTetros[el] < 2){
                return el;
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

        tetroGrid = state.tetroGrid.slice(state.tetroGrid.length); /* creating a clean copy for redux */
        tetroGrid = SHAPES[tetroPiece];
        const position = {
          x: Math.round(5) - Math.round(SHAPES[tetroPiece][0].length / 2),
          y: 0
        };
        
        position.y += newTetroStartingPosition(tetroGrid, currentGrid, position);
 
        tetroPosition = _.assign(state.tetroPosition, position);
        if (tetroPosition.y === -2 ){
          finalScore = state.ongoingScore
          ongoingScore = 0;
          stateFlip = false;
          gameOver = true
          return {
            ...state,
            currentGrid,
            gameOver,
            ongoingScore,
            finalScore,
            innerState,
            stateFlip,
            superGate
          }
        }else{
          const ghostPositionArg = _.assign({},tetroPosition);
          
          if(ghostPositionArg.y < 0){
            ghostTetroPosition = ghostPositionArg;
          }else{
            if (tetroPiece === 'I'){
              tetroPosition.y--
            };
            
            ghostTetroPosition = ghostTetroPositionBuilder(ghostPositionArg, tetroGrid, tetroPiece, gridBuilder); 
          };
          
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
          innerState,
          ghostTetroPosition
          }          
        };

     // updated CASE ----------------------------------------------------------------------
     case types.UPDATE_PLAYERS:
      players = state.players.slice(state.players.length)
      players.push(...action.data)
     return{
      ...state,
      players,
     }

     // FLOOR DROP ---------------------------------------------------------------------------
    case types.FLOOR_DROP:
        currentGrid = state.currentGrid;
        let relX,relY;
        topValue = state.topValue + 10;

        for (let row = 0; row < state.tetroGrid.length; row++) {
          for (let col = 0; col < state.tetroGrid[0].length; col++) {
            if (!state.tetroGrid[row][col]) continue // makes sure that the tetromino cell isnt empty
            relX = state.ghostTetroPosition.x + col
            relY = state.ghostTetroPosition.y + row;

            if (currentGrid[relY] && (currentGrid[relY][relX] !== undefined)){
              currentGrid[relY][relX] = TETROCOLORS[state.tetroPiece]; 
            }
            
          }
        };

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
        tetroGrid,
        topValue
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
        currentPosition['0'].push(state.tetroPosition.x,state.tetroPosition.y + 1) // constructed bottom line of square tetromino plus one
        currentPosition['1'].push(state.tetroPosition.x + 1, state.tetroPosition.y + 1)
      }else if (state.tetroPiece === 'I'){ // constructed bottom line of I tetromino plus one
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

      for (let row = state.tetroGrid.length - 1; row > -1; row--){ /* iterating through the single tetromino grid container */
        for(let column = state.tetroGrid[0].length - 1; column > -1; column--){
          if (state.tetroGrid[row][column] === 1){ /* if a square in the tetromino grid container itself is populated we enter condition */
            flip = true
            if(!currentPosition[column].length){
              currentPosition[column].push(state.tetroPosition.x + column, checkerY + row) // tetroposition is only the top left hand corner of the container grid
            }
          }
        };
        if (!flip){
          howManyAdded--
        };
      };

      /* ----------------------------------   --------------------------------    ------------------------------ */ 
      checkerY += howManyAdded /* the bottom x line part of current position */
      const allValues = Object.values(currentPosition);

      for (const crosshair of allValues){
        let nextRow = state.currentGrid[crosshair[1]+1]; /* gets the spot right after the current position of the tetromino */

        if(checkerY === 19){ /*  when the tetromino hits the bottom of the grid it prints them onto to the main grid*/
          let relativeX, relativeY;
          currentGrid = state.currentGrid;

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
        }else if (nextRow !== undefined){
           if (nextRow[crosshair[0]] !== null){  /* if the next block under any of the crosshair column values is filled then we stop here and print the tetro */
            currentGrid = state.currentGrid
            let originalYValue = checkerY - howManyAdded
            //if (originalYValue <= 0){ /* if the original y value is equal or less than zero then we quit the game. crazy */ 
            //   finalScore = state.ongoingScore
            //   ongoingScore = 0;
            //   gameOver = true
            //   return {
            //     ...state,
            //     currentGrid,
            //     gameOver,
            //     ongoingScore,
            //     finalScore,
            //     innerState,
            //     superGate
            //   }
            // }else{
              let relativeX, relativeY;
              for (let row = 0; row < state.tetroGrid.length; row++) {
                for (let col = 0; col < state.tetroGrid[0].length; col++) {
                  if (!state.tetroGrid[row][col]) continue;
                  relativeX = state.tetroPosition.x + col
                  relativeY = state.tetroPosition.y + row
                  if(relativeY < 0) continue;
                  currentGrid[relativeY][relativeX] = TETROCOLORS[state.tetroPiece];
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
            //  }

           }
          }
      };

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