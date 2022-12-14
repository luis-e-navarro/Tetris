import React, { Component } from "react";

import Block from './Block.jsx'


class BoardGrid extends Component {

_renderBlocks(){
    const  { currentGrid, innerState } = this.props
    
    const rows = currentGrid.length
    const cols = currentGrid[0].length

    const widthPercent = 100 / cols
    const heighPercent = 100 / rows
     let result = [];
     for (let row = 0; row < rows; row++){
        for (let col = 0; col < cols; col++){
            result.push(
                <li className="square-container"
                key={`r${row}c${col}`}
                style={{
                    width: `${widthPercent}%`,
                    height: `${heighPercent}%`,
                    top: `${row * heighPercent}%`,
                    left: `${col * widthPercent}%`
                }}>
                    <Block innerState = {innerState} color={ currentGrid[row][col] } />
                </li>
            )
        }
     }

     return result
}
render(){
    return(
        <ul className="boardGrid">
        {this._renderBlocks()}
        </ul>
    )
}
}

export default BoardGrid;
