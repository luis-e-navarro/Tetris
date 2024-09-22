import React from "react";
import GhostBlock from './blocks/GhostBlock.jsx'
import { GRID, TETROCOLORS} from '../constants/tetromino';


const GhosTetro = (props) => {
    if (_.size(props.ghostTetroPosition)){
        const _getTetrominoStyle = () => {
            const rows = GRID.length;
            const columns = GRID[0].length;
            
            const widthPercent = 100 / columns;
            const heightPercent = 100 / rows;
            return {
                width: `${4 * widthPercent}%`,
                height: `${4 * heightPercent}%`,
                top: `${props.ghostTetroPosition.y * heightPercent}%`,
                left: `${props.ghostTetroPosition.x * widthPercent}%`
            };
        };

        const _renderTetro = () => {
            const shapeArr = props.tetroGrid;
            const color = TETROCOLORS[props.tetroPiece];
            const rows = shapeArr.length;
            const columns = shapeArr[0].length;
            let result = [];

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
                            <GhostBlock
                            color={color} colorBool ={props.colorBool}/>
                        </li>
                    );
                };
            };
            return result;
        };

        return (
            <ul className="GhostTetro" style ={_getTetrominoStyle()}>
                {_renderTetro()}
            </ul>
        );        
    }else{
        return
    }

};

export default GhosTetro;