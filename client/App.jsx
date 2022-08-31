 import React, { Component } from 'react';
 import Scores from './components/Scores.jsx';
 import Board from './components/Board.jsx';
 

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const all = [<Scores key="scorekey"/>, <Board key="boardkey"/>]
    return (
        [all]
    );
  }
}
 
 export default App;
 