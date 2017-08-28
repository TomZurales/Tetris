class PieceBoard{
  constructor(width, height, piece){
    this.atBottom = false;

    this.height = height;
    this.width = width;
    this.center = Math.floor(width / 2);
    this.board = [];

    let newRow = [];
    for(let i = 0; i < width; i++){
      newRow.push(BACKGROUND_COLOR);
    }
    for(let i = 0; i < height + OFFSET; i++){
      this.board.push(newRow.concat());
    }

    this.newPiece(piece);
  }

  newPiece(piece){
    this.atBottom = false;
    this.clearBoard();
    this.x = this.center - piece.center;
    this.y = Math.abs(piece.height - OFFSET - 1);

    for(let row = 0; row < piece.arr.length; row++){
      for(let col = 0; col < piece.arr[0].length; col++){
        this.board[this.y + row][this.x + col] = piece.arr[row][col];
      }
    }
  }

  rotatePiece(piece, board){
    this.atBottom = false;
    const Y_OFFSET = 4;
    let nearBottom = false;
    this.clearBoard();

    let startingX = this.center - piece.center;
    let startingY = this.y;

    if(this.y > 15){
      startingY -= Y_OFFSET;
      nearBottom = true;
    }

    for(let row = 0; row < piece.arr.length; row++){
      for(let col = 0; col < piece.arr[0].length; col++){
        this.board[startingY + row][startingX + col] = piece.arr[row][col];
      }
    }

    let newRow = [];
    for(let i = 0; i < this.width; i++){
      newRow.push(BACKGROUND_COLOR);
    }

    while(startingY < this.y){
      if(this._ableToMoveDown()){
        this.board.unshift(newRow.concat());
        this.board.pop();
        startingY++;
      }
      else{
        this.y = startingY;
      }
    }

    while(startingX < this.x){
      if(this._ableToMoveRight()){
        this.board.forEach(function(e){
          e.unshift(BACKGROUND_COLOR);
          e.pop();
        });
        startingX++;
      }
      else{
        this.x = startingX;
        break;
      }
    }

    while(startingX > this.x){
      if(this._ableToMoveLeft()){
        this.board.forEach(function(e){
          e.push(BACKGROUND_COLOR);
          e.shift();
        });
        startingX--;
      }
      else{
        this.x = startingX;
        break;
      }
    }

    if(!this._noCollisions(board)){
      if(this.moveRight(board)){
        console.log("RIGHT");
      }
      else if(this.moveLeft(board)){
        console.log("LEFT");
      }
      else if(this.moveDown(board)){
        console.log("DOWN");
      }
      else while(!this._noCollisions(board)){
        this.moveUp(board);
        console.log("UP");
      }
    }
  }

  moveRight(board){
    this.atBottom = false;
    let ableToMove = this._ableToMoveRight();
    if(ableToMove){
      this.board.forEach(function(e){
        e.unshift(BACKGROUND_COLOR);
        e.pop();
      });
      this.x++;
    }
    else{
      return ableToMove;
    }
    if(!this._noCollisions(board)){
      this.board.forEach(function(e){
        e.push(BACKGROUND_COLOR);
        e.shift();
      });
      this.x--;
      ableToMove = false;
    }
    return ableToMove;
  }

  moveLeft(board){
    this.atBottom = false;
    let ableToMove = this._ableToMoveLeft();
    if(ableToMove){
      this.board.forEach(function(e){
        e.push(BACKGROUND_COLOR);
        e.shift();
      });
      this.x--;
      ableToMove = false;
    }
    else{
      return ableToMove;
    }
    if(!this._noCollisions(board)){
      this.board.forEach(function(e){
        e.unshift(BACKGROUND_COLOR);
        e.pop();
      });
      this.x++;
    }
    return ableToMove;
  }

  moveUp(board){
    let newRow = [];
    for(let i = 0; i < this.width; i++){
      newRow.push(BACKGROUND_COLOR);
    }
    this.board.push(newRow.concat());
    this.board.shift();
    this.y--;
  }

  moveDown(board){
    this.atBottom = false;
    let ableToMove = this._ableToMoveDown();
    let newRow = [];
    for(let i = 0; i < this.width; i++){
      newRow.push(BACKGROUND_COLOR);
    }
    if(ableToMove){
      this.board.unshift(newRow.concat());
      this.board.pop();
      this.y++;
    }
    else{
      this.atBottom = true;
      return ableToMove;
    }
    if(!this._noCollisions(board)){
      this.board.push(newRow.concat());
      this.board.shift();
      this.y--;
      this.atBottom = true;
      ableToMove = false;
    }
    return ableToMove;
  }

  clearBoard(){
    let emptyArr = [];
    for(let i = 0; i < this.width; i++){
      emptyArr.push(BACKGROUND_COLOR);
    }
    for(let i = 0; i < this.height + OFFSET; i++){
      this.board.unshift(emptyArr.concat());
      this.board.pop();
    }
  }

  _ableToMoveRight(){
    let ableToMoveRight = true;
    this.board.forEach(function(e){
      if(ableToMoveRight){
        if(e[e.length - 1] !== BACKGROUND_COLOR){
          ableToMoveRight = false;
        }
      }
    });
    return ableToMoveRight;
  }

  _ableToMoveLeft(){
    let ableToMoveLeft = true;
    this.board.forEach(function(e){
      if(ableToMoveLeft){
        if(e[0] !== BACKGROUND_COLOR){
          ableToMoveLeft = false;
        }
      }
    });
    return ableToMoveLeft;
  }

  _ableToMoveDown(){
    let ableToMoveDown = true;
    this.board[this.board.length - 1].forEach(function(e){
      if(ableToMoveDown){
        if(e !== BACKGROUND_COLOR){
          ableToMoveDown = false;
        }
      }
    });
    return ableToMoveDown;
  }

  _noCollisions(board){
    let noCollisions = true;
    for(let i = 0; i < this.board.length; i++){
      for(let j = 0; j < this.board[0].length; j++){
        if(noCollisions){
          if(board.board[i][j] !== BACKGROUND_COLOR && this.board[i][j] !== BACKGROUND_COLOR){
            noCollisions = false;
          }
        }
      }
    }
    return noCollisions;
  }
}
