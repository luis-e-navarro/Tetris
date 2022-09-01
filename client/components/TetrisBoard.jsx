import React, { Component } from "react";
import { connect } from 'react-redux';
import BoardGrid from './BoardGrid.jsx'
import WholeTetro from "./WholeTetro.jsx";
import { SPACE_KEY } from '../constants/tetromino.js'
import { startGame, moveTetroLeft, moveTetroRight } from "../actions/actions";
//import React, { useState, useEffect } from 'react';
const mapStateToProps = (state) => {
    return {
        currentGrid: state.currentGrid, 
        tetroPiece: state.tetroPiece, 
        tetroGrid: state.tetroGrid,
        tetroPosition: state.tetroPosition,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        startGame: () => dispatch(startGame()),
        moveTetroLeft: () => dispatch(moveTetroLeft()),
        moveTetroRight: () => dispatch(moveTetroRight())
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
            default:
                break;
        }

    }

    componentDidMount(){
        document.addEventListener('keyup', this.start)
       document.addEventListener('keyup', this.move)
    }

      
render(){

    console.log('tet',this.props.tetroGrid)
    return (
        <div className="TetrisBoard">
            <BoardGrid currentGrid = {this.props.currentGrid}/>
            {<WholeTetro 
            startGame = {this.props.startGame}
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