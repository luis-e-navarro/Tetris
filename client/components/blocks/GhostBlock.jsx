import React from "react";
import { TETROCOLORS } from "../../constants/tetromino";

const GhostBlock = ({ color }) => {
  const tetrominoClasses = {
    [TETROCOLORS.I]: 'iTetro',
    [TETROCOLORS.O]: 'oTetro',
    [TETROCOLORS.T]: 'tTetro',
    [TETROCOLORS.J]: 'jTetro',
    [TETROCOLORS.L]: 'lTetro',
    [TETROCOLORS.S]: 'sTetro',
    [TETROCOLORS.Z]: 'zTetro',
  };
  const className = `ghostBlock ${tetrominoClasses[color]}`;
  return <div className={className} style={{ backgroundColor: color }}></div>;
};

export default GhostBlock;
