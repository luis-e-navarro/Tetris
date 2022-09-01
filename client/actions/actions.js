
import * as types from '../constants/types.js';

export const moveTetroLeft = () => ({
    type: types.MOVE_LEFT,
    payload: -1
  });


export const moveTetroRight = () => ({
    type: types.MOVE_RIGHT,
    payload: 1
});

export const startGame = () => ({
    type: types.START,
})

export const updatePlayers = () => ({
    type: types.UPDATE_PLAYERS
})

