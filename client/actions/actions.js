
import * as types from '../constants/types.js';
import axios from "axios";

// export const updatePlayers = () => {
//     let play;
//      axios.get(`/api`)
//         .then(response => {
//             return apiRequest(response.data)
//         })
       
//   }
//   export function updatePlayers() {
//     console.log('-->');
//     return function(dispatch) {
//         return axios.get('/api')
//         .then(data => {
//             // dispatch
//             dispatch({
//                 type: types.UPDATE_PLAYERS, 
//                 data: data
//             });
//         });
//     };
// }
//   export const apiRequest = (data) => {
//     console.log('data logged,',data)
//     return {
//       type: types.UPDATE_PLAYERS,
//       data: data,
//     }
//   }

//   export const updatePlayers = async () => {
//     return function(dispatch, getState) {
//       const response  = axios.get('/posts');
//       return {
//         type: types.UPDATE_PLAYERS,
//         payload: response
//       }
//     }
//   };
  
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

export const startGame = () => ({
    type: types.START,
})

