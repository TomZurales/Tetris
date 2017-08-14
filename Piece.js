class Piece{
  show(){
    this.pieceArr.forEach((e) => console.log(e));
  }

  constructor(type){
    switch(type){
      case 0:
      this.type = "line";
      this.pieceArr = [[LINE_COLOR],
      [LINE_COLOR],
      [LINE_COLOR],
      [LINE_COLOR]];
      break;
      case 1:
      this.type = "l-block";
      this.pieceArr = [[L_BLOCK_COLOR, BACKGROUND_COLOR],
      [L_BLOCK_COLOR, BACKGROUND_COLOR],
      [L_BLOCK_COLOR, L_BLOCK_COLOR]];
      break;
      case 2:
      this.type = "reverse-l-block";
      this.pieceArr = [[BACKGROUND_COLOR, REVERSE_L_BLOCK_COLOR],
      [BACKGROUND_COLOR, REVERSE_L_BLOCK_COLOR],
      [REVERSE_L_BLOCK_COLOR, REVERSE_L_BLOCK_COLOR]];
      break;
      case 3:
      this.type = "squigly";
      this.pieceArr = [[BACKGROUND_COLOR, SQUIGLY_COLOR],
      [SQUIGLY_COLOR, SQUIGLY_COLOR],
      [SQUIGLY_COLOR, BACKGROUND_COLOR]];
      break;
      case 4:
      this.type = "reverse-squigly";
      this.pieceArr = [[REVERSE_SQUIGLY_COLOR, BACKGROUND_COLOR],
      [REVERSE_SQUIGLY_COLOR, REVERSE_SQUIGLY_COLOR],
      [BACKGROUND_COLOR, REVERSE_SQUIGLY_COLOR]];
      break;
      case 5:
      this.type = "square";
      this.pieceArr = [[SQUARE_COLOR, SQUARE_COLOR],
      [SQUARE_COLOR, SQUARE_COLOR]];
      break;
      case 6:
      this.type = "t-block"
      this.pieceArr = [[BACKGROUND_COLOR, T_BLOCK_COLOR],
      [T_BLOCK_COLOR, T_BLOCK_COLOR],
      [BACKGROUND_COLOR, T_BLOCK_COLOR]];
      break;
    }
    this.center = this.pieceArr[0].length / 2;
  }

  rotateLeft(){
    let newRow = [];
    let newPieceArr = [];
    for(let i = 1; i <= this.pieceArr[0].length; i++){
      newRow = [];
      for(let j = 0; j < this.pieceArr.length; j++){
        newRow.push(this.pieceArr[j][this.pieceArr[0].length - i])
      }
      newPieceArr.push(newRow);
    }
    this.pieceArr = newPieceArr;
    this.center = Math.ceil(this.pieceArr[0].length / 2);
    return this.pieceArr;
  }

  rotateRight(){
    this.rotateLeft();
    this.rotateLeft();
    this.rotateLeft();
    return this.pieceArr;
  }
}
