import { Component, OnInit } from '@angular/core';

interface hGrid {
  sizeX: number
  sizeY: number
}

@Component({
  selector: 'app-drawing-board',
  templateUrl: './drawing-board.component.html',
  styleUrls: ['./drawing-board.component.css'],
})
export class DrawingBoardComponent implements OnInit {
  boardSize = 8;
  gridArray: any = []
  whitePlayerPiece: any = []
  blackPlayerPiece: any = []
  pieceOrder = ['r','n','b','r','q','k','b','n','r','p','p','p','p','p','p','p','p','p'];
  pawnPieceOrder = ['p','p','p','p','p','p','p','p','p'];

  constructor() {
    let testGrid: hGrid = { sizeX: this.boardSize, sizeY: this.boardSize };
    this.gridArray = this.initializeGrid(testGrid)
    this.whitePlayerPiece = this.initializePiece(2, 8, '')
    this.blackPlayerPiece = this.initializePiece(2, 8, '')
    this.blackPlayerPiece = this.blackPlayerPiece.reverse();
    this.placeChessOnGrid(this.whitePlayerPiece,0,1);
    this.placeChessOnGrid(this.blackPlayerPiece,56,1);
    console.log(this.gridArray)
  }

  initializeGrid(testGrid: hGrid) {
    let outputGridArray: any = []
    for (let i = 0; i < testGrid.sizeY; i++) {
      for (let j = 0; j < testGrid.sizeX; j++) {
        outputGridArray[outputGridArray.length] = i * this.boardSize + j;
      }
    }
    return outputGridArray
  }

  initializePiece(sizeX: number, sizeY: number, targetObject: any) {
    let outputGridArray: any = [];
    for (let i = 0; i < sizeX*sizeY; i++) {
      outputGridArray[i] = this.pieceOrder[i]; 
    }
    return outputGridArray
  }
  placeChessOnGrid(targetChessArray:string[],from:any,direction:number){
    for (let i = from; i < targetChessArray.length; i+direction) {
      this.gridArray[i] = targetChessArray[i];
    }
  }

  rotateChesOrder(targetChessArray:string[]){
    targetChessArray.reverse();
  }








  

  ngOnInit() { }

}
