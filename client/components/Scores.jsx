import React, { Component }  from "react";
import { connect } from 'react-redux';
import { updatePlayers, startGame } from "../actions/actions";
import CurrentBoard from './CurrentBoard.jsx';
import GameOver from './GameOver.jsx';
import SavedTetro from "./SavedTetro.jsx";

const mapStateToProps = (state) => {
   return {
    players: state.players,
    tetroGrid: state.tetroGrid,
    gameOver: state.gameOver,
    finalScore: state.finalScore,
    currentGrid: state.currentGrid, 
    tetroPiece: state.tetroPiece, 
    tetroGrid: state.tetroGrid,
    tetroPosition: state.tetroPosition,
    savedTetromino: state.savedTetromino
   }
}

function mapDispatchToProps(dispatch) {
  return {
    updatePlayers: () => dispatch(updatePlayers()),
    startGame: () => dispatch(startGame())
  }
}

class Scores extends Component {
    constructor(props) {
      super (props)
      this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
      const { updatePlayers } = this.props;
      updatePlayers();
    }

  render() {
    const {finalScore, gameOver, currentGrid, tetroGrid, tetroPosition, savedTetromino } = this.props;

    return (
      <div>
            <h2 id='savedHeader'>HOLD</h2>
            <div className='savedTetroBoard'>
            {<SavedTetro
              currentGrid = {currentGrid}
              tetroGrid = {tetroGrid}
              tetroPosition={tetroPosition}
              savedTetromino = {savedTetromino}
            />}
            </div>
        <div className="scoreContainer">
          <div>
            {gameOver ? <GameOver finalScore={finalScore}/> : <CurrentBoard/>}
          </div>
          <ul className="scoreTank">
            {
              this.props.players
                .map(person =>
                  <li className ="eachLine" key= {`playerkey-${person.name}`}><p className="playerName">{person.name.toUpperCase()}</p> <p className="scoreNumber">{person.score}</p> </li>
                )
            }
          </ul>

        </div>
        </div>
        
    )
  }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Scores);