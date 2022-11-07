import React, { Component } from "react";
import Block from './Block.jsx'
import { GRID, TETROMINOS, SHAPES, TETROCOLORS} from '../constants/tetromino';
import { render } from "react-dom";

class GhosTetro extends Component {
   
    _getTetrominoStyle(){
        const rows = GRID.length
        const columns = GRID[0].length

        const widthPercent = 100 / columns
        const heightPercent = 100 / rows
        return {
            width: `${4 * widthPercent}%`,
            height: `${4 * heightPercent}%`,
            top: `${this.props.ghostTetroPosition.y * heightPercent}%`,
            left: `${this.props.ghostTetroPosition.x * widthPercent}%`
        }
    }
    _renderTetro () {

        const shapeArr = this.props.tetroGrid
        const color = TETROCOLORS[this.props.tetroPiece];
        
        const rows = shapeArr.length
        const columns = shapeArr[0].length
        let result = []

        for (let row = 0; row < rows; row++){
            for (let col = 0; col < columns; col++){
                if (!shapeArr[row][col]) continue
                result.push(
                    <li className="square-container"
                    key={`t-${row}${col}`}
                    style={{
                        top: `${row * 25}%`,
                        left: `${col * 25}%`

                    }}>
                        <Block color={color}/>

                    </li>
                )
            }
        }
        return result;
    }

    render(){
        return (
            
            <ul className="GhostTetro" style ={this._getTetrominoStyle()}>
                {this._renderTetro()}
            </ul>
        )
    }

}

export default GhosTetro;