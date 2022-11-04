
import * as types from '../constants/types.js';
import axios from "axios";



export const updatePlayers = () => async dispatch => {
  const response  = await axios.get('/api');
  dispatch({type: types.UPDATE_PLAYERS, data: response.data })
} 


// move tetro right or left ------------------------------------------------
export const moveTetroLeft = () => ({
  type: types.MOVE,
  payload: -1
});
export const moveTetroRight = () => ({
    type: types.MOVE,
    payload: 1
});

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
  dispatch({ type: types.FLOOR_DROP })
}
// color lines ----------------------------------------------------------------
export const colorLines = () => (dispatch) => {
  dispatch({ type: types.COLOR_LINES })
}
// stopgame -------------------------------------------------------------------
export const stopGame = () => (dispatch) => {
  clearDropTimeout();
}

export const startGame = () => (dispatch) => {
  dispatch({ type: types.START })
  dispatch(drop())
}

export const drop = () => (dispatch) => {
  setDropTimeout(() => {
    dispatch({ type: types.DROP })
    dispatch(drop())
  }, 100)
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