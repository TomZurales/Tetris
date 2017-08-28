class ShownBoard{
  constructor(width, height){
    this.board = [];
    this.width = width;
    let newRow = [];
    for(let i = 0; i < width; i++){
      newRow.push(BACKGROUND_COLOR);
    }
    for(let i = 0; i < height + OFFSET; i++){
      this.board.push(newRow.concat());
    }
  }
  show(){
    this.board.forEach(function(e){
      console.log(e);
    });
  }
  combine(newBoard){
    for(let i = 0; i < newBoard.board.length; i++){
      for(let j = 0; j < newBoard.board[0].length; j++){
        if(newBoard.board[i][j] !== BACKGROUND_COLOR){
          this.board[i][j] = newBoard.board[i][j];
        }
      }
    }
  }

  clearFullRows(){
    let newRow = [];
    for(let i = 0; i < this.width; i++){
      newRow.push(BACKGROUND_COLOR);
    }

    for(let i = 0; i < this.board.length; i++){
      if(!this.board[i].includes(BACKGROUND_COLOR)){
        this.board.splice(i, 1);
        this.board.unshift(newRow.concat());
        remainingRows--;
        if(remainingRows === 0){
          level++
          remainingRows = rowsToLevelUp;
          if(tickSpeed > minTickSpeed){
            tickSpeed -= speedIncrease;
            console.log(tickSpeed);
          }
        }
      }
    }
  }
}
