import React, { Component }  from "react";
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

    return (
          <div className="scoreTank">
            <p className="scoreName">SCORE</p>
            <p className="ongoingScore">{props.ongoingScore}</p>
          </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBoard);






