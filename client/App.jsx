import React, { Component } from 'react';
import Scores from './components/Scores.jsx';
import TetrisBoard from './components/TetrisBoard.jsx';
import { connect } from 'react-redux';
import {stopGame} from './actions/actions.js'
import IncomingTetros from './components/IncomingTetros.jsx'
const mapStateToProps = (state) => {
  return {
   gameOver: state.gameOver,
   currentGrid: state.currentGrid, 
   tetroPiece: state.tetroPiece, 
   tetroGrid: state.tetroGrid,
   tetroPosition: state.tetroPosition,
   savedTetromino: state.savedTetromino,
   incomingTetros: state.incomingTetros,
   stateFlip: state.stateFlip,
   innerState: state.innerState,
   ongoingScore: state.ongoingScore,
  }
}
function mapDispatchToProps(dispatch) {
  return {
      stopGame: () => dispatch(stopGame())
  }
}


const App = (props) =>  {

  props.gameOver ? props.stopGame() : null

  return (
        <div className="mainDiv">
          <Scores/>
          <TetrisBoard />
          <div id='leftMainDiv'>
              <h2 id='savedHeader'>NEXT</h2>
              <IncomingTetros
              incomingTetros={props.incomingTetros}
              innerState = {props.innerState}
              ongoingScore = {props.ongoingScore}
              />
          </div>
        </div>
    );
}
 
export default connect(mapStateToProps,mapDispatchToProps)(App);
 