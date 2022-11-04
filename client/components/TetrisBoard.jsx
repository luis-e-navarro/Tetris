import React, { Component } from "react";
import { connect } from 'react-redux';
import BoardGrid from './BoardGrid.jsx'
import WholeTetro from "./WholeTetro.jsx";
import { SPACE_KEY } from '../constants/tetromino.js'
import { startGame, moveTetroLeft, colorLines, moveTetroRight, rotateLeft, rotateRight, floorDrop } from "../actions/actions";
//import React, { useState, useEffect } from 'react';

const mapStateToProps = (state) => {
    return {
        currentGrid: state.currentGrid, 
        tetroPiece: state.tetroPiece, 
        tetroGrid: state.tetroGrid,
        tetroPosition: state.tetroPosition,
        stateFlip: state.stateFlip,
        gameOver: state.gameOver,
        innerState: state.innerState
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
        colorLines: () => dispatch(colorLines())
    }
  }


class TetrisBoard extends Component{
    start = (e) => {
        switch (e.keyCode){
            case SPACE_KEY:
                this.props.startGame();
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
            case 87:
                this.props.floorDrop();
                break;
            default:
                break;
        }
    }

    async componentDidMount(){
        console.log(this.props.gameOver)
        if(!this.props.gameOver){
            await document.addEventListener('keyup', this.start)
            await document.addEventListener('keyup', this.move)
        }
    }
    componentDidUpdate(){
        if(this.props.stateFlip){
            if (this.props.innerState){
                this.props.colorLines();
            }else{
                this.props.startGame();
            }
           }
    }
      
render(){
    return (
        <div className="TetrisBoard">
            <BoardGrid
            currentGrid = {this.props.currentGrid}
            startGame = {this.props.startGame}
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