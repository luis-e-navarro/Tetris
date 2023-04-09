import React from "react";
import "../../styles.scss";
import { TETROCOLORS } from "../../constants/tetromino";

const StaticBlock = ({ color }) => {
  const tetrominoClasses = {
    [TETROCOLORS.I]: 'iTetro',
    [TETROCOLORS.O]: 'oTetro',
    [TETROCOLORS.T]: 'tTetro',
    [TETROCOLORS.J]: 'jTetro',
    [TETROCOLORS.L]: 'lTetro',
    [TETROCOLORS.S]: 'sTetro',
    [TETROCOLORS.Z]: 'zTetro',
  };
  const className = `staticBlock ${tetrominoClasses[color]}`;
  return (
    <div className={className} style={{ backgroundColor: color }} />
  );
};


export default StaticBlock;