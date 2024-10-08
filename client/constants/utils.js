export function rotateFunc(tetrominoGrid, clockwise=true) {
  if (clockwise) {
      return tetrominoGrid[0].map((_, colIdx) => 
          tetrominoGrid.map(row => row[colIdx]).reverse()
      );
  } else {
      return tetrominoGrid[0].map((_, colIdx) => 
          tetrominoGrid.map(row => row[colIdx])
      ).reverse();
  }
}

export function moveTetroI(tetrominoGrid, blockPosition){
  const sidePosition = {
    left: null,
    right: null
  };

  if (tetrominoGrid[1][0] === 1 || tetrominoGrid[2][0] === 1){
    sidePosition.left = blockPosition.x
    sidePosition.right = blockPosition.x + 3
  }else if(tetrominoGrid[0][2] === 1){
    sidePosition.left = blockPosition.x + 2
    sidePosition.right = blockPosition.x + 2
  }else if(tetrominoGrid[0][1]){
    sidePosition.left = blockPosition.x + 1
    sidePosition.right = blockPosition.x + 1
  };

  return sidePosition;
};

export function checkSides(tetroPos, tetroGrid, mainGrid, direction){
  for (let i = 0; i < tetroGrid.length; i++ ){
    for (let j = 0; j < tetroGrid[i].length; j++){
      if (tetroGrid[i][j] === 1){
        if (((tetroPos.y + i) > -1) && mainGrid[tetroPos.y + i][(tetroPos.x + j) + direction] !== null){
          return false;
        };
      };
    };
  };
  return true;
};

export function checkRotation(tetroPos, tetroGrid, mainGrid){
  for (let i = 0; i < tetroGrid.length; i++ ){
    for (let j = 0; j < tetroGrid[i].length; j++){
      if (tetroGrid[i][j] === 1){
        if (((tetroPos.y + i) > -1) && mainGrid[tetroPos.y + i][tetroPos.x + j] !== null){
          return false;
        };
      };
    };
  };
  return true;
};

export function retrieveSides(tetrominoGrid, blockPosition) {
  const sidePosition = {
    left: blockPosition.x + 1,
    right: blockPosition.x + 1
  }
  for (const row of tetrominoGrid) {
    if(row[0] === 1 && sidePosition.left === blockPosition.x + 1){
      sidePosition.left = blockPosition.x;
    }

    if (row[2] === 1) {
      sidePosition.right = blockPosition.x + 2;
    }
  }
  return sidePosition;
}

export function moveAllTetros(tetrominoGrid, blockPosition){
  const sidePosition = {
    left: null,
    right: null
  }

  for (const row of tetrominoGrid){
    if(row[0] === 1){
      sidePosition.left = blockPosition.x
    };
  };

  if (sidePosition.left === null){
    sidePosition.left = blockPosition.x + 1
  }
  for (const row of tetrominoGrid){
    if (row[2] === 1){
      sidePosition.right = blockPosition.x + 2
    }
  }
  if (!sidePosition.right) sidePosition.right = blockPosition.x + 1;

  return sidePosition
}

export function coordinateBuilder(grid, gridPosition, piece){
  let howManyToAdd = additionalSpaces(piece);
  let howManyToAddFlip = false
  const currentCoordinates = {
    0:[],
    1:[],
    2:[],
    3:[],
    checker: gridPosition.y
  }

  for (let row = grid.length - 1; row > -1; row--){
    for(let column = grid[0].length - 1; column > -1; column--){
      if (grid[row][column] === 1){
        howManyToAddFlip = true
        if(!currentCoordinates[column].length){
          currentCoordinates[column].push(gridPosition.x + column, gridPosition.y + row)
        }
      }
    }
    if(!howManyToAddFlip){
      howManyToAdd--
    }
  }

  currentCoordinates.checker += howManyToAdd
  return currentCoordinates;
}

function additionalSpaces(tetroPiece){
  if(tetroPiece === 'O') return 1
  if(tetroPiece === 'I') return 3
  return 2
}

