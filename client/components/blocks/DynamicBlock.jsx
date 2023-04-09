import React from "react";
import { TETROCOLORS } from "../../constants/tetromino";


const DynamicBlock = ({color = '#1f2122', innerState}) => {
  let blockClass = innerState && color === '#76ff7a' ? 'hlBlock' : 'singleBlock';
  if (blockClass === 'singleBlock' && color ){
    const tetrominoClasses = {
      [TETROCOLORS.I]: 'iTetro',
      [TETROCOLORS.O]: 'oTetro',
      [TETROCOLORS.T]: 'tTetro',
      [TETROCOLORS.J]: 'jTetro',
      [TETROCOLORS.L]: 'lTetro',
      [TETROCOLORS.S]: 'sTetro',
      [TETROCOLORS.Z]: 'zTetro',
    };
    blockClass = `staticBlock ${tetrominoClasses[color]}`;
  }
  return <div className={blockClass} style={{ backgroundColor: color }} />;
}

export default DynamicBlock;


