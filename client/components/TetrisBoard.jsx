import React, { Component } from "react";
import { connect } from 'react-redux';
import BoardGrid from './BoardGrid.jsx'
import WholeTetro from "./WholeTetro.jsx";
import GhosTetro from "./GhostTetro.jsx";

import { 
  startGame,
  moveTetroLeft,
  startGameRenderSavedTetromino,
  moveTetroRight,
  dropBlocks, stateFlipOff,
  rotateLeft,colorBlocks,
  rotateRight, floorDrop,
  saveTetro, colorBoolFalse, colorBoolTrue, moveDown 
} from "../actions/actions";

const mapStateToProps = (state) => {
  return {
    currentGrid: state.currentGrid, 
    tetroPiece: state.tetroPiece, 
    tetroGrid: state.tetroGrid,
    tetroPosition: state.tetroPosition,
    stateFlip: state.stateFlip,
    gameOver: state.gameOver,
    innerState: state.innerState,
    superGate: state.superGate,
    sound: state.sound,
    ghostTetroPosition: state.ghostTetroPosition,
    hasSaved: state.hasSaved,
    currentlyPicked: state.currentlyPicked,
    colorBool: state.colorBool,
    topValue: state.topValue,
    userVisited: state.userVisited,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startGame: () => dispatch(startGame()),
    moveTetroLeft: () => dispatch(moveTetroLeft()),
    moveTetroRight: () => dispatch(moveTetroRight()),
    rotateLeft: () => dispatch(rotateLeft()),
    rotateRight: () => dispatch(rotateRight()),
    floorDrop: () => dispatch(floorDrop()),
    dropBlocks: () => dispatch(dropBlocks()),
    stateFlipOff:()=> dispatch(stateFlipOff()),
    colorBlocks: ()=> dispatch(colorBlocks()),
    slamSound:() => dispatch(slamSound()),
    saveTetro:() => dispatch(saveTetro()),
    startGameRenderSavedTetromino:() => dispatch(startGameRenderSavedTetromino()),
    moveDown:() => dispatch(moveDown()),
    colorBoolTrue:() => dispatch(colorBoolTrue()),
    colorBoolFalse:() => dispatch(colorBoolFalse())
  }
};

class TetrisBoard extends Component{
  constructor(props) {
    super(props);

    this.state = {
      keyState: {},
      moveLeftCounter: 2,
      moveRightCounter: 2,
      moveCounter: 2,
      rotateCounter: 4
    };
  };

  start = (e) => {
    const { keyState } = this.state;

    switch (e.keyCode){
      // case SPACE_KEY:
      //   this.props.startGame();
      //   this.props.dropBlocks();
      //   break;
      case 68:
        this.setState({
          keyState: {
            ...keyState,
            [e.keyCode]: false
          }
        });
        this.setState({ moveRightCounter: 2 });
        break;
      case 65:
        this.setState({
          keyState: {
            ...keyState,
            [e.keyCode]: false
          }
        });
        this.setState({ moveLeftCounter: 2 });
        break;
      case 37:
        this.setState({
          keyState: {
            ...keyState,
            [e.keyCode]: false
          }
        });
        this.setState({rotateCounter: 4});
        break;
      case 39:
        this.setState({
          keyState: {
            ...keyState,
            [e.keyCode]: false
          }
        });
        this.setState({rotateCounter: 4});
        break;
      case 83:
        this.setState({
          keyState: {
            ...keyState,
            [e.keyCode]: false
          }
        });
        this.setState({moveCounter: 4});
        this.props.dropBlocks();
        break;
      default:
        break;
    };
  };

  move = (e) =>{   
    const { keyState } = this.state;  
    //e.preventDefault();
    switch (e.keyCode){
      case 68:
        if(!keyState[65] && !keyState[68] ){
          this.props.moveTetroRight();
        }else{
          this.setState({moveLeftCounter: 2});    
        };
        keyState[e.keyCode] = true
        break;
      case 65:
        if(!keyState[65] && !keyState[68]){
          this.props.moveTetroLeft();
        }else{
          this.setState({moveRightCounter: 2});              
        };
        keyState[e.keyCode] = true
        break;
      case 37:
          if(!keyState[e.keyCode]){
              this.props.rotateRight();
          };
          keyState[e.keyCode] = true
          break;
      case 39:
          if(!keyState[e.keyCode]){
              this.props.rotateLeft();
          }
          keyState[e.keyCode] = true
          break;
      case 40:
        if(!this.props.currentlyPicked){
          if(!this.props.hasSaved){
            this.props.saveTetro();
            this.props.startGameRenderSavedTetromino();
            this.props.dropBlocks();
          }else{
            this.props.startGameRenderSavedTetromino();
            this.props.dropBlocks();
          }
        }
        break;
      case 83:
        if(!keyState[e.keyCode]){
          this.props.moveDown();
        }
        keyState[e.keyCode] = true;
        break;
      default:
        break;
    }
  };

