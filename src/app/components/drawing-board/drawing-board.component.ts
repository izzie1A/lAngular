import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GridBoard } from '../drawing-board/chessClasses'
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
  pieceOrder = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'];
  pawnPieceOrder = ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'];

  pieceElementSelector: any
  pieceDataSelector: any

  constructor() {
    let testGrid: hGrid = { sizeX: this.boardSize, sizeY: this.boardSize };
    this.gridArray = this.initializeGrid(testGrid)

    this.whitePlayerPiece = this.initializePiece(2, 8)
    this.placeChessOnGrid(this.whitePlayerPiece, 0, 1);

    this.blackPlayerPiece = this.initializePiece(2, 8).reverse();
    this.placeChessOnGrid(this.blackPlayerPiece, 48, 1);

  }

  initializeGrid(testGrid: hGrid) {
    let outputGridArray: any = []
    for (let i = 0; i < testGrid.sizeY; i++) {
      for (let j = 0; j < testGrid.sizeX; j++) {
        outputGridArray[outputGridArray.length] = { key: i * this.boardSize + j, value: '' };
      }
    }
    return outputGridArray
  }

  initializePiece(sizeX: number, sizeY: number) {
    let outputGridArray: any = [];
    for (let i = 0; i < sizeX * sizeY; i++) {
      outputGridArray[i] = this.pieceOrder[i];
    }
    return outputGridArray
  }


  placeChessOnGrid(targetChessArray: string[], from: any, direction: number) {
    let targetChessArrayCount = 0;
    for (let i = 0; i < targetChessArray.length; i = i + direction) {
      // this.gridArray[from+i] = targetChessArray[targetChessArrayCount];
      this.gridArray[from + i] = { key: from + i, value: targetChessArray[targetChessArrayCount] };
      targetChessArrayCount++
    }
  }

  selectPiece(selectElement: any, selectData: any) {
    if (selectElement == this.pieceElementSelector) {
      this.pieceElementSelector.style.backgroundColor = '#FF0000';
      this.pieceElementSelector = undefined;
      this.pieceDataSelector = undefined;
    }
    else if (this.pieceElementSelector == undefined) {
      selectElement.style.backgroundColor = '#FFFFFF';
      this.pieceElementSelector = selectElement;
      this.pieceDataSelector = selectData;
    }
    else {
      this.moveChessPiece(this.gridArray[this.pieceDataSelector.key], this.gridArray[selectData.key]);
      this.pieceElementSelector.style.backgroundColor = '#FF0000';
      this.pieceElementSelector = undefined;
      this.pieceDataSelector = undefined;
    }
  }
  moveChessPiece(from: any, to: any) {
    this.checkValidMove() ? this.swapping(from,to) : alert('falsMove');
  }
  
  swapping(from: any, to: any) {
    let pieceDataHolder = this.gridArray[to.key];
    this.gridArray[to.key] = this.gridArray[from.key];
    this.gridArray[from.key] = pieceDataHolder;
  }

  checkValidMove() {
    return true
  }

  ngOnInit() { }

}
