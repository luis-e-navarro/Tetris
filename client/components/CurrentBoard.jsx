import React, { Component, useEffect, useState }  from "react";
import { connect } from 'react-redux';



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
    const [animate, setAnimate] = useState(false);
    useEffect(() => {
      setAnimate(true);
      const timeout = setTimeout(() => {
        setAnimate(false);
      }, 1000); // 1 second
      return () => clearTimeout(timeout);
    }, [props.ongoingScore]);

    return (
          <div className="scoreTank">
            <p className="scoreName">SCORE</p>
            <p
              className={`ongoingScore ${animate ? "pop-out-fade-out" : ""}`}
              onAnimationEnd={() => setAnimate(false)}
            >
              {props.ongoingScore}
            </p>
          </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBoard);





