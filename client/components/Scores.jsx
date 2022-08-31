import React, { Component }  from "react";
import axios from "axios";

class Scores extends Component {
    constructor(props) {
      super(props);
      this.state = {players: []}
    }

    componentDidMount() {
        axios.get(`/api`)
          .then(res => {
            this.setState({ players: res.data });
          })
      }

      render() {
        return (
            <div class="scoreContainer">
          <ul class="scoreTable">
            {
              this.state.players
                .map(person =>
                  <li class ="eachLine" key= {`playerkey-${person.name}`}><p class="playerName">{person.name.toUpperCase()}</p> <p class="scoreNumber">{person.score}</p> </li>
                )
            }
          </ul>
          </div>
        
        )
      }
  }

export default Scores;