  slam = (e) =>{
      switch (e.keyCode){
      case 87:
        this.props.floorDrop();
        break;
      default:
        break;
    }
  };

  gameLoop = () => {
    const { keyState, moveLeftCounter, moveRightCounter, moveCounter, rotateCounter} = this.state; 
    const { moveTetroLeft, moveTetroRight, rotateLeft, rotateRight, moveDown} = this.props;

    if (keyState[65]){
      if(moveLeftCounter > 0){
        this.setState({moveLeftCounter: this.state.moveLeftCounter - 1});
      }else {
        moveTetroLeft();
      }
    };

    if (keyState[68]){
      if(moveRightCounter > 0){
        this.setState({moveRightCounter: this.state.moveRightCounter - 1});
      }else{
        moveTetroRight();
      }
    };

    if (keyState[37]){
      if(rotateCounter > 0){
        this.setState({rotateCounter: this.state.rotateCounter - 1});
      }else{
        rotateRight();
      }
    };

    if (keyState[39]){
      if(rotateCounter > 0){
        this.setState({rotateCounter: this.state.rotateCounter - 1});
      }else{
        rotateLeft();
      }
    };

    if (keyState[83]){
      if(moveCounter > 0){
        this.setState({moveCounter: this.state.moveCounter - 1});
      }else{
        moveDown();
      }
    };

    if (!this.props.gameOver){
      if (!this.props.innerState  ){
        setTimeout(this.gameLoop, 67);  
      };
    };
  };

  componentDidMount(){
    if(!this.props.gameOver && this.props.userVisited){
      document.addEventListener('keyup', this.start);
      document.addEventListener('keydown', this.move);
      document.addEventListener('keydown', this.slam);

      this.gameLoop();
    };
  };

  async componentDidUpdate(prevProps){
    if(prevProps.userVisited !== this.props.userVisited && !this.props.gameOver && this.props.userVisited){
      document.addEventListener('keyup', this.start);
      document.addEventListener('keydown', this.move);
      document.addEventListener('keydown', this.slam);

      this.gameLoop();
    };

    if(this.props.stateFlip){ /* blocks touched/landed */
      /* 
        clearing blocks colors blocks first
        superGate is used to route all updates to colorBlocks first,
        the value of superGate is assigned to false after every invocation of superGate
      */
      if (this.props.superGate){ 
        await this.props.colorBlocks();
        if(this.props.innerState){
          setTimeout(this.gameLoop,350);
        };
      }else{  
        let sound = this.props.sound;
        if (this.props.innerState){ /* clearing blocks goes here second*/
          // sound.play(); 
          await this.props.stateFlipOff();
          setTimeout(this.props.startGame,350);
          setTimeout(this.props.dropBlocks,350);
        }else{/* all regular drops */
          await this.props.stateFlipOff();
          await this.props.startGame();
          await this.props.dropBlocks();
        };
      };
    };

    if(this.props.gameOver){
      await this.props.stateFlipOff();
      document.addEventListener('keyup', null);
      document.addEventListener('keydown', null);
      document.addEventListener('keydown', null);

      for(let key in this.keyState){
        keyState[key] = false;
      };
    };
  };

  render(){
    return (
      <div className="TetrisBoard">
        <BoardGrid
        currentGrid = {this.props.currentGrid}
        startGame = {this.props.startGame}
        innerState = {this.props.innerState}
        stateFlip = {this.props.stateFlip}
        />
        {<WholeTetro 
        currentGrid = {this.props.currentGrid}
        tetroGrid = {this.props.tetroGrid}
        tetroPosition={this.props.tetroPosition}
        tetroPiece = {this.props.tetroPiece}
        />}
        {<GhosTetro
        colorBoolTrue = {this.props.colorBoolTrue}
        colorBoolFalse = {this.props.colorBoolFalse}
        colorBool = {this.props.colorBool}
        currentGrid = {this.props.currentGrid}
        tetroGrid = {this.props.tetroGrid}
        ghostTetroPosition = {this.props.ghostTetroPosition}
        tetroPiece = {this.props.tetroPiece}
        />}
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TetrisBoard);