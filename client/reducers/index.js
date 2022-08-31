import * as types from '../constants/types';

 const initialState = {
   totalMarkets: 0,
   totalCards: 0,
   marketList: [],
   lastMarketId: 10000,
   newLocation: '',
 };
 
 const tetrisReducer = (state = initialState, action) => {
   let marketList, totalMarkets, lastMarketId, newMarket, totalCards;
 
   switch (action.type) {
     case types.ADD_MARKET:
       // increment lastMarketId and totalMarkets counters
       lastMarketId = state.lastMarketId += 1;
       totalMarkets = state.totalMarkets += 1;
       // create the new market object from provided data
       newMarket = {
         marketId: lastMarketId,
         location: state.newLocation,
         cards: 0, 
         '% of total': 0
       };
       // // push the new market onto a copy of the market list
       marketList = state.marketList.slice();
       marketList.push(newMarket);
       // return updated state
       return {
         ...state,
         marketList,
         lastMarketId,
         totalMarkets,
         newLocation: '',
       };
     case types.SET_NEW_LOCATION:
       if (!action.payload){
         action.payload = '';
       }
       return { ...state, newLocation: action.payload };
 
     case types.ADD_CARD:
       //  UPDATE CARD = CARDS + 1
       //  UPDATE TOTAL PERCENT UPDATE
       
       marketList = state.marketList.slice();
       marketList[action.payload].cards += 1;
       totalCards = state.totalCards += 1;
       marketList[action.payload]['% of total'] = Math.floor((marketList[action.payload].cards / totalCards) * 100);
       console.log('cards logged',state.marketList);
       for (const object of marketList){
         object['% of total'] = Math.floor((object.cards / totalCards) * 100);
       }
       return {
         ...state,
         marketList,
         totalCards,
       };
     case types.DELETE_CARD:
       marketList = state.marketList.slice();
 
       if (marketList[action.payload].cards === 0){
         return {
           ...state,
         };
       }else{
         marketList[action.payload].cards -= 1;
         totalCards = state.totalCards -= 1;
         if(totalCards !== 0){
           for (const object of marketList){
             object['% of total'] = Math.floor((object.cards / totalCards) * 100);
           }
         }else{
           marketList[action.payload]['% of total'] = 0;
         }
         return {
           ...state,
           marketList,
           totalCards,
         };
       }
 
     default: {
       return state;
     }
   }
 };
 
 export default marketsReducer;
 