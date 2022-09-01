
import * as types from '../constants/types.js';
import axios from "axios";

  export const updatePlayers = () => async dispatch => {
    const response  = await axios.get('/api');
    console.log('hi?',response)
    dispatch({type: types.UPDATE_PLAYERS, data: response.data })
} 


export const moveTetroLeft = () => ({
    type: types.MOVE_LEFT,
    payload: -1
  });


export const moveTetroRight = () => ({
    type: types.MOVE_RIGHT,
    payload: 1
});

export const startGame = () => (dispatch) => {
  dispatch({ type: types.START})
  dispatch( setDropTimeout(() => {
    if (gameStatus === STOPPED) return
    
    if (gameStatus === PLAYING) {
      dispatch({ type: DROP })
    }

    dispatch(drop())
  }, 600))
}

//helper functions
export function setDropTimeout(cb, interval) {
  clearDropTimeout()
  window.dropTimer = setTimeout(cb, interval)
}
export function clearDropTimeout() {
  if (!window.dropTimer)  return
  clearTimeout(window.dropTimer)
  window.dropTimer = null
}