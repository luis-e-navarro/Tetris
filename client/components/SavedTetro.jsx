import React, { Component } from "react";
import StaticBlock from './blocks/StaticBlock.jsx'
import {SMALLGRID, GRID, TETROMINOS, SHAPES, TETROCOLORS} from '../constants/tetromino.js';
import GhostBlock from "./blocks/GhostBlock.jsx";

class SavedTetro extends Component {
   
    _getTetrominoStyle(){
        const rows = SMALLGRID.length
        const columns = SMALLGRID[0].length
        const widthPercent = 175 / columns
        const heightPercent = 175 / rows
        return {
            width: `${4 * widthPercent}%`,
            height: `${4 * heightPercent}%`,
            top: `22%`,
            left: `12%`
        }
    }

    _renderTetro () {
        const shapeArr = !this.props.savedTetromino.length ? SHAPES.D : SHAPES[this.props.savedTetromino]
        const color = TETROCOLORS[this.props.savedTetromino];        
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
                        <StaticBlock color={color}/>
                    </li>
                )
            }
        }
        return result;
    }

    render(){
        return (
            <ul className="savedTetroDry" style ={this._getTetrominoStyle()}>
                {this._renderTetro()}
            </ul>
        )
    }

}

export default SavedTetro;