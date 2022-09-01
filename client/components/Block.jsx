import React from "react";
import { render } from "react-dom";

const Block = ({color}) => {
    return (
        <div className="singleBlock" style={{ backgroundColor: color }}></div>
    )
}

export default Block;