export function ghostTetroStartingPosition(tetroGrid, mainGrid, ghostPos){
  let firstRow = tetroGrid[0];
  let secondRow = tetroGrid[1];
  let shiftUp = false;

  //checks new tetros being generated
  for (let i = firstRow.length - 1; i >= 0; i--){
    if (firstRow[i] > 0){
      if (mainGrid[0][ghostPos.x+i] !== null){
        return -2;
      }        
    }  
  };

  for (let i = secondRow.length - 1; i >= 0; i--){
    if (secondRow[i] > 0){
      if (mainGrid[1][ghostPos.x+i] !== null){
        shiftUp = true;
        break;
      }        
    }  
  };

  if (shiftUp){
    for (let i = secondRow.length - 1; i >= 0; i--){
      if (secondRow[i] > 0){
        if (mainGrid[0][ghostPos.x+i] !== null){
          return -2;
        }        
      }  
    };
    return -1;
  };
  return 0;
};

export function newTetroStartingPosition(tetroGrid, mainGrid, position){
  let firstRow = tetroGrid[0];
  let secondRow = tetroGrid[1];
  let i;
  let startingY = 0;

  //checks first row of new tetro grid
  for (let i = firstRow.length - 1; i >= 0; i--){
    if (mainGrid[0][position.x+i] !== null && firstRow[i] > 0){
      return -2;
    };
  };

  // checks second row of tetro grid with both first and second main rows
  for (i = secondRow.length - 1; i >= 0; i--){
    if (secondRow[i] > 0){
      if (mainGrid[1][position.x+i] !== null){
        startingY = -1;
      };
    }  
  };

  if (startingY < 0 ){
    for (i = secondRow.length - 1; i >= 0; i--){
      if (secondRow[i] > 0){
        if (mainGrid[0][position.x+i] !== null){
          startingY--;
          return startingY;
        }      
      }  
    };
  }
  return startingY;
};

 /* generate starting point for top tetro*/
export function checkStartTetroRotate(tetroGrid, currentGrid, position){
  for (let i = tetroGrid.length - 1; i >= 0; i--){
    const currRow = tetroGrid[i];
    for (let z = currRow.length - 1; z >= 0; z--){
      if (currRow[i] > 0){
        if (currentGrid[position.y + i][position.x+z] !== null){
          return -1;
        }        
      }        
    }
  };
  return 0;
};

export function ghostTetroPositionBuilder(newTetroPos, currTetroGrid, currTetroPiece, mainGrid ){
  let int = ghostTetroStartingPosition(currTetroGrid, mainGrid, newTetroPos);

  if (int < 0 ){
    newTetroPos.y = int;
    return newTetroPos;
  };

  const adv = Object.values(coordinateBuilder(currTetroGrid, newTetroPos, currTetroPiece))

  if(adv[4] === 19){
    return newTetroPos;
  };

  let checkingGrid1 = null
  let checkingGrid2 = null
  let checkingGrid3 = null
  let checkingGrid4 = null

  if (adv[0].length) checkingGrid1 = mainGrid[adv[0][1]+1][adv[0][0]]
  if (adv[1].length) checkingGrid2 = mainGrid[adv[1][1]+1][adv[1][0]]
  if (adv[2].length) checkingGrid3 = mainGrid[adv[2][1]+1][adv[2][0]]
  if (adv[3].length) checkingGrid4 = mainGrid[adv[3][1]+1][adv[3][0]];

  while(!checkingGrid1 && !checkingGrid2 && !checkingGrid3 && !checkingGrid4){
    adv[4]++
    if(adv[4] === 19){
      newTetroPos.y++
      checkingGrid1 = true
    }else{
      if(adv[0].length){
        adv[0][1]++
        checkingGrid1 = mainGrid[adv[0][1]+1][adv[0][0]]
      }

      if(adv[1].length){
        adv[1][1]++
        checkingGrid2 = mainGrid[adv[1][1]+1][adv[1][0]]      
      }

      if(adv[2].length){
        adv[2][1]++
        checkingGrid3 = mainGrid[adv[2][1]+1][adv[2][0]]
      }

      if(adv[3].length){
        adv[3][1]++
        checkingGrid4 = mainGrid[adv[3][1]+1][adv[3][0]]
      }
      newTetroPos.y++
    }
  }
  return newTetroPos
}
