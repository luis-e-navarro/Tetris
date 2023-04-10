import React from "react";
import { TETROCOLORS } from "../../constants/tetromino";
import { motion } from "framer-motion";

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
  // return <div className={blockClass} style={{ backgroundColor: color }} />;

  return blockClass === 'hlBlock' ? (
    <motion.div
      className={blockClass}
      animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
      transition={{ duration: .35 }}
      style={{ backgroundColor: color }}
    />
  ) : (
    <div className={blockClass} style={{ backgroundColor: color }} />
  );
}

export default DynamicBlock;


