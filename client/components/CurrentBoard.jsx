import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';

const mapStateToProps = (state) => {
   return {
    ongoingScore: state.ongoingScore,
   }
}

function mapDispatchToProps(dispatch) {
  return {
    updatePlayers: () => dispatch(updatePlayers()),
    startGame: () => dispatch(startGame())
  }
}

const CurrentBoard = ({ongoingScore}) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles([...Array(ongoingScore)].map((_, index) => index));
  }, [ongoingScore]);

  return (
    <div className="scoreTank">
    <p className="scoreName">SCORE</p>
    <motion.div
      className="explosion-container"
      animate={{ scale: [1, 2, 3, 4, 5, 9, 20], opacity: [1, 0.3, 0] }}
      transition={{ duration: 0.4 }}
    >
      <div className="explosion-particles">
        {particles.map((particle) => (
          <div
            key={particle}
            className="particle"
            style={{
              backgroundColor: "gold",
              animationDelay: `${Math.random() * 0.25}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
            }}
          />
        ))}
      </div>
      <p className="ongoingScore" style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}>{ongoingScore}</p>           
    </motion.div>
    <p className="ongoingScore" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>{ongoingScore}</p>
  </div>
  );
}
//     return (
//           <div className="scoreTank">
//             <p className="scoreName">SCORE</p>
//             <p className="ongoingScore">{props.ongoingScore}</p>
//           </div>
//     )
// }

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBoard);






