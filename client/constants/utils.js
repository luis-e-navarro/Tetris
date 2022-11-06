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