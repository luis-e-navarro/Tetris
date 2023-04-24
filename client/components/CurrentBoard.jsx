import React, { Component, useEffect, useState }  from "react";
import { connect } from 'react-redux';
import { motion, AnimatePresence } from "framer-motion";

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

const CurrentBoard = (props) => {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => {
      setAnimate(false);
    }, 1000); // 1 second
    return () => clearTimeout(timeout);
  }, [props.ongoingScore]);
  // const handleAnimationComplete = () => {
  //   setAnimate(false);
  // };

    return (
      <div className="headerScoreTank">
      <p className="scoreName">SCORE</p>
      <AnimatePresence>
        {animate && (
          <motion.p
            className="ongoingScore"
           // initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [1, 1.2, 10, 20, 35], 
              opacity: [1, 0.8, 0.4, 0.2, 0] 
            }}
    
            exit={{ scale: 10, opacity: 0 }}
            transition={{ duration: 0.5 }}
            key={props.ongoingScore}
          //  onAnimationComplete={handleAnimationComplete}
          >
            {props.ongoingScore}
          </motion.p>
        )}
      </AnimatePresence>
      <p className="ongoingScore2">{props.ongoingScore}</p>
    </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBoard);





