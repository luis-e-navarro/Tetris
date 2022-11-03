import React from "react";
import { render } from "react-dom";

const Block = ({color}) => {
    let blockColor;
    if(!color){
        blockColor = '#1f2122'
    }else{
        blockColor = color
    }
    return (
        <div className="singleBlock" style={{ backgroundColor: `${blockColor}` }}></div>
    )
}

export default Block;