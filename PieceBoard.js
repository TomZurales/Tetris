class PieceBoard{
  constructor(width, height){
    this.width = width;
    this.height = height;
    this.center = width / 2;
    this.board = [];
    let newRow = [];
    for(var i = 0; i < width; i++){
      newRow.push(0);
    }
    for(var j = 0; j < height; j++){
      this.board.push(newRow);
    }
  }

  addPiece(pieceToAdd, locationArray){
    const pieceHeight = pieceToAdd.pieceArr.length;
    let zeroArr = [];
    let newRows = [];
    let nextRow = [];

    //fill zeroArr with 0s to correct length
    for(let i = 0; i < this.width; i++){
      zeroArr.push(0);
    }

    //Put 0s on top of the new array until the desired height is reached
    for(let i = 0; i < locationArray[1]; i++){
      newRows.push(zeroArr);
    }

    for(let i = 0; i < pieceHeight; i++){
      nextRow = [];
      //put zeros at the begining of the new rows until the desired distance is reached
      for(let widthZeros = 0; widthZeros < locationArray[0]; widthZeros++){
        nextRow.push(0);
      }
      //add the piece row
      pieceToAdd.pieceArr[i].forEach(function(e){
        nextRow.push(e);
      });
      while(nextRow.length < this.width){
        nextRow.push(0);
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
      if(e.includes(1)){
        e.unshift(0);
        e.pop();
      }
    });
  }

  moveLeft(){
    this.board.forEach(function(e){
      if(e.includes(1)){
        e.push(0);
        e.shift();
      }
    });
  }

  moveDown(){
    var zeroArr = [];
    for(let i = 0; i < this.width; i++){
      zeroArr.push(0);
    }
    this.board.unshift(zeroArr);
    this.board.pop();
  }

  clearBoard(){
    var zeroArr = [];
    for(var i = 0; i < this.width; i++){
      zeroArr.push(0);
    }
    for(var i = 0; i < this.height; i++){
      this.board.unshift(zeroArr);
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
