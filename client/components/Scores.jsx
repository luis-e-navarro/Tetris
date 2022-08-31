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
           [ <h3>TOP SCORES</h3>,
          <ol style ={{backgroundColor: 'lightblue', width: '350px'}}>
            {
              this.state.players
                .map(person =>
                  <li key={person.id}>Score: {person.score} Name: {person.name}</li>
                )
            }
          </ol>
           ]
        )
      }
  }

export default Scores;