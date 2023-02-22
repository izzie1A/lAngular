import { fromEventPattern } from "rxjs";

export class GridMap {
    boardSize = 8;
    gridContainer: any = []
    gridMap: any = []
    gridArray: any = []

    playerArray: any
    whitePlayerPiece: any = []
    blackPlayerPiece: any = []
    chessPieceOrderArray = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'];

    selector: any | undefined = undefined;
    pieceActionArray:any[] = [];
    // pieceElementSelector: any
    // pieceDataSelector: any


    constructor(boardSize: hGrid) {
        this.gridMap = new Map<string, any[]>();
        this.playerArray = new Map<string, any[]>();

        let testGrid: hGrid = { sizeX: this.boardSize, sizeY: this.boardSize };
        boardSize!! ? this.gridContainer = this.initializeGrid(boardSize) : this.gridContainer = this.initializeGrid(testGrid)

        this.whitePlayerPiece = this.placeChessOnGrid(this.chessPieceOrderArray, this.gridContainer.gridMap, 0, 1, 'black')
        this.blackPlayerPiece = this.placeChessOnGrid(this.chessPieceOrderArray.reverse(), this.gridContainer.gridMap, 48, 1, 'white')

        this.tPrintGrid();
    }

    // initialize
    initializeGrid(testGrid: hGrid) {
        let gridArray: any = []
        let gridMap = new Map<string, any>();
        for (let i = 0; i < testGrid.sizeY; i++) {
            for (let j = 0; j < testGrid.sizeX; j++) {
                // gridMap.set((i * this.boardSize + j).toString(), 'e');
                gridMap.set((i * this.boardSize + j).toString(), { pieceValue: 'e', owner: 'to' });
                gridArray[gridArray.length] = { key: i * this.boardSize + j, value: '', owner: 'to' };
            }
        }
        this.gridMap = gridMap;
        this.gridArray = gridArray;
        return { gridMap: gridMap, gridArray: gridArray }
    }
    getMapToArray(ipnutMap: Map<string, any[]>, inputArray: any[]) {
        let outputArray = inputArray;
        for (const [key, value] of ipnutMap) {
            let i = parseInt(key, 10);
            outputArray[i] = { key: i, value: value };
        }
        return outputArray
    }

    placeChessOnGrid(targetChessArray: string[], targetGrid: any, from: any, direction: number, owner?: string) {
        for (let i = 0; i < targetChessArray.length; i = i + 1) {
            // targetGrid.set((i + (from * direction)).toString(), [targetChessArray[i]]);
            targetGrid.set((i + (from * direction)).toString(), { pieceValue: targetChessArray[i], owner: owner });
        }
        return targetGrid
    }


    // control

    action(fromSelector: any, toSelector: any) {
        let holder = fromSelector;
        let isFirendly = this.isFriendly(fromSelector, toSelector);

        if (isFirendly == false) {
            //attack 
            console.log('attack', )
            this.gridContainer.gridMap.set(fromSelector.selectData.key.toString(), { pieceValue: 'e', owner: '' });
            this.gridContainer.gridMap.set(toSelector.selectData.key.toString(), { pieceValue: holder.selectData.value.pieceValue, owner: holder.selectData.value.owner });
        } else if (isFirendly == true) {
        }
    }

    isFriendly(fromSelector: any, toSelector: any) {
        return fromSelector.selectData.value.owner == toSelector.selectData.value.owner;
    }

    getPieceMoves(inputString: string, pieceData: any) {
        let trssformer: any = 0;
        switch (inputString) {
            case 'k':
                trssformer = new King();
                break;
            case 'q':
                trssformer = new Queen();
                break;
            case 'b':
                trssformer = new Biship();
                break;
            case 'n':
                trssformer = new Knight();
                break;
            case 'r':
                trssformer = new Rook();
                break;
            case 'p':
                trssformer = new Pawn();
                break;
            default:
                console.warn('unfound piece type');
                break;
        }
        trssformer.setMaxMovesLimit(this.boardSize, pieceData.key);
        let x = trssformer.getAvailableMoves();
        // temp bPlayerFlip flip
        if (pieceData.value.owner == 'white' && inputString == 'p') {
            for (let i = 0; i < x.length; i++) {
                x[i] = -x[i];
            }
        }

        return x;
    }

