import React from "react";
import DynamicBlock from "./blocks/DynamicBlock.jsx";

const BoardGrid = ({ currentGrid, innerState }) => {
  const rows = currentGrid.length;
  const cols = currentGrid[0].length;

  const widthPercent = 100 / cols;
  const heightPercent = 100 / rows;

  const blocks = currentGrid.flatMap((row, rowIndex) =>
    row.map((color, colIndex) => {
      const blockKey = `r${rowIndex}c${colIndex}`;

      return (
        <li
          className="square-container"
          key={blockKey}
          style={{
            width: `${widthPercent}%`,
            height: `${heightPercent}%`,
            top: `${rowIndex * heightPercent}%`,
            left: `${colIndex * widthPercent}%`,
          }}
        >
          <DynamicBlock innerState={innerState} color={color} />
        </li>
      );
    })
  );

  return <ul className="boardGrid">{blocks}</ul>;
};

export default BoardGrid;
