
import * as types from '../constants/types.js';
import axios from "axios";
import slam from '../constants/audio/slam.wav'; 


export const updatePlayers = () => async dispatch => {
  const response = await axios.get(`/api`);
  dispatch({type: types.UPDATE_PLAYERS, data: response.data })
};

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
});

// rotate tetro right or left ------------------------------------------------
export const rotateLeft = () => {
  return{
    type: types.ROTATE,
    payload: false
  }
}

export const rotateRight = () => {
  return{
    type: types.ROTATE,
    payload: true
  }
}

// move down -------------------------------------------------------------------
export const moveDown = () => (dispatch) => {
  clearDropTimeout()
  dispatch({type: types.DROP});
}

// floordrop -------------------------------------------------------------------
export const floorDrop = () => (dispatch) => {
  let sound = new Audio(slam)
  // sound.play();
  sound.free;
  dispatch({ type: types.FLOOR_DROP })
}

// drop ----------------------------------------------------------------
export const dropBlocks = () => (dispatch) => {
  dispatch(drop())
}

// color bool ----
export const colorBoolTrue = () => ({
  type: types.COLOR_BOOL,
  payload: true
})

export const colorBoolFalse = () => ({
  type: types.COLOR_BOOL,
  payload: false
})

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
  });
}

export const drop = () => dispatch => {
  window.dropTimer = setInterval(() => {
      dispatch({ type: types.DROP });
      dispatch(colorBoolFalse());
  }, 500);
}

export const clearDropTimeout = () => {
  if (!window.dropTimer) return;  
  clearInterval(window.dropTimer);
  window.dropTimer = null;
}

// export const drop = () =>  (dispatch) => {
//    setDropTimeout(() => { // argument for callback definition starts (cb)
//     dispatch({ type: types.DROP });
//     dispatch(drop());
//     dispatch(colorBoolFalse());
//   }, 
//   500); // interval argument (interval)
// }


// export function setDropTimeout(cb, interval) {
//   clearDropTimeout();
//   window.dropTimer = setTimeout(cb, interval)
// }

// export function clearDropTimeout() {
//   if (!window.dropTimer) return;
//   clearTimeout(window.dropTimer)
//   window.dropTimer = null
// }

