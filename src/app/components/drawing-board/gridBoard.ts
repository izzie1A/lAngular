export class GridMap {
    boardSize = 8;
    gridContainer: any = []
    gridMap: any = []
    gridArray: any = []

    playerArray: any
    whitePlayerPiece: any = []
    blackPlayerPiece: any = []
    chessPieceOrderArray = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'];

    pieceElementSelector: any
    pieceDataSelector: any

    constructor(boardSize: hGrid) {
        this.gridMap = new Map<string, any[]>();
        this.playerArray = new Map<string, any[]>();

        let testGrid: hGrid = { sizeX: this.boardSize, sizeY: this.boardSize };
        boardSize!! ? this.gridContainer = this.initializeGrid(boardSize) : this.gridContainer = this.initializeGrid(testGrid)

        this.placeChessOnGrid(this.chessPieceOrderArray, this.gridContainer.gridMap, 0, 1)
        this.placeChessOnGrid(this.chessPieceOrderArray.reverse(), this.gridContainer.gridMap, 48, 1)


        
        let y = new King('me');
        y.getAvailableMoves()
        console.log(y.movement);
        console.log(y.getAvailableMoves());
        let yArray =y.getAvailableMovesIndex(8,60);
        console.log(yArray);
        
        // do later
        let x = this.select('2')

        // testPrinting
        this.tPrintGrid();

    }

    initializeGrid(testGrid: hGrid) {
        let gridArray: any = []
        let gridMap = new Map<string, any[]>();
        for (let i = 0; i < testGrid.sizeY; i++) {
            for (let j = 0; j < testGrid.sizeX; j++) {
                gridMap.set((i * this.boardSize + j).toString(), ['e']);
                gridArray[gridArray.length] = { key: i * this.boardSize + j, value: '' };
            }
        }
        return { gridMap: gridMap, gridArray: gridArray }
    }
    placeChessOnGrid(targetChessArray: string[], targetGrid: any, from: any, direction: number) {
        for (let i = 0; i < targetChessArray.length; i = i + 1) {
            targetGrid.set((i + (from * direction)).toString(), [targetChessArray[i]]);
        }
        return targetGrid
    }

    select(key: string) {
        return this.gridContainer.gridMap.get(key);
    }

    getPossiableove() {
    }

    validateMove() {
    }

    move() {
    }

    tPrintGrid() {
        let printSring: string = '';
        let i = 0;
        for (const [key, value] of this.gridContainer.gridMap) {
            if (i == 7) {
                printSring = printSring.concat(value)
                console.log(printSring)
                printSring = ''
                i = 0
            } else {
                printSring = printSring.concat(value)
                i++
            }
        }
    }
}


interface hGrid {
    sizeX: number
    sizeY: number
}
interface gridBlock {
    key: any
    value: any
}

interface Piece {
    name: any
    type: any
    owner?: any
}
interface rtChessPiece {
    name: any
    type: string
    owner?: any
    health?: any
    status?: any
    movement: any
}

export class ChessPiece implements rtChessPiece {
    name: any;
    type: any;
    owner = 'none';
    maxMovementLength: number = 8;
    health?: any;
    status?: any;
    movement: any = {
        forward: 0,
        back: 0,
        left: 0,
        right: 0,
        diagnalForwardRight: 0,
        diagnalForwardLeft: 0,
        diagnalBackdRight: 0,
        diagnalBackLeft: 0,
    }

    constructor(owner: string) {
        this.name = 'defaultName';
        this.type = 'defaultType';
        this.owner = owner;
        this.initializeMovement();
        // this.getAvailableMoves();
    }
    getMovement() {
        return this.movement
    }

    initializeMovement() {
        this.movement = {
            forward: 0,
            back: 0,
            left: 0,
            right: 0,
            diagnalForwardRight: 0,
            diagnalForwardLeft: 0,
            diagnalBackdRight: 0,
            diagnalBackLeft: 0,
        }
    }

    getAvailableMoves() {
        var outputArr: number[] = new Array()
        // forward
        for (let i = 0; i < this.movement.forward; i++) {
            outputArr.push((i + 1) * this.maxMovementLength);
        }
        // back
        for (let i = 0; i < this.movement.back; i++) {
            outputArr.push((i + 1) * this.maxMovementLength * (-1));
        }
        // left
        for (let i = 0; i < this.movement.left; i++) {
            outputArr.push(-(i + 1));
        }
        // right
        for (let i = 0; i < this.movement.right; i++) {
            outputArr.push((i + 1));
        }
        // diagnalForwardRight
        for (let i = 0; i < this.movement.diagnalForwardRight; i++) {
            outputArr.push(((i + 1) * this.maxMovementLength) + (i + 1));
        }
        // diagnalForwardLeft
        for (let i = 0; i < this.movement.diagnalForwardLeft; i++) {
            outputArr.push(((i + 1) * this.maxMovementLength) - (i + 1));
        }
        // diagnalBackdRight
        for (let i = 0; i < this.movement.diagnalBackdRight; i++) {
            outputArr.push((-(i + 1) * this.maxMovementLength) + (i + 1));
        }
        // diagnalBackLeft
        for (let i = 0; i < this.movement.diagnalBackLeft; i++) {
            outputArr.push((-(i + 1) * this.maxMovementLength) - (i + 1));
        }
        return outputArr
    }

