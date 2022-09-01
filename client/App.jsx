 import React, { Component } from 'react';
 import Scores from './components/Scores.jsx';
 import TetrisBoard from './components/TetrisBoard.jsx';
 

const App = () =>  {
  
    return (
        <div className="mainDiv">
          <TetrisBoard/>
          <Scores/>
        </div>
    );
}
 
 export default App;
 