import React, { Component } from "react";

class Scores extends Component {
    constructor() {
        super();
        
        this.state = {
          players: [],
        };
    
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
    console.log('hii')
    fetch('/api')
      .then((data) => data.json())
      .then( data => {
        console.log('logged inside 2nd then:', data)
        this.setState({urls:data})
      })
      .catch((err) => {
        console.log('logged error:',err);
      });
    }

    render() {
     
        return(
        <section>
            <header>
                <h2>SCORES</h2>
                {/* {console.log(this.state)} */}
            </header>
            <div>
                <ul>
                    <li>{Score } </li>
                    <li>{this.state.players[1].name},{this.state.players[1].score} </li>
                    <li>{this.state.players[2].name},{this.state.players[2].score} </li>
                </ul>
            </div>
        </section>
        )
    }
}


export default Scores;