import React, { Component } from 'react';
import CurrentBoard from './components/CurrentBoard.jsx';
import Scores from './components/Scores.jsx';
import TetrisBoard from './components/TetrisBoard.jsx';

const App = () =>  {
 
  
    return (
        <div className="mainDiv">
          <TetrisBoard/>
          <CurrentBoard/>
          <Scores/>
        </div>
    );
}
 
 export default App;
 