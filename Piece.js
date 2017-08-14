class Piece{
  show(){
    this.pieceArr.forEach((e) => console.log(e));
  }

  constructor(type){
    switch(type){
      case 0:
      this.type = "line";
      this.pieceArr = [[1],
      [1],
      [1],
      [1]];
      break;
      case 1:
      this.type = "l-block";
      this.pieceArr = [[1, 0],
      [1, 0],
      [1, 1]];
      break;
      case 2:
      this.type = "reverse-l-block";
      this.pieceArr = [[0, 1],
      [0, 1],
      [1, 1]];
      break;
      case 3:
      this.type = "squigly";
      this.pieceArr = [[0, 1],
      [1, 1],
      [1, 0]];
      break;
      case 4:
      this.type = "reverse-squigly";
      this.pieceArr = [[1, 0],
      [1, 1],
      [0, 1]];
      break;
      case 5:
      this.type = "square";
      this.pieceArr = [[1, 1],
      [1, 1]];
      break;
      case 6:
      this.type = "t-block"
      this.pieceArr = [[0, 1],
      [1, 1],
      [0, 1]];
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
