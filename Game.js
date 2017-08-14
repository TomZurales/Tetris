class Game{
  constructor(width, height){
    this.fullRow = [];
    while(this.fullRow.length < width){
      this.fullRow.push(BACKGROUND_COLOR);
    }
    this.timerActive = false;
    this.fullRow.join();
    this.ableToLock = true;
    this.shownBoard = new ShownBoard(width, height);
    this.pieceBoard = new PieceBoard(width, height);
    this.nextBoard = new PieceBoard(width, height);
    this.currentPiece = new Piece(Math.floor(Math.random() * 7));
    this.currentLocation = [Math.floor(this.pieceBoard.center - this.currentPiece.center), (1 + OFFSET) - this.currentPiece.pieceArr.length];
    this.pieceBoard.addPiece(this.currentPiece, this.currentLocation);
    this.nextBoard.addPiece(this.currentPiece, this.currentLocation);
    this.nextBoard.moveDown();
    let testBoard = new PieceBoard(width, height);
    document.getElementById("currentLevel").innerHTML = "Level: " + level;
    document.getElementById("remainingRows").innerHTML = "Remaining Rows: " + rowsToNextLevel;
    window.addEventListener('keydown', function(event){
      switch (event.keyCode) {
        case 37:
        this.timerActive = false;
        this.ableToLock = false;
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
        this.ableToLock = false;
        this.timerActive = false;
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
        this.ableToLock = false;
        this.timerActive = false;
        while(hasNoCollisions(this.shownBoard, this.nextBoard)){
          this.tick();
        }
        break;
        case 88:
        this.ableToLock = false;
        this.timerActive = false;
        testBoard.clearBoard();
        this.currentPiece.rotateRight();
        testBoard.addPiece(this.currentPiece, this.currentLocation);
        if(!hasNoCollisions(this.shownBoard, testBoard)){
          testBoard.clearBoard();
          this.currentLocation[1] -= 1;
          testBoard.addPiece(this.currentPiece, this.currentLocation);
        }
        if(!hasNoCollisions(this.shownBoard, testBoard)){
          testBoard.clearBoard();
          this.currentLocation[1] += 1;
          this.currentLocation[0] -= 1;
          testBoard.addPiece(this.currentPiece, this.currentLocation);
        }
        if(!hasNoCollisions(this.shownBoard, testBoard)){
          testBoard.clearBoard();
          this.currentLocation[0] += 2;
          testBoard.addPiece(this.currentPiece, this.currentLocation);
        }
        if(!hasNoCollisions(this.shownBoard, testBoard)){
          testBoard.clearBoard();
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
        this.ableToLock = false;
        this.timerActive = false;
        testBoard.clearBoard();
        this.currentPiece.rotateLeft();
        testBoard.addPiece(this.currentPiece, this.currentLocation);
        if(!hasNoCollisions(this.shownBoard, testBoard)){
          testBoard.clearBoard();
          this.currentLocation[1] -= 1;
          testBoard.addPiece(this.currentPiece, this.currentLocation);
        }
        if(!hasNoCollisions(this.shownBoard, testBoard)){
          testBoard.clearBoard();
          this.currentLocation[1] += 1;
          this.currentLocation[0] -= 1;
          testBoard.addPiece(this.currentPiece, this.currentLocation);
        }
        if(!hasNoCollisions(this.shownBoard, testBoard)){
          testBoard.clearBoard();
          this.currentLocation[0] += 2;
          testBoard.addPiece(this.currentPiece, this.currentLocation);
        }
        if(!hasNoCollisions(this.shownBoard, testBoard)){
          testBoard.clearBoard();
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
      clearInterval(gameInterval);
      gameInterval = setInterval(game.tick.bind(this), tickSpeed);
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
          rowsToNextLevel--;
          if(rowsToNextLevel === 0){
            rowsToNextLevel = 2;
            if(tickSpeed >= minTickSpeed){
              tickSpeed -= Math.floor((tickSpeed - minTickSpeed) / numLevels);
            }
            level++;
          }
          clearInterval(gameInterval);
          gameInterval = setInterval(game.tick.bind(this), tickSpeed);
          document.getElementById("currentLevel").innerHTML = "Level: " + level;
          document.getElementById("remainingRows").innerHTML = "Remaining Rows: " + rowsToNextLevel;
          this.shownBoard.board.splice(i, 1);
          let newRow = [EDGE_COLOR];
          while(newRow.length < this.shownBoard.board[0].length - 1){
            newRow.push(BACKGROUND_COLOR);
          }
          newRow.push(EDGE_COLOR);
          this.shownBoard.board.unshift(newRow);
        }
      }
      this.ableToLock = false;
      this.pieceBoard.clearBoard();
      this.nextBoard.clearBoard();
      this.currentPiece = new Piece(Math.floor(Math.random() * 7));
      this.currentLocation = [Math.floor(this.pieceBoard.center - this.currentPiece.center), (1 + OFFSET) - this.currentPiece.pieceArr.length];
      this.pieceBoard.addPiece(this.currentPiece, this.currentLocation);
      this.nextBoard.addPiece(this.currentPiece, this.currentLocation);
      this.nextBoard.moveDown();
    }
    else{
      if(!this.ableToLock && !this.timerActive){
        this.timerActive = true;
        setTimeout(function(){
          this.ableToLock = true;
          this.timerActive = false;
        }.bind(this), TIME_TO_LOCK);
      }
    }
    draw(this.shownBoard, this.pieceBoard);
  }
}
