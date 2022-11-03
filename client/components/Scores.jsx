import React, { Component }  from "react";
import { connect } from 'react-redux';
import axios from "axios";
import { updatePlayers, startGame } from "../actions/actions";
import { useState } from 'react';

const mapStateToProps = (state) => {
   return {
    players: state.players,
    tetroGrid: state.tetroGrid
   }
}

function mapDispatchToProps(dispatch) {
  return {
    updatePlayers: () => dispatch(updatePlayers()),
    startGame: () => dispatch(startGame())
  }
}

class Scores extends Component {
    constructor(props) {
      super (props)
      this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
      const { updatePlayers, startGame } = this.props;
      updatePlayers();
    }

  render() {

    return (
        <div className="scoreContainer">
          <ul className="scoreTable">
            {
              this.props.players
                .map(person =>
                  <li className ="eachLine" key= {`playerkey-${person.name}`}><p className="playerName">{person.name.toUpperCase()}</p> <p className="scoreNumber">{person.score}</p> </li>
                )
            }
          </ul>

        </div>
        
    )
  }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Scores);