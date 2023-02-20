import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GridBoard } from '../drawing-board/chessClasses'
import { GridMap } from '../drawing-board/gridBoard'
interface hGrid {
  sizeX: number
  sizeY: number
}
interface gridBlock {
  key: any
  value: any
}
interface piece {
  key: any
  type: any
  owner: any
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

  gridBoardInjectHolder: any
  constructor() {
    this.gridBoardInjectHolder = new GridBoard({ sizeX: this.boardSize, sizeY: this.boardSize });
    this.gridArray = this.gridBoardInjectHolder.gridArray;

    let testY : GridMap = new GridMap({ sizeX: this.boardSize, sizeY: this.boardSize });
  }

  selectPiece(selectElement: any, selectData: any) {
    this.gridBoardInjectHolder.interactBoard(selectElement, selectData);
  }
  
  // moveChessPiece(from: any, to: any) {
  //   this.checkValidMove({ key: '', type: 'q', owner: 'white' }, { key: 0, value: '' }) ? this.swapping(from, to) : alert('falsMove');
  // }

  // swapping(from: any, to: any) {
  //   [this.gridArray[to.key].value, this.gridArray[from.key].value] = [this.gridArray[from.key].value, this.gridArray[to.key].value];
  // }

  // checkValidMove(pieceType: piece, from: gridBlock) {
  //   return true
  // }

  // getPossibleMove(pieceType: piece) {
  //   console.log(pieceType);
  //   var outputArr: number[] = new Array()

  //   switch (pieceType.toString()) {
  //     case 'k':
  //       outputArr = this.simSort(outputArr.concat(
  //         this.forward(2),
  //         this.back(2),
  //         this.left(2),
  //         this.right(2),
  //         this.diagnalForwardRight(2),
  //         this.diagnalForwardLeft(2),
  //         this.diagnalBackdRight(2),
  //         this.diagnalBackLeft(2)))
  //       break;
  //     case 'q':
  //       outputArr = this.simSort(outputArr.concat(
  //         this.forward(8),
  //         this.back(8),
  //         this.left(8),
  //         this.right(8),
  //         this.diagnalForwardRight(8),
  //         this.diagnalForwardLeft(8),
  //         this.diagnalBackdRight(8),
  //         this.diagnalBackLeft(8)))
  //       break;
  //     // statement 2
  //     case 'r':
  //       outputArr = this.simSort(outputArr.concat(
  //         this.forward(8),
  //         this.back(8),
  //         this.left(8),
  //         this.right(8)))
  //       break;
  //       // statement N
  //       break;
  //     case 'b':
  //       outputArr = this.simSort(outputArr.concat(
  //         this.diagnalForwardRight(8),
  //         this.diagnalForwardLeft(8),
  //         this.diagnalBackdRight(8),
  //         this.diagnalBackLeft(8)))
  //       // statement N
  //       break;
  //     case 'n':
  //       // outputArr = this.simSort(outputArr.concat(
  //       //   this.knight(8)))
  //       outputArr = this.knight(8)
  //       // statement N
  //       break;
  //     default:
  //       // 
  //       break;
  //   }
  //   console.log(outputArr)
  //   return outputArr;
  // }

  // showPossibleMove(input: any[]) {
  //   for (let i = 0; i < input.length ; i++) {
  //     // input[i].style.backgroundColor = '#00FF00';
  //     console.log(input[i])
  //     let tAns = document.getElementById(input[i]);
  //     tAns!! ? console.log(tAns.style.backgroundColor = '#00FF00') : 0
  //   }
  //   return input
  // }

  // forward(inputlength: number) {
  //   var outputArr: number[] = new Array(inputlength)
  //   for (let i = 0; i < inputlength; i++) {
  //     outputArr[i] = i * this.boardSize;
  //   }
  //   return outputArr
  // }
  // back(inputlength: number) {
  //   var outputArr: number[] = new Array(inputlength)
  //   for (let i = 0; i < inputlength; i++) {
  //     outputArr[i] = -i * this.boardSize;
  //   }
  //   return outputArr
  // }
  // left(inputlength: number) {
  //   var outputArr: number[] = new Array(inputlength)
  //   for (let i = 0; i < inputlength; i++) {
  //     outputArr[i] = -i;
  //   }
  //   return outputArr
  // }
  // right(inputlength: number) {
  //   var outputArr: number[] = new Array(inputlength)
  //   for (let i = 0; i < inputlength; i++) {
  //     outputArr[i] = i;
  //   }
  //   return outputArr
  // }
  // diagnalForwardRight(inputlength: number) {
  //   var outputArr: number[] = new Array(inputlength)
  //   for (let i = 0; i < inputlength; i++) {
  //     outputArr[i] = i * this.boardSize + i;
  //   }
  //   return outputArr
  // }
  // diagnalForwardLeft(inputlength: number) {
  //   var outputArr: number[] = new Array(inputlength)
  //   for (let i = 0; i < inputlength; i++) {
  //     outputArr[i] = i * this.boardSize - i;
  //   }
  //   return outputArr
  // }
  // diagnalBackdRight(inputlength: number) {
  //   var outputArr: number[] = new Array(inputlength)
  //   for (let i = 0; i < inputlength; i++) {
  //     outputArr[i] = -i * this.boardSize + i;
  //   }
  //   return outputArr
  // }
  // diagnalBackLeft(inputlength: number) {
  //   var outputArr: number[] = new Array(inputlength)
  //   for (let i = 0; i < inputlength; i++) {
  //   }
  //   return outputArr
  // }

  // knight(inputlength: number) {
  //   var outputArr: number[] = new Array(inputlength)
  //   for (let i = 1; i < 2; i++) {
  //     console.log(i)
  //     // left forward
  //     outputArr[0] = i * this.boardSize + (i + 1);
  //     outputArr[1] = (i + 1) * this.boardSize + i;
  //     // right backward
  //     outputArr[2] = -i * this.boardSize + (-i - 1);
  //     outputArr[3] = (-i - 1) * this.boardSize - i;
  //     // left forward
  //     outputArr[4] = i * this.boardSize - i - 1;
  //     outputArr[5] = (i + 1) * this.boardSize - i;
  //     // right forward
  //     outputArr[6] = -i * this.boardSize - (-i - 1);
  //     outputArr[7] = (-i - 1) * this.boardSize + i;
  //   }
  //   return outputArr;
  // }

  // simSort(input: any[]) {
  //   for (let i = 0; i < input.length; i++) {
  //     for (let j = 0; j < input.length; j++) {
  //       input[i] > input[j] ? [input[i], input[j]] = [input[j], input[i]] : false
  //     }
  //   }
  //   return input
  // }

  // deleteduplicate(input: any[]) {
  //   for (let i = 0; i < input.length; i++) {
  //     input[i] == input[i + 1] ? input.splice(i, 1) : 0
  //   }
  //   return input
  // }
  ngOnInit() { }

}
