const BACKGROUND_COLOR = "#DDDDDD";
const LINE_COLOR = "#51E1FC";
const L_BLOCK_COLOR = "#F69230";
const REVERSE_L_BLOCK_COLOR = "#F16EB9";
const SQUIGLY_COLOR = "#79AE3D";
const REVERSE_SQUIGLY_COLOR = "#E93D1E";
const T_BLOCK_COLOR = "#943692";
const SQUARE_COLOR = "#F1F000";
const TIME_TO_LOCK = 400;
const OFFSET = 3;

var tick;
var tickSpeed = 1000;
var minTickSpeed = 100;
var numLevels = 11;
var rowsToLevelUp = 10;
var remainingRows = 10;
var level = 1;
var speedIncrease = (tickSpeed - minTickSpeed) / numLevels;

function handleInput(event){
  switch (event.keyCode) {
    case 37:  //LEFT ARROW: MOVE LEFT
      clearTimeout(this.lockTimer);
      this.timerOn = false;
      this.pieceBoard.moveLeft(this.shownBoard);
      this.draw(this.shownBoard, this.pieceBoard);
      break;
    case 39:
      clearTimeout(this.lockTimer);
      this.timerOn = false;
      this.pieceBoard.moveRight(this.shownBoard);
      this.draw(this.shownBoard, this.pieceBoard);
      break;
    case 88:
      clearTimeout(this.lockTimer);
      this.timerOn = false;
      this.pieceBoard.rotatePiece(this.piece.rotateRight(), this.shownBoard);
      this.draw(this.shownBoard, this.pieceBoard);
      break;
    case 90:
      clearTimeout(this.lockTimer);
      this.timerOn = false;
      this.pieceBoard.rotatePiece(this.piece.rotateLeft(), this.shownBoard);
      this.draw(this.shownBoard, this.pieceBoard);
      break;
    case 40:
      clearTimeout(this.lockTimer);
      this.timerOn = false;
      while(this.pieceBoard.moveDown(this.shownBoard)){
      }
      this.draw(this.shownBoard, this.pieceBoard);
      break;
  }
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
