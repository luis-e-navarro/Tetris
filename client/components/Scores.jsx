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
            <div>
           <h3>TOP 5 SCORES</h3>
          <ol style ={{backgroundColor: 'lightblue', width: '350px'}}>
            {
              this.state.players
                .map(person =>
                  <li key= {`playerkey-${person.name}`}> Score: {person.score} Name: {person.name}</li>
                )
            }
          </ol>
          </div>
        
        )
      }
  }

export default Scores;