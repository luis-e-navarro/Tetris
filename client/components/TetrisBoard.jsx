import React, { Component } from "react";
import { connect } from 'react-redux';
import BoardGrid from './BoardGrid.jsx'
import WholeTetro from "./WholeTetro.jsx";
import { SPACE_KEY } from '../constants/tetromino.js'
import { startGame, moveTetroLeft, moveTetroRight,dropBlocks, stateFlipOff, rotateLeft,colorBlocks, rotateRight, floorDrop } from "../actions/actions";
//import React, { useState, useEffect } from 'react';

const mapStateToProps = (state) => {
    return {
        currentGrid: state.currentGrid, 
        tetroPiece: state.tetroPiece, 
        tetroGrid: state.tetroGrid,
        tetroPosition: state.tetroPosition,
        stateFlip: state.stateFlip,
        gameOver: state.gameOver,
        innerState: state.innerState,
        superGate: state.superGate
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
        colorBlocks: ()=> dispatch(colorBlocks())
    }
  }


class TetrisBoard extends Component{
    start = (e) => {
        switch (e.keyCode){
            case SPACE_KEY:
                this.props.startGame();
                this.props.dropBlocks();
                break;
            default:
                break;
        }
    }

     move = (e) =>{
        switch (e.keyCode){
            case 68:
                this.props.moveTetroRight();
                break;
            case 65:
                this.props.moveTetroLeft();
                break;
            case 37:
                this.props.rotateRight();
                break;
            case 39:
                this.props.rotateLeft();
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
        }
    }

    async componentDidUpdate(){
        if(this.props.stateFlip){
            if (this.props.superGate){
                await this.props.colorBlocks();
            }else{  
                if (this.props.innerState){
                    await this.props.stateFlipOff();
                    setTimeout(this.props.startGame,250);
                    setTimeout(this.props.dropBlocks,250);
                }else{
                    await this.props.stateFlipOff();
                    await this.props.startGame();
                    await this.props.dropBlocks();
                }

        
            }
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
        </div>
    )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TetrisBoard);