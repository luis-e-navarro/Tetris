import React, { useEffect } from 'react';
import Scores from './components/Scores.jsx';
import TetrisBoard from './components/TetrisBoard.jsx';
import { connect } from 'react-redux';
import {firstVisit, stopGame} from './actions/actions.js';
import IncomingTetros from './components/IncomingTetros.jsx';
import Introduction from './components/introduction.jsx';

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
   userVisited: state.userVisited,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    stopGame: () => dispatch(stopGame()),
    firstVisit: ()=> dispatch(firstVisit()) 
  }
}

const App = (props) =>  {
  props.gameOver ? props.stopGame() : null;

  useEffect(()=>{
  }, [props.userVisited]);
  
  return (
    <div className="mainDiv">
      {
      props.userVisited 
      ? null : 
      <Introduction 
        firstVisit= {props.firstVisit} 
      />
      }
      <Scores/>
      <TetrisBoard />
      <div id='leftMainDiv'>
        <h2 id='savedHeader'>NEXT</h2>
        <IncomingTetros
        incomingTetros={props.incomingTetros}
        innerState = {props.innerState}
        ongoingScore = {props.ongoingScore}
        userVisited = {props.userVisited}
        />
      </div>
    </div>
  );
}
 
export default connect(mapStateToProps,mapDispatchToProps)(App);
 