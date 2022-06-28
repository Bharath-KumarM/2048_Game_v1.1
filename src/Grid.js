import Tile from "./Tile.js"

const getIters = (gridSize, swipeDir) => {
    let [start, outIter, innerIter] = [null, null, null]
    if (swipeDir === 'U')
        [start, outIter, innerIter] = [0, 1, gridSize]
    if (swipeDir === 'D')
        [start, outIter, innerIter] = [(gridSize**2) - gridSize, 1, gridSize*-1]
    if (swipeDir === 'L')
        [start, outIter, innerIter] = [0, gridSize, 1]
    if (swipeDir === 'R')
        [start, outIter, innerIter] = [gridSize-1, gridSize, -1]
    return [start, outIter, innerIter]
}

export default class Grid {
    constructor(gridSize, gridElement){
        this.gridSize = gridSize
        this.element = gridElement
        this.cells = createCells(this.gridSize)
        this.insertCells()
    }

    insertCells() {
        for (const cell of this.cells){
            this.element.appendChild(cell.cellElement)
        }
    }


    get inactiveCells(){
        const inactiveCells = []
        for (let cell of this.cells){
            if (cell.tile === null) inactiveCells.push(cell)
        }
        return inactiveCells
    }

    get chooseInactiveCells(){
        let inactiveCells = this.inactiveCells
        if (inactiveCells[0] === undefined)
            return null
        else
            return inactiveCells[Math.floor(Math.random()*inactiveCells.length)]
    }

    // This method is 💖 of the game🔥
    moveTiles(swipeDir){

        // Magical Function🗯️ that bring inner & outer iterations increment values
        const [start, outIterIncr, inIterIncr] = getIters(this.gridSize, swipeDir)

        let outIter = start 
        // Outer Iteration📤
        for (let i=0; i<this.gridSize; i++){
            const movedTiles = []
            let inIter = outIter
            // Inner Iteration📩
            for (let j=0; j<this.gridSize; j++){
                if (this.cells[inIter].tile !== null){
                    let value = this.cells[inIter].tile.value
                    if (movedTiles.at(-1) === value)
                        movedTiles[movedTiles.length-1] = value*2
                    else movedTiles.push(value)

                    this.cells[inIter].tile.remove()
                }
                // Increment the inner Iterarion ➕
                inIter += inIterIncr
            }
            // Inner Iteration, moves the tiles in place based on direction
            inIter = outIter
            for (const val of movedTiles){
                new Tile(this.cells[inIter], val)
                inIter += inIterIncr
            }
            // Increment the outer Iterarion ➕
            outIter += outIterIncr
        }
        // Creates a new tile
        const inactiveCell = this.chooseInactiveCells
        if (inactiveCell === null)
            grid.element.remove()
        else 
            new Tile(inactiveCell)
    }

}

class Cell {
    constructor(x,y){
        this.cellElement = document.createElement('div')
        this.cellElement.classList.add('cell')
        this.cellElement.classList.add('mian-cell')

        this.x = x
        this.y = y
        this.tile = null
    }
}

// Pure Function
const createCells = (gridSize) => {
    const cells = []
    for (let x=0; x<gridSize; x++){
        for (let y=0; y<gridSize; y++){
            const cell = new Cell(x,y)
            cells.push(cell)
        }
    }
    return cells

}

