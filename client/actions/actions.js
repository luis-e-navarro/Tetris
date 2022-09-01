
import * as types from '../constants/types.js';
import axios from "axios";



  export const updatePlayers = () => async dispatch => {
    const response  = await axios.get('/api');
    dispatch({type: types.UPDATE_PLAYERS, data: response.data })
} 


export const moveTetroLeft = () => ({
    type: types.MOVE,
    payload: -1
  });


export const moveTetroRight = () => ({
    type: types.MOVE,
    payload: 1
});

export const rotate = () => ({
  type: types.ROTATE
})

export const startGame = () => (dispatch) => {
  dispatch({ type: types.START })
  dispatch(drop())
}

export const drop = () => (dispatch) => {
  setDropTimeout(() => {
    dispatch({ type: types.DROP })
    dispatch(drop())
  }, 200)
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