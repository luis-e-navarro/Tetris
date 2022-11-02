import React, { Component, useEffect } from "react";
// import { startGame } from "../actions/actions.js";

import Block from './Block.jsx'


class BoardGrid extends Component {
    constructor(props) {
        super(props)
        this.state = {
         virtualGrid: this.props.currentGrid,
         allGreen: 0
        }
    }

    // componentDidUpdate(previousProps, previousState) {
    //     if (previousProps.currentGrid !== this.props.currentGrid) {
    //         previousProps.startGame();
    //     }
    //    }
// _sendAnother(){
//     const {startGame} = this.props;
//     startGame();
//     return
// }
// componentDidUpdate(prevProps){
//     let newGreen = this.state.allGreen
//     prevProps.currentGrid.forEach((subArray)=>{
//         subArray.forEach((el)=> el === 'green' ? newGreen++ : null)
//     })
//     if (this.state.virtualGrid !== prevProps.currentGrid){
//         prevProps.startGame();
//     }
//     console.log(this.state.allGreen, newGreen)

//  }



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

    return(
        <ul className="boardGrid">
        {this._renderBlocks()}
        </ul>
    )
}
}

export default BoardGrid;
