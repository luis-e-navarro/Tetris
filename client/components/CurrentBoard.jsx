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
        <section>
        <div className="currentScoreTank">
        <p className="scoreName">SCORE</p>
       <p className="ongoingScore">{props.ongoingScore}</p>
        </div>

        </section>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBoard);






