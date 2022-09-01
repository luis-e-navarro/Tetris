import React, { Component } from "react";
import { connect } from 'react-redux';
import BoardGrid from './BoardGrid.jsx'


const mapStateToProps = (state) => {
    return {
        currentGrid: state.currentGrid, 
        tetroPiece: state.tetroPiece, 
        tetroPosition: state.tetroPosition
    };
}

class TetrisBoard extends Component {
    constructor(props) {
        super(props);
      }
      render(){
    return (
        <div className="TetrisBoard">
            <BoardGrid currentGrid = {this.props.currentGrid}/>
        </div>
    )
      }
}

export default connect(mapStateToProps, null)(TetrisBoard);