    getAvailableMovesIndex(gridLength:number,position:number){
        console.log(position)
        console.log(gridLength)
        console.log('left')
        console.log(position%gridLength == 0 ? true: false)
        console.log('right')
        console.log(position%(gridLength-1) == 0 ? true: false)
        console.log('top')
        console.log(0<position && position<gridLength  ? true: false)
        console.log('down')
        console.log(((gridLength*gridLength)-gridLength)<position && position<(gridLength*gridLength)  ? true: false)

    }

}
export class Pawn extends ChessPiece {
    firstMove: boolean = true;
    reachBottom: boolean;
    attackable: boolean;

    constructor(owner: string) {
        super(owner);
        this.name = 'pawn';
        this.type = 'p';
        this.firstMove = true
        this.reachBottom = false
        this.attackable = false
        console.log(this.firstMove)
        
        // let x = this.getAvailableMoves();
        // console.log(x)
    }

    override initializeMovement() {
        this.movement.forward = 1
        this.isSpecialMoveAvailable();
    }

    isSpecialMoveAvailable(inputGridMap?: Map<string, any[]>, position?: number) {
        this.firstMove ? console.log('mewo') : 0;
        this.firstMove ? this.movement.forward = 2 : this.movement.forward = 1;
        console.log(this.movement.forward)
        this.reachBottom ? this.henChin() : 0;
        if (this.attackable!!) {
            this.movement.diagnalForwardRight = 1
            this.movement.diagnalForwardLeft = 1
        }
    }

    henChin() {
        console.log("Engaging henChin");
    }

}


// mass

export class King extends ChessPiece {
    rookSwapAvailable = false;
    checkmate = false;

    override initializeMovement() {
        this.movement.forward = 1
        this.movement.back = 1
        this.movement.left = 1
        this.movement.right = 1
        this.movement.diagnalForwardRight = 1
        this.movement.diagnalForwardLeft = 1
        this.movement.diagnalBackdRight = 1
        this.movement.diagnalBackLeft = 1
    }


}


export class Queen extends ChessPiece {
    rookSwapAvailable = false;
    checkmate = false;

    override initializeMovement() {
        this.movement.forward = this.maxMovementLength
        this.movement.back = this.maxMovementLength
        this.movement.left = this.maxMovementLength
        this.movement.right = this.maxMovementLength
        this.movement.diagnalForwardRight = this.maxMovementLength
        this.movement.diagnalForwardLeft = this.maxMovementLength
        this.movement.diagnalBackdRight = this.maxMovementLength
        this.movement.diagnalBackLeft = this.maxMovementLength
    }

}

export class Biship extends ChessPiece {
    rookSwapAvailable = false;
    checkmate = false;

    override initializeMovement() {
        this.movement.diagnalForwardRight = this.maxMovementLength
        this.movement.diagnalForwardLeft = this.maxMovementLength
        this.movement.diagnalBackdRight = this.maxMovementLength
        this.movement.diagnalBackLeft = this.maxMovementLength
    }

}
export class Knight extends ChessPiece {
    rookSwapAvailable = false;
    checkmate = false;

    setMovement() {
        var outputArr: number[] = new Array()
        for (let i = 1; i < 2; i++) {
            console.log(i)
            // left forward
            outputArr[0] = i * this.maxMovementLength + (i + 1);
            outputArr[1] = (i + 1) * this.maxMovementLength + i;
            // right backward
            outputArr[2] = -i * this.maxMovementLength + (-i - 1);
            outputArr[3] = (-i - 1) * this.maxMovementLength - i;
            // left backward
            outputArr[4] = i * this.maxMovementLength - i - 1;
            outputArr[5] = (i + 1) * this.maxMovementLength - i;
            // right backward
            outputArr[6] = -i * this.maxMovementLength - (-i - 1);
            outputArr[7] = (-i - 1) * this.maxMovementLength + i;
        }
        return outputArr;
    }

}
export class Rook extends ChessPiece {
    rookSwapAvailable = false;
    checkmate = false;

    override initializeMovement() {
        this.movement.forward = this.maxMovementLength
        this.movement.back = this.maxMovementLength
        this.movement.left = this.maxMovementLength
        this.movement.right = this.maxMovementLength
    }

}