    // valid control
    checkValidMove(fromSelector: any, toSelector: any) {
        let attackable = fromSelector.selectData.value.owner != toSelector.selectData.value.owner;
        let ValiMoveArray = this.getPieceMoves(fromSelector.selectData.value.pieceValue, fromSelector.selectData)
        // this.gridContainer.gridMap.get(fromSelector.selectData.key.toString());

        let inRange = false;
        for( let loopItem of ValiMoveArray){
            // console.log(loopItem+fromSelector.selectData.key == toSelector.selectData.key);
            // console.log('loopItem+',);
            // console.log('loopItem',loopItem,'key',toSelector.selectData.key);
            if(loopItem+fromSelector.selectData.key == toSelector.selectData.key){
                inRange = true
                break;
            }
        }
        
        // console.log('inRange',inRange,'attackable',attackable);
        inRange!! && attackable!! ? this.pieceMoveTo(fromSelector,toSelector, attackable):console.warn('invalidMove');
        return inRange ? attackable : inRange
    }

    pieceMoveTo(fromSelector: any, toSelector: any, isValid:boolean){
            // change map&array
            this.gridContainer.gridMap.set(fromSelector.selectData.key.toString(), { pieceValue: 'e', owner: '' });
            this.gridContainer.gridMap.set(toSelector.selectData.key.toString(), { pieceValue: fromSelector.selectData.value.pieceValue, owner: fromSelector.selectData.value.owner });
            for (const [key, value] of this.gridContainer.gridMap) {
                let i = parseInt(key, 10);
                this.gridContainer.gridArray[i] = { key: i, value: value };
            }
            this.pieceActionQuery({fromSelector:fromSelector,toSelector:toSelector})
    }

    pieceActionQuery(input:any){
        this.pieceActionArray[this.pieceActionArray.length]=input;
        console.log(this.pieceActionArray)
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

    constructor() {
        this.name = 'defaultName';
        this.type = 'defaultType';
        this.initializeMovement();
        // this.getAvailableMoves();
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

    getAvailableMoves(gridLength: number, position: number) {
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

    get2DCoordinate(gridLength: number, position: number) {
        return { x: (position % gridLength), y: Math.floor((position / gridLength)) }
    }
    setMaxMovesLimit(gridLength: number, position: number) {
        let limit = this.get2DCoordinate(gridLength, position);
        // console.warn(limit)

        let forwardLimit = (gridLength - limit.y - 1);
        let backLimit = (limit.y);
        let rightLimit = (gridLength - limit.x - 1);
        let leftLimit = (limit.x);
        // console.warn(
        //     'forwardLimit', forwardLimit,
        //     'backLimit', backLimit,
        //     'rightLimit', leftLimit,
        //     'leftLimit', rightLimit,
        // )

        this.movement.forward > forwardLimit ? this.movement.forward = forwardLimit : 0
        this.movement.back > backLimit ? this.movement.back = backLimit : 0;

        this.movement.left > rightLimit ? this.movement.left = leftLimit : 0;
        this.movement.right > leftLimit ? this.movement.right = rightLimit : 0;

        this.movement.diagnalForwardRight > forwardLimit ? this.movement.diagnalForwardRight = forwardLimit : 0;
        this.movement.diagnalForwardRight > rightLimit ? this.movement.diagnalForwardRight = rightLimit : 0;

        this.movement.diagnalForwardLeft > forwardLimit ? this.movement.diagnalForwardLeft = forwardLimit : 0;
        this.movement.diagnalForwardLeft > leftLimit ? this.movement.diagnalForwardLeft = leftLimit : 0;

        this.movement.diagnalBackdRight > backLimit ? this.movement.diagnalBackdRight = backLimit : 0;
        this.movement.diagnalBackdRight > rightLimit ? this.movement.diagnalBackdRight = rightLimit : 0;

        this.movement.diagnalBackLeft > backLimit ? this.movement.diagnalBackLeft = backLimit : 0;
        this.movement.diagnalBackLeft > leftLimit ? this.movement.diagnalBackLeft = leftLimit : 0;
        // let x = this.getAvailableMoves();

    }

}
export class Pawn extends ChessPiece {
    firstMove: boolean = true;
    reachBottom: boolean;
    attackable: boolean;

    constructor() {
        super();
        this.name = 'pawn';
        this.type = 'p';
        this.firstMove = true
        this.reachBottom = false
        this.attackable = false
    }

    override initializeMovement() {
        this.movement.forward = 1
        this.isSpecialMoveAvailable();
    }

    isSpecialMoveAvailable(inputGridMap?: Map<string, any[]>, position?: number) {
        this.firstMove ? console.log('mewo') : 0;
        this.firstMove ? this.movement.forward = 2 : this.movement.forward = 1;
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

export class Knight extends ChessPiece {
    rookSwapAvailable = false;
    checkmate = false;

    setMovement() {
        var outputArr: number[] = new Array()
        for (let i = 1; i < 2; i++) {
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