import React, { Component, useEffect, useState }  from "react";
import { connect } from 'react-redux';
import { motion, AnimatePresence } from "framer-motion";

const mapStateToProps = (state) => {
   return {
    ongoingScore: state.ongoingScore,
    tetroPiece: state.tetroPiece
   }
}

function mapDispatchToProps(dispatch) {
  return {
    updatePlayers: () => dispatch(updatePlayers()),
    startGame: () => dispatch(startGame())
  }
}

const CurrentBoard = (props) => {
    return (
    <div className="headerScoreTank">
      <p className="scoreName">SCORE</p>      
      <p className="ongoingScore2">{props.ongoingScore}</p>
    </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBoard);





