class PieceBoard{
  constructor(width, height){
    this.width = width;
    this.height = height;
    this.center = width / 2;
    this.board = [];
    let newRow = [];
    for(var i = 0; i < width; i++){
      newRow.push(BACKGROUND_COLOR);
    }
    for(var j = 0; j < height; j++){
      this.board.push(newRow);
    }
  }

  addPiece(pieceToAdd, locationArray){
    const pieceHeight = pieceToAdd.pieceArr.length;
    let emptyArr = [];
    let newRows = [];
    let nextRow = [];

    //fill emptyArr with 0s to correct length
    for(let i = 0; i < this.width; i++){
      emptyArr.push(BACKGROUND_COLOR);
    }

    //Put 0s on top of the new array until the desired height is reached
    for(let i = 0; i < locationArray[1]; i++){
      newRows.push(emptyArr);
    }

    for(let i = 0; i < pieceHeight; i++){
      nextRow = [];
      //put zeros at the begining of the new rows until the desired distance is reached
      for(let widthZeros = 0; widthZeros < locationArray[0]; widthZeros++){
        nextRow.push(BACKGROUND_COLOR);
      }
      //add the piece row
      pieceToAdd.pieceArr[i].forEach(function(e){
        nextRow.push(e);
      });
      while(nextRow.length < this.width){
        nextRow.push(BACKGROUND_COLOR);
      }
      newRows.push(nextRow);
    }
    while(newRows.length > 0){
      this.board.unshift(newRows.pop());
      this.board.pop();
    }
  }
  moveRight(){
    this.board.forEach(function(e){
      e.unshift(BACKGROUND_COLOR);
      e.pop();
    });
  }

  moveLeft(){
    this.board.forEach(function(e){
      e.push(BACKGROUND_COLOR);
      e.shift();
    });
  }

  moveDown(){
    var emptyArr = [];
    for(let i = 0; i < this.width; i++){
      emptyArr.push(BACKGROUND_COLOR);
    }
    this.board.unshift(emptyArr);
    this.board.pop();
  }

  clearBoard(){
    var emptyArr = [];
    for(var i = 0; i < this.width; i++){
      emptyArr.push(BACKGROUND_COLOR);
    }
    for(var i = 0; i < this.height; i++){
      this.board.unshift(emptyArr);
      this.board.pop();
    }

  }

  update(newPiece, newLocation){
    this.clearBoard();
    this.addPiece(newPiece, newLocation);
  }

  show(){
    this.board.forEach((e) => console.log(e));
  }
}
