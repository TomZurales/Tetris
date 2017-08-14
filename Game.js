class Game{
  constructor(width, height){
    this.fullRow = [];
    while(this.fullRow.length < width){
      this.fullRow.push(BACKGROUND_COLOR);
    }
    this.fullRow.join();
    this.ableToLock = true;
    this.shownBoard = new ShownBoard(width, height);
    this.pieceBoard = new PieceBoard(width, height);
    this.nextBoard = new PieceBoard(width, height);
    this.currentPiece = new Piece(Math.floor(Math.random() * 6));
    this.currentLocation = [Math.floor(this.pieceBoard.center - this.currentPiece.center), 0];
    this.pieceBoard.addPiece(this.currentPiece, this.currentLocation);
    this.nextBoard.addPiece(this.currentPiece, this.currentLocation);
    this.nextBoard.moveDown();
    let testBoard = new PieceBoard(width, height);
    window.addEventListener('keydown', function(event){
      switch (event.keyCode) {
        case 37:
          testBoard.clearBoard();
          testBoard.addPiece(this.currentPiece, [this.currentLocation[0] - 1, this.currentLocation[1]]);
          if(hasNoCollisions(this.shownBoard, testBoard)){
            this.pieceBoard.moveLeft();
            this.nextBoard.moveLeft();
            this.currentLocation[0] -= 1;
            draw(this.shownBoard, this.pieceBoard);
          }
          break;
        case 39:
          testBoard.clearBoard();
          testBoard.addPiece(this.currentPiece, [this.currentLocation[0] + 1, this.currentLocation[1]]);
          if(hasNoCollisions(this.shownBoard, testBoard)){
            this.pieceBoard.moveRight();
            this.nextBoard.moveRight();
            this.currentLocation[0] += 1;
            draw(this.shownBoard, this.pieceBoard);
          }
          break;
        case 40:
          while(hasNoCollisions(this.shownBoard, this.nextBoard)){
            this.tick();
          }
          break;
        case 88:
          testBoard.clearBoard();
          this.currentPiece.rotateRight();
          testBoard.addPiece(this.currentPiece, this.currentLocation);
          if(!hasNoCollisions(this.shownBoard, testBoard)){
            testBoard.clear();
            this.currentLocation[1] -= 1;
            testBoard.addPiece(this.currentPiece, this.currentLocation);
          }
          if(!hasNoCollisions(this.shownBoard, testBoard)){
            testBoard.clear();
            this.currentLocation[1] += 1;
            this.currentLocation[0] -= 1;
            testBoard.addPiece(this.currentPiece, this.currentLocation);
          }
          if(!hasNoCollisions(this.shownBoard, testBoard)){
            testBoard.clear();
            this.currentLocation[0] += 2;
            testBoard.addPiece(this.currentPiece, this.currentLocation);
          }
          if(!hasNoCollisions(this.shownBoard, testBoard)){
            testBoard.clear();
            this.currentLocation[0] -= 1;
            this.currentLocation[1] += 1;
            testBoard.addPiece(this.currentPiece, this.currentLocation);
          }
          if(!hasNoCollisions(this.shownBoard, testBoard)){
            this.currentPiece.rotateLeft();
            this.currentLocation[1] -= 1;
          }
          this.pieceBoard.clearBoard();
          this.pieceBoard.addPiece(this.currentPiece, this.currentLocation);
          this.nextBoard.clearBoard();
          this.nextBoard.addPiece(this.currentPiece, this.currentLocation);
          this.nextBoard.moveDown();
          draw(this.shownBoard, this.pieceBoard);
          break;
        case 90:
        testBoard.clearBoard();
        this.currentPiece.rotateLeft();
        testBoard.addPiece(this.currentPiece, this.currentLocation);
        if(!hasNoCollisions(this.shownBoard, testBoard)){
          testBoard.clear();
          this.currentLocation[1] -= 1;
          testBoard.addPiece(this.currentPiece, this.currentLocation);
        }
        if(!hasNoCollisions(this.shownBoard, testBoard)){
          testBoard.clear();
          this.currentLocation[1] += 1;
          this.currentLocation[0] -= 1;
          testBoard.addPiece(this.currentPiece, this.currentLocation);
        }
        if(!hasNoCollisions(this.shownBoard, testBoard)){
          testBoard.clear();
          this.currentLocation[0] += 2;
          testBoard.addPiece(this.currentPiece, this.currentLocation);
        }
        if(!hasNoCollisions(this.shownBoard, testBoard)){
          testBoard.clear();
          this.currentLocation[0] -= 1;
          this.currentLocation[1] += 1;
          testBoard.addPiece(this.currentPiece, this.currentLocation);
        }
        if(!hasNoCollisions(this.shownBoard, testBoard)){
          this.currentPiece.rotateLeft();
          this.currentLocation[1] -= 1;
        }
        this.pieceBoard.clearBoard();
        this.pieceBoard.addPiece(this.currentPiece, this.currentLocation);
        this.nextBoard.clearBoard();
        this.nextBoard.addPiece(this.currentPiece, this.currentLocation);
        this.nextBoard.moveDown();
        draw(this.shownBoard, this.pieceBoard);
        break;
      }
    }.bind(this));
  }

  tick(){
    if(hasNoCollisions(this.shownBoard, this.nextBoard)){
      this.pieceBoard.moveDown();
      this.nextBoard.moveDown();
      this.currentLocation[1] += 1;
    }
    else if(this.ableToLock){
      this.shownBoard.combine(combine(this.shownBoard, this.pieceBoard));
      for(let i = 0; i < this.shownBoard.board.length - 1; i++){
        let allFilled = true;
        for(let j = 0; j < this.shownBoard.board[i].length; j++){
          if(allFilled){
            if(this.shownBoard.board[i][j] === BACKGROUND_COLOR){
              allFilled = false;
            }
          }
        }
        if(allFilled){
          console.log("ROW FILLED");
          this.shownBoard.board.splice(i, 1);
          let newRow = [EDGE_COLOR];
          while(newRow.length < this.shownBoard.board[0].length - 1){
            newRow.push(BACKGROUND_COLOR);
          }
          newRow.push(EDGE_COLOR);
          this.shownBoard.board.unshift(newRow);
        }
      }
      this.pieceBoard.clearBoard();
      this.nextBoard.clearBoard();
      this.currentPiece = new Piece(Math.floor(Math.random() * 6));
      this.currentLocation = [Math.floor(this.pieceBoard.center - this.currentPiece.center), 0];
      this.pieceBoard.addPiece(this.currentPiece, this.currentLocation);
      this.nextBoard.addPiece(this.currentPiece, this.currentLocation);
      this.nextBoard.moveDown();
    }
    draw(this.shownBoard, this.pieceBoard);
  }
}
