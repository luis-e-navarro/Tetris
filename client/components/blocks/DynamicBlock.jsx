import React, { useState, useEffect } from "react";
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

  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const newParticles = Array.from({ length: 60 }, (_, i) => i);
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    if (!particles.length) {
      return;
    }

    const particleIndex = particles[0];
    const newParticles = particles.slice(1);

    const particleTimeout = setTimeout(() => {
      setParticles(newParticles);
    }, 750);

    return () => clearTimeout(particleTimeout);
  }, [particles]);

return blockClass === "hlBlock" ? (
<motion.div
  className="explosion-container"
  animate={{ 
    scale: [1, 1.2, 1.5, 1.8, 2], 
    opacity: [1, 0.8, 0.4, 0.2, 0] 
  }}
  transition={{ 
    duration: 0.35, 
    ease: "easeOut" 
  }}
>
  <div className="explosion-color" style={{ backgroundColor: '#00e5ff'}} />
  <div className="explosion-particles">
    {particles.map((particle) => (
      <div
        key={particle}
        className="particle"
        style={{
          animationDelay: `${Math.random() * 0.25}s`,
          animationDuration: `${0.5 + Math.random() * 0.5}s`,
        }}
      />
    ))}
  </div>
</motion.div>

  ) : (
    <div className={blockClass} style={{ backgroundColor: color }} />
  );
};

export default DynamicBlock;


