import React, { Component }  from "react";
import { connect } from 'react-redux';
import axios from "axios";
import { updatePlayers } from "../actions/actions";
import { useState } from 'react';

const mapStateToProps = (state) => {
   return {
    players: state.players
   }
}

function mapDispatchToProps(dispatch) {
  return {
    updatePlayers: () => dispatch(updatePlayers())
  }
}

class Scores extends Component {
    constructor(props) {
      super (props)
      this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
      const { updatePlayers } = this.props;
      updatePlayers();
    }

  render() {

    return (
        <div className="scoreContainer">
          {console.log('playas',this.props)}
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