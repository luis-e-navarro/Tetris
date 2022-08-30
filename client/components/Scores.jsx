import React from "react";
import Score from './Score.jsx';

const Scores = () =>  {
    console.log('hello')
    const allPlayers = [];
    for (let i = 0; i < 3; i++){
        allPlayers.push(<Score key='justkeys' name ={this.players[i].name} score={this.players[i].score}/>)
    }
    return(
    <section>
        <header>
            <h2>SCORES</h2>
        </header>
        <div>
            <ul>
                {allPlayers}
            </ul>
        </div>
    </section>
    )
    
}


export default Scores;