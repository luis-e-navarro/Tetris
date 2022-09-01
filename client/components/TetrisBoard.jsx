import React, { Component } from "react";
import { connect } from 'react-redux';
import BoardGrid from './BoardGrid.jsx'
import WholeTetro from "./WholeTetro.jsx";


const mapStateToProps = (state) => {
    return {
        currentGrid: state.currentGrid, 
        tetroPiece: state.tetroPiece, 
        tetroGrid: state.tetroGrid,
        tetroPosition: state.tetroPosition,
    };
}


class TetrisBoard extends Component {
    constructor(props) {
        super(props);
      }

      componentDidMount(){
        window.addEventListener
      }
      
      render(){
    return (
        <div className="TetrisBoard">
            <BoardGrid currentGrid = {this.props.currentGrid}/>
            {/* <WholeTetro 
            currentGrid = {this.props.currentGrid}
            tetroGrid = {this.props.tetroGrid}
            tetroPosition={this.props.tetroPosition}
            tetroPiece = {this.props.tetroPiece}
            /> */}
        </div>
    )
      }
}

export default connect(mapStateToProps, null)(TetrisBoard);