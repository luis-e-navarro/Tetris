import React from "react";
import { render } from "react-dom";

const Block = ({color}) => {
    let blockColor;
    if(!color){
        blockColor = '#1f2122'
    }else{
    if (color === '#76ff7a'){
        console.log('true')
    }
        blockColor = color
    }
    return (
        <div className="singleBlock" style={{ backgroundColor: `${blockColor}` }}></div>
    )
}

export default Block;