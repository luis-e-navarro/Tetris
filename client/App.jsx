 import React, { Component } from 'react';
 import Scores from './components/Scores.jsx';
 import Board from './components/Board.jsx';
 

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  
    return (
        <div class="mainDiv">
          <Board/>
          <Scores/>
        </div>
    );
  }
}
 
 export default App;
 