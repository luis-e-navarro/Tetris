import React, { Component } from "react";
import { connect } from 'react-redux';
import BoardGrid from './BoardGrid.jsx'
import WholeTetro from "./WholeTetro.jsx";
import { SPACE_KEY } from '../constants/tetromino.js'
import { startGame, moveTetroLeft, moveTetroRight, rotate, floorDrop } from "../actions/actions";
//import React, { useState, useEffect } from 'react';

const mapStateToProps = (state) => {
    return {
        currentGrid: state.currentGrid, 
        tetroPiece: state.tetroPiece, 
        tetroGrid: state.tetroGrid,
        tetroPosition: state.tetroPosition,
        stateFlip: state.stateFlip
    };
}

function mapDispatchToProps(dispatch) {
    return {
        startGame: () => dispatch(startGame()),
        moveTetroLeft: () => dispatch(moveTetroLeft()),
        moveTetroRight: () => dispatch(moveTetroRight()),
        rotate: () => dispatch(rotate()),
        floorDrop: () => dispatch(floorDrop())
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
            case 39:
                this.props.moveTetroRight();
                break;
            case 37:
                this.props.moveTetroLeft();
                break;
            case 40:
                this.props.rotate();
            case 38:
                this.props.floorDrop();
            default:
                break;
        }

    }

    async componentDidMount(){
        await document.addEventListener('keyup', this.start)
        await document.addEventListener('keyup', this.move)
    }
    componentDidUpdate(){
        if(this.props.stateFlip){
            this.props.startGame();
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