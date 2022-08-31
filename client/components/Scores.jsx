import React, { Component }  from "react";

class Scores extends Component {
    constructor(props) {
      super(props);
      this.state = {players: []}
    }
    
  
    render() {
      return (
        <div className='innerbox'>
            <h3>SCORES</h3>
        </div>
      );
    }
  }

export default Scores;