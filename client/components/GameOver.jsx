import React, { Component, useMemo }  from "react";




const GameOver = (props) => {
    const finalScore = useMemo(()=>{
        return props.finalScore
    },[]);
    
    return (
        <section>
        <div className="scoreTank">
            <p className="scoreName">GAME OVER</p>
            <p className="ongoingScore2">{finalScore}</p>
            <form method="POST" action="/api">
            <input type="text" name="name" placeholder="enter your name"className="inputName" maxLength="10"></input>
            <input type="hidden" name="score" value={finalScore} />
            <input type="submit" value="enter score"/>
            </form>
        </div>
        </section>
    )
}

export default GameOver;