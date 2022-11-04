import React, { Component, useEffect } from "react";
// import { startGame } from "../actions/actions.js";
// import { startGame } from "../actions/actions.js";

import Block from './Block.jsx'


class BoardGrid extends Component {

_renderBlocks(){
    const  { currentGrid } = this.props
    
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
                    <Block color={ currentGrid[row][col] } />
                </li>
            )
        }
     }

     return result
}
render(){
    // const {colorLines, stateFlip, innerState, startGame} = this.props
    // console.log('stateeee',stateFlip)
    // if (stateFlip){
    //     if(innerState){
    //         colorLines();
    //     }else{
    //         startGame();
    //     }
    // }
    return(
        <ul className="boardGrid">
        {this._renderBlocks()}
        </ul>
    )
}
}

export default BoardGrid;
