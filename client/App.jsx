import React from 'react';
import { Component } from 'react';
import Scores from './components/Scores.jsx';
import Board from './components/Board.jsx';

class App extends Component {
    constructor() {
        super();
        
        this.state = {
          players: [],
        };
    
        this.getInfo = this.getInfo.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount{
        getInfo()
    }

    getInfo() {
    fetch('/api')
      .then((data) => data.json())
      .then( data => {
        console.log('hi',data)
        this.setState({urls:data})
      })
      .catch((err) => {
        console.log('logged error:',err);
      });
    }

    render(){
    return (
    <div>
        <Scores players = {this.state.players}/>
        <Board/>
    </div>  
   )
 }
}


export default App;