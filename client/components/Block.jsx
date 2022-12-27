import React from "react";

const Block = ({color, innerState}) => {
    let blockColor;
    let output = []

    if(!color){
        blockColor = '#1f2122'
    }else{
        blockColor = color
    }
    if (innerState && color === '#76ff7a'){
        output.push( <div key='prop'className="hlBlock" style={{ backgroundColor: `${blockColor}` }}></div>)
    }else{
        output.push( <div key='prop'className="singleBlock" style={{ backgroundColor: `${blockColor}` }}></div>)
    }
    return (
        output
    )
}

export default Block;