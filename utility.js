function hasNoCollisions(board1, board2){
  let noCollisions = true;
  for(var i = 0; i < board1.board.length; i++){
    for(var j = 0; j < board1.board[0].length; j++){
      if(noCollisions){
        if(board1.board[i][j] === 1 && board2.board[i][j] === 1){
          noCollisions = false;
        }
      }
    }
  }
  return noCollisions;
}

function combine(shown, piece){
  let combinedBoard = [];
  for(let i = 0; i < shown.board.length; i++){
    let newRow = [];
    for(let j = 0; j < shown.board[0].length; j++){
      if(shown.board[i][j] === 1 || piece.board[i][j] === 1){
        newRow.push(1);
      }
      else(newRow.push(0));
    }
    combinedBoard.push(newRow);
  }
  return combinedBoard;
}

function draw(shown, piece){
  const SQUARE_SIZE = 20;

  let combinedBoard = combine(shown, piece);
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');

  canvas.setAttribute("width", shown.board[0].length * SQUARE_SIZE);
  canvas.setAttribute("height", shown.board.length * SQUARE_SIZE);


  for(let i = 0; i < combinedBoard.length; i++){
    for(let j = 0; j < combinedBoard[0].length; j++){
      if(combinedBoard[i][j] === 1){
            context.fillStyle = "#000000";
      }
      else{
            context.fillStyle = "#FFFFFF";
      }
      let startingX = j * SQUARE_SIZE;
      let startingY = i * SQUARE_SIZE;
      let endingX = startingX + SQUARE_SIZE;
      let endingY = startingY + SQUARE_SIZE;
      context.fillRect(startingX, startingY, endingX, endingY);
    }
  }
}
