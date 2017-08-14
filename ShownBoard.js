class ShownBoard{
  constructor(width, height){
    this.board = [];
    let newRow = [EDGE_COLOR];
    for(let i = 0; i < width - 2; i++){
      newRow.push(BACKGROUND_COLOR);
    }
    newRow.push(EDGE_COLOR);
    for(let i = 0; i < height - 1; i++){
      this.board.push(newRow);
    }
    newRow = [];
    for(let i = 0; i < width; i++){
      newRow.push(EDGE_COLOR);
    }
    this.board.push(newRow);
  }
  show(){
    this.board.forEach(function(e){
      console.log(e);
    });
  }
  combine(newBoard){
    this.board = newBoard;
  }
}
