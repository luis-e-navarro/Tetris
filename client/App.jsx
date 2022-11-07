import React, { Component } from 'react';
import CurrentBoard from './components/CurrentBoard.jsx';
import GameOver from './components/GameOver.jsx';
import Scores from './components/Scores.jsx';
import TetrisBoard from './components/TetrisBoard.jsx';
import { connect } from 'react-redux';
import {stopGame} from './actions/actions.js'
const mapStateToProps = (state) => {
  return {
   gameOver: state.gameOver,
   finalScore: state.finalScore
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
          <TetrisBoard />
          <div>
          {props.gameOver ? <GameOver finalScore={props.finalScore}/> : <CurrentBoard/>}
          </div>

          <Scores/>
       
        </div>

    );
}
 
export default connect(mapStateToProps,mapDispatchToProps)(App);
 