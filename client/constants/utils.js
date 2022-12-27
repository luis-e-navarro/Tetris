export function rotateLeft(tetrominoGrid){
    const newarr = [];
    for (let z = 0; z < tetrominoGrid.length; z++ ){
        let sub =[];
        for (let i = tetrominoGrid.length -1; i > -1; i--){
          sub.push(tetrominoGrid[i][z])
        }
        newarr.push(sub);
      }
      return newarr
}

export function rotateRight(tetrominoGrid){
    const newarr = [];
    for (let z = tetrominoGrid.length - 1; z > -1; z-- ){
        let sub =[];
        for (let i = 0; i < tetrominoGrid.length ; i++){
          sub.push(tetrominoGrid[i][z])
        }
        newarr.push(sub);
      }
      return newarr
}

export function moveTetroI(tetrominoGrid, blockPosition){
  const sidePosition = {
    left: null,
    right: null
  }
  if (tetrominoGrid[1][0] === 1 || tetrominoGrid[2][0] === 1){
    sidePosition.left = blockPosition.x
    sidePosition.right = blockPosition.x + 3
  }else if(tetrominoGrid[0][2] === 1){
    sidePosition.left = blockPosition.x + 2
    sidePosition.right = blockPosition.x + 2
  }else if(tetrominoGrid[0][1]){
    sidePosition.left = blockPosition.x + 1
    sidePosition.right = blockPosition.x + 1
  }
  return sidePosition
}

export function moveAllTetros(tetrominoGrid, blockPosition){
  const sidePosition = {
    left: null,
    right: null
  }

  for (const row of tetrominoGrid){
    if(row[0] === 1){
      sidePosition.left = blockPosition.x
    }
  }
  if (sidePosition.left === null){
    sidePosition.left = blockPosition.x + 1
  }
  for (const row of tetrominoGrid){
    if (row[2] === 1){
      sidePosition.right = blockPosition.x + 2
    }
  }
  if (!sidePosition.right) sidePosition.right = blockPosition.x + 1 
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

  return currentCoordinates
}

function additionalSpaces(tetroPiece){
  if(tetroPiece === 'O') return 1
  if(tetroPiece === 'I') return 3
  return 2
}

export function ghostTetroPositionBuilder(currTetroPos, currTetroGrid, currTetroPiece, mainGrid ){
  while(currTetroPos.y < 0){
    currTetroPos.y++
  }
  const droppedBlockPosition = currTetroPos
  const adv = Object.values(coordinateBuilder(currTetroGrid, currTetroPos, currTetroPiece))


  let checkingGrid1 = null
  let checkingGrid2 = null
  let checkingGrid3 = null
  let checkingGrid4 = null
  if (adv[0].length) checkingGrid1 = mainGrid[adv[0][1]+1][adv[0][0]]
  if (adv[1].length) checkingGrid2 = mainGrid[adv[1][1]+1][adv[1][0]]
  if (adv[2].length) checkingGrid3 = mainGrid[adv[2][1]+1][adv[2][0]]
  if (adv[3].length) checkingGrid4 = mainGrid[adv[3][1]+1][adv[3][0]]

  while(!checkingGrid1 && !checkingGrid2 && !checkingGrid3 && !checkingGrid4){
    adv[4]++
    if(adv[4] === 19){
      droppedBlockPosition.y++
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
      droppedBlockPosition.y++
    }
  }
  return droppedBlockPosition
}
