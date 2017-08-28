class Piece{
  constructor(type){
    switch(type){
      case 0:
        this.type = "line";
        this.arr = [[BACKGROUND_COLOR, LINE_COLOR, BACKGROUND_COLOR, BACKGROUND_COLOR],
                    [BACKGROUND_COLOR, LINE_COLOR, BACKGROUND_COLOR, BACKGROUND_COLOR],
                    [BACKGROUND_COLOR, LINE_COLOR, BACKGROUND_COLOR, BACKGROUND_COLOR],
                    [BACKGROUND_COLOR, LINE_COLOR, BACKGROUND_COLOR, BACKGROUND_COLOR]];
        this.center = 2;
        break;
      case 1:
        this.type = "l-block";
        this.arr = [[BACKGROUND_COLOR, L_BLOCK_COLOR, BACKGROUND_COLOR],
                    [BACKGROUND_COLOR, L_BLOCK_COLOR, BACKGROUND_COLOR],
                    [BACKGROUND_COLOR, L_BLOCK_COLOR, L_BLOCK_COLOR]];
        this.center = 2;
        break;
      case 2:
        this.type = "reverse-l-block";
        this.arr = [[BACKGROUND_COLOR, REVERSE_L_BLOCK_COLOR, BACKGROUND_COLOR],
                    [BACKGROUND_COLOR, REVERSE_L_BLOCK_COLOR, BACKGROUND_COLOR],
                    [REVERSE_L_BLOCK_COLOR, REVERSE_L_BLOCK_COLOR, BACKGROUND_COLOR]];
        this.center = 1;
        break;
      case 3:
        this.type = "squigly";
        this.arr = [[BACKGROUND_COLOR, BACKGROUND_COLOR, SQUIGLY_COLOR],
                    [BACKGROUND_COLOR, SQUIGLY_COLOR, SQUIGLY_COLOR],
                    [BACKGROUND_COLOR, SQUIGLY_COLOR, BACKGROUND_COLOR]];
        this.center = 2;
        break;
      case 4:
        this.type = "reverse-squigly";
        this.arr = [[BACKGROUND_COLOR, REVERSE_SQUIGLY_COLOR, BACKGROUND_COLOR],
                    [BACKGROUND_COLOR, REVERSE_SQUIGLY_COLOR, REVERSE_SQUIGLY_COLOR],
                    [BACKGROUND_COLOR, BACKGROUND_COLOR, REVERSE_SQUIGLY_COLOR]];
        this.center = 2;
        break;
      case 5:
        this.type = "square";
        this.arr = [[SQUARE_COLOR, SQUARE_COLOR],
                    [SQUARE_COLOR, SQUARE_COLOR]];
        this.center = 1;
        break;
      case 6:
        this.type = "t-block"
        this.arr = [[BACKGROUND_COLOR, T_BLOCK_COLOR, BACKGROUND_COLOR],
                    [T_BLOCK_COLOR, T_BLOCK_COLOR, BACKGROUND_COLOR],
                    [BACKGROUND_COLOR, T_BLOCK_COLOR, BACKGROUND_COLOR]];
        this.center = 1;
        break;
    }
    this.width = this.arr[0].length;
    this.height = this.arr.length;
  }

  rotateLeft(){
    let newRow = [];
    let newPieceArr = [];
    for(let i = 1; i <= this.arr[0].length; i++){
      newRow = [];
      for(let j = 0; j < this.arr.length; j++){
        newRow.push(this.arr[j][this.arr[0].length - i])
      }
      newPieceArr.push(newRow);
    }
    this.arr = newPieceArr;
    return this;
  }

  rotateRight(){
    this.rotateLeft();
    this.rotateLeft();
    this.rotateLeft();
    return this;
  }
}
