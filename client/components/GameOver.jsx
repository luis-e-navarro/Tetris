import React, { Component }  from "react";




const GameOver = (props) => {
    function limitKeyPress(event, value, maxLength) {
        console.log(event, event.currentTarget.id)
        // if (value != undefined && value.toString().length >= maxLength) {
        //     event.preventDefault();
        // }
    }
    return (
        <section>
        <div className="scoreTank">
            <p className="scoreName">GAME OVER</p>
            <p className="ongoingScore">{props.finalScore}</p>
            <form method="POST" action="/api">
            <input type="text" name="name" placeholder="enter your name"className="inputName" maxLength="10"></input>
            <input type="hidden" name="score" value={props.finalScore} />
            <input type="submit" value="enter score"/>
            </form>
        </div>
        </section>
    )
}

export default GameOver;