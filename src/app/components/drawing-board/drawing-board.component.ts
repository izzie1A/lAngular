import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GridBoard } from '../drawing-board/chessClasses'
import { GridMap } from '../drawing-board/gridBoard'
import { gridController } from '../drawing-board/gridController'

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

  selector: any | undefined = undefined;
  timeLeft: number = 10;
  interval: any;

  // action
  pieceActionArray: any[] = []
  testArray: any[] = []

  // displayArray : any[];
  displayArray: {
    availableSpecialMoveArray: any[];
    availableMovesArray: any[];
    availableAttackArray: any[];
  };


  gridBoardInjectHolder: any

  constructor() {
    this.displayArray = { availableSpecialMoveArray: [], availableMovesArray: [], availableAttackArray: [] };
    this.gridBoardInjectHolder = new GridMap({ sizeX: this.boardSize, sizeY: this.boardSize });
    let gridBoaradInjectHolder = new gridController(this.boardSize, this.boardSize);

    // let testY: GridBoard = new GridBoard({ sizeX: this.boardSize, sizeY: this.boardSize });
    this.gridArray = this.gridBoardInjectHolder.getMapToArray(this.gridBoardInjectHolder.gridContainer.gridMap, this.gridBoardInjectHolder.gridContainer.gridArray);
    this.startTimer()
    this.testT();
    this.testArray = []

  }


  onSelect(selectElement: any, selectData: any) {

    if (this.selector == undefined) {
      console.log('select', selectElement, selectData)
      this.selector = { element: selectElement, selectData: selectData }
      let availableMoveHolder = this.gridBoardInjectHolder.getPieceMoves(selectData.value.pieceValue, selectData);

      this.loadAvailableMoves(availableMoveHolder, selectData.key)
      this.showPossibleMove(true, this.displayArray.availableMovesArray);
    }
    else if (this.selector != undefined) {
      if (this.selector.element == selectElement && this.selector.selectData == selectData && this.selector.selectData.pieceValue != "") {
        console.log('deselect', this.selector.element == selectElement && this.selector.selectData == selectData)
        this.selector = undefined;
        this.showPossibleMove(false, this.displayArray.availableMovesArray);
        this.displayArray.availableMovesArray = []

      } else {
        console.log('active')
        let result = this.gridBoardInjectHolder.checkValidMove(this.selector, { element: selectElement, selectData: selectData });
        console.log(result);

        // this.gridBoardInjectHolder.pieceMoveTo(this.selector, { element: selectElement, selectData: selectData });

        result ? this.gridBoardInjectHolder.pieceMoveTo(this.selector, { element: selectElement, selectData: selectData }) : console.warn('invalidMove');
        result ? this.move(this.selector, { element: selectElement, selectData: selectData }) : 0;
        // this.testF(this.selector, { element: selectElement, selectData: selectData });
        this.showPossibleMove(false, this.displayArray.availableMovesArray);
        this.selector = undefined;
      }
    }
    return
  }

  loadAvailableMoves(input: any[], positionIndex: number) {
    for (let i = 0; i < input.length; i++) {
      this.displayArray.availableMovesArray[i] = input[i] + positionIndex;
    }
  }

  showPossibleMove(boo: boolean, inputArray: any[]) {
    for (let i = 0; i < inputArray.length; i++) {
      let tAns: HTMLElement | null = document.getElementById(inputArray[i]);
      if (boo == true) {
        tAns?.setAttribute("style", "background-color : #00FFFF; border: 1px solid blue;");
      } else if (boo == false) {
        tAns?.setAttribute("style", "background-color : #FF0000; border: none;");
      }
    }
  }

  testF(selectElement: any, selectData: any) {
    this.gridBoardInjectHolder.pieceMoveTo(this.selector, { element: selectElement, selectData: selectData });
  }

  testT() {
    let x = setInterval(() => {
    }, 1000)
  }

  async move(from: any, to: any) {
    // const elementArray = document.getElementsByClassName("myBar");
    // const element = document.getElementById(from.element.id);
    const element = await document.getElementById("myBar");
    this.testArray[this.testArray.length] = this.testArray.length
    let progress = 1;

    console.log(from.selectData.key + "to" + to.selectData.key)
    console.log(this.testArray)
    console.log(from)

    let moveCommand = {
      id: from.selectData.key + "to" + to.selectData.key,
      from: from.selectData.key,
      to: to.selectData.key,
      startTime: this.timeLeft,
    }
    console.log(moveCommand)
    this.testArray[this.testArray.length - 1] = moveCommand

    const id = setInterval(frame, 10);
    function frame() {
      if (progress == 100) {
        element! ? element.style.width = 0 + '%' : 0;
        clearInterval(id);
      } else {
        progress++;
        element! ? element.style.width = progress + '%' : 0;
      }
    }
  }


  startTimer() {
    this.interval = setInterval(() => {
      this.pieceActionArray = this.gridBoardInjectHolder.pieceActionArray
      if (this.timeLeft % 10 != 0) {
        let tAns: HTMLElement | null = document.getElementById('timer');
        let ratio = 255;
        let colorHex = (ratio * this.timeLeft).toString(16);
        colorHex = (ratio * this.timeLeft).toString(16);
        tAns?.setAttribute("style", "background-color : #" + colorHex + "; border: 1px solid blue;");
        this.timeLeft++;
      } else {
        this.timeLeft = this.timeLeft + 1;
        console.log(this.pieceActionArray)
      }
      if (this.timeLeft == 1) {
        // this.commandArray.splice(this.commandArray.length-1,1);
      } else {
      }
    }, 10000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  t() {
    let x = '#FF0000';
    let y = '#0000FF';
    let z = '#00FF00';
  }



  // action(fromSelector: any, toSelector: any) {
  //   let isFirendly = fromSelector.selectData.value.owner == toSelector.selectData.value.owne;

  //   if (isFirendly == false) {
  //     //attack 
  //     console.log('isFirendly', isFirendly)
  //     this.gridBoardInjectHolder.gridContainer.gridMap.set(fromSelector.selectData.key.toString(), { pieceValue: 'e', owner: '' });
  //     this.gridBoardInjectHolder.gridContainer.gridMap.set(toSelector.selectData.key.toString(), { pieceValue: fromSelector.selectData.value.pieceValue, owner: fromSelector.selectData.value.owner });
  //     // this.gridArray = this.gridBoardInjectHolder.gridContainer.gridArray
  //     for (const [key, value] of this.gridBoardInjectHolder.gridContainer.gridMap) {
  //       let i = parseInt(key, 10);
  //       this.gridBoardInjectHolder.gridContainer.gridArray[i] = { key: i, value: value };
  //     }
  //   } else if (isFirendly == true) {
  //     console.log("isfriendly", isFirendly)
  //   }
  // }


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

