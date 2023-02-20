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

export class ChessPiece {
    name: any
    type: any
    owner: any
    health: any
    status: any
}

export class GridBoard {
    boardSize = 8;
    gridArray: any = []
    whitePlayerPiece: any = []
    blackPlayerPiece: any = []
    pieceOrder = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'];
    pawnPieceOrder = ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'];

    pieceElementSelector: any
    pieceDataSelector: any

    constructor(boardSize: hGrid) {
        let testGrid: hGrid = { sizeX: this.boardSize, sizeY: this.boardSize };
        boardSize!! ? this.gridArray = this.initializeGrid(boardSize) : this.gridArray = this.initializeGrid(testGrid)

        this.whitePlayerPiece = this.initializePiece(2, 8)
        this.placeChessOnGrid(this.whitePlayerPiece, 0, 1);

        this.blackPlayerPiece = this.initializePiece(2, 8).reverse();
        this.placeChessOnGrid(this.blackPlayerPiece, 48, 1);

        this.getHitBoundary(7);
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


    interactBoard(selectElement: any, selectData: any) {
        if (selectElement == this.pieceElementSelector) {
            this.hidePossibleMove(this.getChessMovementVector(selectData.value), selectData.key);
            this.disableSelection(selectElement, selectData);
        }
        else if (this.pieceElementSelector == undefined) {
            this.enableSelection(selectElement, selectData);
            // selectElement.style.backgroundColor = '#FFFFFF';
            // this.pieceElementSelector = selectElement;
            // this.pieceDataSelector = selectData;
            this.showPossibleMove(this.getChessMovementVector(selectData.value), selectData.key);

        }
        else {
            this.hidePossibleMove(this.getChessMovementVector(this.pieceDataSelector.value), this.pieceDataSelector.key);
            this.moveChessPiece(this.gridArray[this.pieceDataSelector.key], this.gridArray[selectData.key]);
            this.disableSelection(selectElement, selectData);
        }
    }
    enableSelection(selectElement: any, selectData: any) {
        this.pieceElementSelector = selectElement;
        this.pieceDataSelector = selectData;
        this.pieceElementSelector.style.backgroundColor = '#FF0000';
    }
    disableSelection(selectElement: any, selectData: any) {
        this.pieceElementSelector.style.backgroundColor = '#FF0000';
        this.pieceElementSelector = undefined;
        this.pieceDataSelector = undefined;
    }


    checkValidMove(pieceType: piece, from: gridBlock) {
        this.getHitBoundary(from.key)
        return true
    }

    checkFriendly() {
    }
    getHitBoundary(originalIndex: number, inputArray?: any[]) {
        let output = {
            leftBorder: 0,
            rightBorder: 0,
            botomtBorder: 0,
            topBorder: 0,
        }
        
        output.leftBorder = originalIndex % 8 == 0 ? 0 : originalIndex % 8;
        output.rightBorder = originalIndex % 7 == 0 ? 0 : originalIndex % 8;
        output.botomtBorder = this.boardSize*this.boardSize > originalIndex && originalIndex < (this.boardSize*this.boardSize)-this.boardSize ? 1 : 0;
        output.topBorder = -1 < originalIndex && originalIndex < this.boardSize ? 0 : 1;

        return output;
    }
    checkSpecialMoves() {
    }


    showPossibleMove(inputArray: any[], origionIndex: number) {
        for (let i = 0; i < inputArray.length; i++) {
            let tAns = document.getElementById(inputArray[i] + origionIndex);
            tAns!! ? console.log(tAns.style.backgroundColor = '#00FF00') : 0
        }
        return inputArray
    }
    hidePossibleMove(inputArray: any[], origionIndex: number) {
        for (let i = 0; i < inputArray.length; i++) {
            let tAns = document.getElementById(inputArray[i] + origionIndex);
            tAns!! ? console.log(tAns.style.backgroundColor = '#FF0000') : 0
        }
        return inputArray
    }
    moveChessPiece(from: any, to: any) {
        if (this.checkValidMove({ key: '', type: 'q', owner: 'white' }, { key: 0, value: '' })) {
            [this.gridArray[to.key].value, this.gridArray[from.key].value] = [this.gridArray[from.key].value, this.gridArray[to.key].value];
        }
    }
 


    // 
    getChessMovementVector(pieceType: piece) {
        var outputArr: number[] = new Array()

        switch (pieceType.toString()) {
            case 'k':
                outputArr = this.simSort(outputArr.concat(
                    this.forward(2),
                    this.back(2),
                    this.left(2),
                    this.right(2),
                    this.diagnalForwardRight(2),
                    this.diagnalForwardLeft(2),
                    this.diagnalBackdRight(2),
                    this.diagnalBackLeft(2)))
                break;
            case 'q':
                outputArr = this.simSort(outputArr.concat(
                    this.forward(8),
                    this.back(8),
                    this.left(8),
                    this.right(8),
                    this.diagnalForwardRight(8),
                    this.diagnalForwardLeft(8),
                    this.diagnalBackdRight(8),
                    this.diagnalBackLeft(8)))
                break;
            // statement 2
            case 'r':
                outputArr = this.simSort(outputArr.concat(
                    this.forward(8),
                    this.back(8),
                    this.left(8),
                    this.right(8)))
                break;
                // statement N
                break;
            case 'b':
                outputArr = this.simSort(outputArr.concat(
                    this.diagnalForwardRight(8),
                    this.diagnalForwardLeft(8),
                    this.diagnalBackdRight(8),
                    this.diagnalBackLeft(8)))
                // statement N
                break;
            case 'n':
                outputArr = this.knight(8)
                break;
            case 'p':
                outputArr = this.simSort(outputArr.concat(
                    this.diagnalForwardRight(2),
                    this.diagnalForwardLeft(2),
                    this.forward(2)))
                break;
            default:
                // 
                break;
        }
        return outputArr;
    }

    forward(inputlength: number) {
        var outputArr: number[] = new Array(inputlength)
        for (let i = 0; i < inputlength; i++) {
            outputArr[i] = i * this.boardSize;
        }
        return outputArr
    }
    back(inputlength: number) {
        var outputArr: number[] = new Array(inputlength)
        for (let i = 0; i < inputlength; i++) {
            outputArr[i] = -i * this.boardSize;
        }
        return outputArr
    }
    left(inputlength: number) {
        var outputArr: number[] = new Array(inputlength)
        for (let i = 0; i < inputlength; i++) {
            outputArr[i] = -i;
        }
        return outputArr
    }
    right(inputlength: number) {
        var outputArr: number[] = new Array(inputlength)
        for (let i = 0; i < inputlength; i++) {
            outputArr[i] = i;
        }
        return outputArr
    }
    diagnalForwardRight(inputlength: number) {
        var outputArr: number[] = new Array(inputlength)
        for (let i = 0; i < inputlength; i++) {
            outputArr[i] = i * this.boardSize + i;
        }
        return outputArr
    }
    diagnalForwardLeft(inputlength: number) {
        var outputArr: number[] = new Array(inputlength)
        for (let i = 0; i < inputlength; i++) {
            outputArr[i] = i * this.boardSize - i;
        }
        return outputArr
    }
    diagnalBackdRight(inputlength: number) {
        var outputArr: number[] = new Array(inputlength)
        for (let i = 0; i < inputlength; i++) {
            outputArr[i] = -i * this.boardSize + i;
        }
        return outputArr
    }
    diagnalBackLeft(inputlength: number) {
        var outputArr: number[] = new Array(inputlength)
        for (let i = 0; i < inputlength; i++) {
        }
        return outputArr
    }
    knight(inputlength: number) {
        var outputArr: number[] = new Array(inputlength)
        for (let i = 1; i < 2; i++) {
            console.log(i)
            // left forward
            outputArr[0] = i * this.boardSize + (i + 1);
            outputArr[1] = (i + 1) * this.boardSize + i;
            // right backward
            outputArr[2] = -i * this.boardSize + (-i - 1);
            outputArr[3] = (-i - 1) * this.boardSize - i;
            // left forward
            outputArr[4] = i * this.boardSize - i - 1;
            outputArr[5] = (i + 1) * this.boardSize - i;
            // right forward
            outputArr[6] = -i * this.boardSize - (-i - 1);
            outputArr[7] = (-i - 1) * this.boardSize + i;
        }
        return outputArr;
    }
    // 
    
    simSort(input: any[]) {
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input.length; j++) {
                input[i] > input[j] ? [input[i], input[j]] = [input[j], input[i]] : false
            }
        }
        return input
    }
    deleteduplicate(input: any[]) {
        for (let i = 0; i < input.length; i++) {
            input[i] == input[i + 1] ? input.splice(i, 1) : 0
        }
        return input
    }
}