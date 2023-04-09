import React from "react";
import { TETROCOLORS } from "../../constants/tetromino";
import { motion } from "framer-motion";

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
  return (
    <motion.div
      className={className}
      style={{ backgroundColor: color }}
      animate={{
        scale: [1, 1.5, 1],
        rotate: [0, 360],
        opacity: [0,1],
      }}
      transition={{
        duration: 0.4,
      }}
    />
  );
};

export default GhostBlock;
