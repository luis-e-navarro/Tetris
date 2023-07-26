import React from "react";
import DynamicBlock from './blocks/DynamicBlock.jsx'
import {SMALLGRID, GRID, TETROMINOS, SHAPES, TETROCOLORS} from '../constants/tetromino';

const IncomingTetros = ({incomingTetros, innerState}) => {

    function getTetrominoStyle(position){
        const heightPos = 13;
        const rows = SMALLGRID.length
        const columns = SMALLGRID[0].length
        const widthPercent = 140 / columns
        const heightPercent = 35 / rows
        return {
            width: `${4 * widthPercent}%`,
            height: `${4 * heightPercent}%`,
            top: `${position * heightPos}%`,
            left: `15%`
        }
    }

    function renderTetro (tetro) {
        const shapeArr = !tetro.length ? SHAPES.D : SHAPES[tetro]
        const color = TETROCOLORS[tetro];
        
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
                        marginTop: '20%',
                        top: `${row * 25}%`,
                        left: `${col * 25}%`
                    }}>
                        <DynamicBlock color={color}/>
                    </li>
                )
            }
        }
        return result;
    }

    function keyMaker(){
        let count = 0;
        return function(){
            count++
            return count
        }
    }
    console.log('innerState:', innerState)
    const keyAssigner = keyMaker()
        return (
            <div id="incomingTetroContainer">
                {incomingTetros.map((tetro, index) => {
                    return (<ul key={keyAssigner()} className={innerState ? "savedTetroDry" : "savedTetroAnimation"} style ={getTetrominoStyle(index)}>
                        {renderTetro(tetro)}
                    </ul>)
                })}
            </div>

        )
    
}

export default IncomingTetros