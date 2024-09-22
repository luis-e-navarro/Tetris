import React, { Component }  from "react";
import { connect } from 'react-redux';
import { updatePlayers, startGame } from "../actions/actions";
import CurrentBoard from './CurrentBoard.jsx';
import GameOver from './GameOver.jsx';
import SavedTetro from "./SavedTetro.jsx";
import BarLoader from "react-spinners/BarLoader";
import { motion, AnimatePresence } from "framer-motion";

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
    savedTetromino: state.savedTetromino,
    ongoingScore: state.ongoingScore,
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
    const { finalScore, gameOver, currentGrid, tetroGrid, tetroPosition, savedTetromino } = this.props;
    const loadingBarsArr = [];
    if (!this.props.players.length){
      for(let i = 0; i < 5; i++){
        loadingBarsArr.push(<div key={`loadingBarsArr-${i}`} style={{ marginBottom: '30px' }}><BarLoader margin={1} color={"#2a9898"} width={300} height={'10px'} size={150} /></div>)
      }
    }
    return (
      <div key="allScoresContainerKey" id="allScoresContainer">
        <div key={"subDivKey"}>
          <h2 key="savedHeaderKey" id='savedHeader'>HOLD</h2>
          <div key="savedTetroBoardKey" className='savedTetroBoard'>
          {<SavedTetro
            currentGrid = {currentGrid}
            tetroGrid = {tetroGrid}
            tetroPosition = {tetroPosition}
            savedTetromino = {savedTetromino}
          />}
          </div>
          </div>
          <div key="scoreContainerKey" className="scoreContainer">
            <div>
              {gameOver ? <GameOver finalScore={finalScore}/> :
              <div>
                <CurrentBoard/>
                <AnimatePresence>
                {this.props.tetroPiece !== '' && (
                  <motion.p
                    className="ongoingScore"
                    animate={{ 
                      scale: [1, 1.5, 11, 20, 35], 
                      opacity: [1, 0.8, 0.4, 0.2, 0] 
                    }}
                    exit={{ scale: 10, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    key={this.props.ongoingScore}
                  >
                    {gameOver ?  '' : this.props.ongoingScore}
                  </motion.p>
                )}
                </AnimatePresence>
              </div>
              }
            
            </div>
            <ul key="scoreTankKey" className="scoreTank">
              { this.props.players.length ?
                this.props.players
                  .map(person =>
                    <li className ="eachLine" key= {`playerkey-${person.alias}`}><p className="playerName">{person.alias.toUpperCase()}</p> <p className="scoreNumber">{person.score}</p> </li>
                  ) : 
                  loadingBarsArr

              }
            </ul>

          </div>
        </div>
        
    )
  }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Scores);