export class gridController {
    boardSize = 8;
    gridContainer: any = []

    constructor(sizeX: number, sizeY: number) {
        this.gridContainer = this.getInitializedGrid(sizeX,  sizeY);

    }

    // initialize
    getInitializedGrid( sizeX: number, sizeY: number) {
        let gridArray: any = [] 
        let gridMap = new Map<string, any>();
        for (let i = 0; i < sizeY; i++) {
            for (let j = 0; j < sizeX; j++) {
                // gridMap.set((i * this.boardSize + j).toString(), 'e');
                gridMap.set((i * this.boardSize + j).toString(), { pieceValue: 'e', owner: 'to' });
                gridArray[gridArray.length] = { key: i * this.boardSize + j, value: '', owner: 'to' };
            }
        }
        return { gridMap: gridMap, gridArray: gridArray }
    }

}