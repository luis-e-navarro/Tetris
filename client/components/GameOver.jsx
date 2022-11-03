import React, { Component }  from "react";
import { connect } from 'react-redux';





const GameOver = (props) => {
    console.log(props)
    return (
        <section>
        <div className="gameOverTank">
        <p className="scoreName">GAME OVER</p>
       <p className="ongoingScore">{props.finalScore}</p>
       <form method="POST" action="/api">
       <input type="text" name="name" placeholder="enter your name"className="inputName"></input>
       <input type="hidden" name="score" value={props.finalScore} />
       <input type="submit" value="enter score"/>
       </form>
        </div>
        </section>
    )
}

export default GameOver;