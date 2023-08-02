import React, { useMemo } from "react";
import { TETROCOLORS } from "../../constants/tetromino";
import { motion } from "framer-motion";

const GhostBlock = ({ color, colorBool }) => {
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
  return  colorBool ? 
    <motion.div
    className={className}
    style={{ backgroundColor: color }}
    initial={{ scale: 0, opacity: 0}}
    animate={{ scale: 1, opacity: 1 }}
    transition={{
      type: "spring",
      stiffness: 960,
      damping: 15,
      duration: 0.9,
    }}
  />
  : 
    <div className={className} style={{ backgroundColor: color }}/>
  ;
};

export default GhostBlock;
