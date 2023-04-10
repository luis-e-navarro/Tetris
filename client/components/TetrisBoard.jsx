import React, { Component } from "react";
import { connect } from 'react-redux';
import BoardGrid from './BoardGrid.jsx'
import WholeTetro from "./WholeTetro.jsx";
import GhosTetro from "./GhostTetro.jsx";
import { SPACE_KEY } from '../constants/tetromino.js'

import { startGame,
    moveTetroLeft,
    startGameRenderSavedTetromino,
    moveTetroRight,
    dropBlocks, stateFlipOff,
    rotateLeft,colorBlocks,
    rotateRight, floorDrop,
    saveTetro, colorBoolFalse, colorBoolTrue } from "../actions/actions";

const keyState = {};
let moveCounter = 2;
let rotateCounter = 4;

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
        colorBool: state.colorBool
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
        colorBoolFalse:() => dispatch(colorBoolFalse()),
    }
  }


class TetrisBoard extends Component{
    start = (e) => {
        switch (e.keyCode){
            case SPACE_KEY:
                this.props.startGame();
                this.props.dropBlocks();
                break;
            case 68:
                keyState[e.keyCode] = false
                moveCounter = 2;
            case 65:
                keyState[e.keyCode] = false
                moveCounter = 2;
            case 37:
                keyState[e.keyCode] = false
                rotateCounter = 4;
            case 39:
                keyState[e.keyCode] = false
                rotateCounter = 4;
            case 83:
                this.props.dropBlocks();
            default:
                break;
        }
    }

     move = (e) =>{  
        
        switch (e.keyCode){
            case 68:
                if(!keyState[e.keyCode]){
                    this.props.moveTetroRight();
                }
                keyState[e.keyCode] = true
                break;
            case 65:
                if(!keyState[e.keyCode]){
                    this.props.moveTetroLeft();
                }
                keyState[e.keyCode] = true
                break;
            case 37:
                if(!keyState[e.keyCode]){
                    this.props.rotateRight();
                }
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
                this.props.moveDown();
                break;
            default:
                
                break;
        }
    }

    slam = (e) =>{
        switch (e.keyCode){
            case 87:
                this.props.floorDrop();
                break;
            default:
                break;
        }
    }


     componentDidMount(){
        
        if(!this.props.gameOver){
            
             document.addEventListener('keyup', this.start)
             document.addEventListener('keydown', this.move)
             document.addEventListener('keyup', this.slam)
             
             //------------------------------------------  
            const {moveTetroLeft, moveTetroRight, rotateLeft, rotateRight} = this.props;
            function gameLoop() {
                if (keyState[65]){
                    if(moveCounter > 0){
                        moveCounter--
                    }else{
                        moveTetroLeft();
                    }
                }    
                if (keyState[68]){
                    if(moveCounter > 0){
                        moveCounter--
                    }else{
                    moveTetroRight();
                    }
                }
                if (keyState[37]){
                    if(rotateCounter > 0){
                        rotateCounter--
                    }else{
                        rotateRight();
                    }
                }
                if (keyState[39]){
                    if(rotateCounter > 0){
                        rotateCounter--
                    }else{
                        rotateLeft();
                    }
                }

                setTimeout(gameLoop, 67);
            }    
            gameLoop();
            
        }
    }

    async componentDidUpdate(){
       
        if(this.props.stateFlip){
            
            if (this.props.superGate){
                await this.props.colorBlocks();
                // if(!this.props.colorBool)this.props.colorBoolTrue();
            }else{  
                let sound = this.props.sound
                if (this.props.innerState){
                    sound.play(); 
                    await this.props.stateFlipOff();
                    setTimeout(this.props.startGame,350);
                    setTimeout(this.props.dropBlocks,350);
                }else{
                    await this.props.stateFlipOff();
                    await this.props.startGame();
                    await this.props.dropBlocks();
                }
            }
            // this.props.colorBoolTrue();
        }
    }
      
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