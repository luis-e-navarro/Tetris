import React, { Component } from "react";
import { SMALLGRID } from "../constants/tetromino.js";
import Block from './Block.jsx'


class SavedTetroGrid extends Component {

    _renderBlocks(){    
        const rows = SMALLGRID.length
        const cols = SMALLGRID[0].length
        const widthPercent = 100 / cols
        const heighPercent = 100 / rows
        let result = [];

        for (let row = 0; row < rows; row++){
            for (let col = 0; col < cols; col++){
                result.push(
                    <li className="saved-square-container"
                    key={`r${row}c${col}`}
                    style={{
                        width: `${widthPercent}%`,
                        height: `${heighPercent}%`,
                        top: `${row * heighPercent}%`,
                        left: `${col * widthPercent}%`
                    }}>
                        <Block color={SMALLGRID[row][col] } />
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

export default SavedTetroGrid;
