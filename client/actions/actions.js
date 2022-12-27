
import * as types from '../constants/types.js';
import axios from "axios";
import slam from '../constants/audio/slam.wav'; 


export const updatePlayers = () => async dispatch => {
  const response  = await axios.get('/api');
  dispatch({type: types.UPDATE_PLAYERS, data: response.data })
} 
export const saveTetro = () => ({
  type: types.SAVE_TETRO,
})

// move tetro right or left ------------------------------------------------
export const moveTetroLeft = () => ({
  type: types.MOVE,
  payload: -1
});
export const moveTetroRight = () => ({
    type: types.MOVE,
    payload: 1
});

export const stateFlipOff = () =>({
  type: types.STATE_FLIP_OFF
})

// rotate tetro right or left ------------------------------------------------
export const rotateLeft = () => ({
  type: types.ROTATE,
  payload: false
})
export const rotateRight = () => ({
  type: types.ROTATE,
  payload: true
})

// floordrop -------------------------------------------------------------------
export const floorDrop = () => (dispatch) => {
  let sound = new Audio(slam)
  sound.play();
  dispatch({ type: types.FLOOR_DROP })
}
// drop ----------------------------------------------------------------
export const dropBlocks = () => (dispatch) => {
  dispatch(drop())
}

export const colorBlocks = () => async (dispatch) => {
  clearDropTimeout();
  await dispatch({ type: types.COLOR_LINES })
 
}

// stopgame -------------------------------------------------------------------
export const stopGame = () => (dispatch) => {
  clearDropTimeout();
}

export const startGame =  () => async(dispatch) => {
  clearDropTimeout();
  await dispatch({
    type: types.START,
    payload: false
  })
}

export const startGameRenderSavedTetromino =  () => async(dispatch) => {
  clearDropTimeout();
  await dispatch({
    type: types.START,
    payload: true
  })
}

export const drop = () => async (dispatch) => {
  await setDropTimeout(() => {
    dispatch({ type: types.DROP })
    dispatch(drop())
  }, 500)
}

export function setDropTimeout(cb, interval) {
  clearDropTimeout()
  window.dropTimer = setTimeout(cb, interval)
}

export function clearDropTimeout() {
  if (!window.dropTimer)  return
  clearTimeout(window.dropTimer)
  window.dropTimer = null
}