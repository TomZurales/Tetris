class ShownBoard{
  constructor(width, height){
    this.board = [];
    let newRow = [];
    newRow.push(1);
    for(let i = 0; i < width - 2; i++){
      newRow.push(0);
    }
    newRow.push(1);
    for(let i = 0; i < height - 1; i++){
      this.board.push(newRow);
    }
    newRow = [];
    for(let i = 0; i < width; i++){
      newRow.push(1);
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
