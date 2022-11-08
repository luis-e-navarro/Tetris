import React from "react";

const GhostBlock = ({color}) => {

    return (

        <div key='ghostProp'className="ghostBlock" style={{ backgroundColor: `${color}` }}></div>
    )
}

export default GhostBlock;