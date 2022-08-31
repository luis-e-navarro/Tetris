import React from "react";

import BoardGrid from './BoardGrid.jsx'

const mapStateToProps = (state) => ({
    currentGrid: state.currentGrid, 
    tetroPiece: state.tetroPiece, 
    tetroPosition: state.tetroPosition
});

const TetrisBoard = () => {
    
    return (
        <div class="TetrisBoard">
            <BoardGrid currentGrid = {currentGrid}/>
        </div>
    )
}
export default connect(mapStateToProps, null)(TetrisBoard);