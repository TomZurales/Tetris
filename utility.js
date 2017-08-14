const BACKGROUND_COLOR = "#DDDDDD";
const EDGE_COLOR = "#222222";
const LINE_COLOR = "#51E1FC";
const L_BLOCK_COLOR = "#F69230";
const REVERSE_L_BLOCK_COLOR = "#F16EB9";
const SQUIGLY_COLOR = "#79AE3D";
const REVERSE_SQUIGLY_COLOR = "#E93D1E";
const T_BLOCK_COLOR = "#943692";
const SQUARE_COLOR = "#F1F000";
const TIME_TO_LOCK = 300;


function hasNoCollisions(board1, board2){
  let noCollisions = true;
  for(var i = 0; i < board1.board.length; i++){
    for(var j = 0; j < board1.board[0].length; j++){
      if(noCollisions){
        if(board1.board[i][j] !== BACKGROUND_COLOR && board2.board[i][j] !== BACKGROUND_COLOR){
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
      if(shown.board[i][j] !== BACKGROUND_COLOR){
        newRow.push(shown.board[i][j]);
      }
      else if(piece.board[i][j] !== BACKGROUND_COLOR){
        newRow.push(piece.board[i][j]);
      }
      else(newRow.push(BACKGROUND_COLOR));
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
      context.fillStyle = combinedBoard[i][j];
      let startingX = j * SQUARE_SIZE;
      let startingY = i * SQUARE_SIZE;
      let endingX = startingX + SQUARE_SIZE;
      let endingY = startingY + SQUARE_SIZE;
      context.fillRect(startingX, startingY, endingX, endingY);
    }
  }
}
