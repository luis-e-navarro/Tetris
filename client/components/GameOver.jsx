import React, { useState, useMemo }  from "react";

const GameOver = (props) => {
    const finalScore = useMemo(()=>{
        return props.finalScore
    },[]);
    const [url, setUrl] = useState(`/api`);
    return (
        <section>
        <div className="scoreTank">
            <p className="scoreName">GAME OVER</p>
            <p className="ongoingScore2">{finalScore}</p>
            <form method="POST" action={url}>
            <input type="text" name="alias" placeholder="enter your name"className="inputName" maxLength="10"></input>
            <input type="hidden" name="score" value={finalScore} />
            <input type="submit" value="enter score"/>
            </form>
        </div>
        </section>
    )
}

export default GameOver;