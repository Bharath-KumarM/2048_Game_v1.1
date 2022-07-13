import { grid } from "../script.js"
import updateScoreBoard from "./scoreBoard.js"
import Tile from "./Tile.js"
import {openWinLoseScrn} from "./winLoseScreen.js"



const getIters = (gridSize, swipeDir) => {
    let [start, fieldIncr, cellIncr] = [null, null, null]
    if (swipeDir === 'U')
        [start, fieldIncr, cellIncr] = [0, 1, gridSize]
    if (swipeDir === 'D')
        [start, fieldIncr, cellIncr] = [(gridSize**2) - gridSize, 1, gridSize*-1]
    if (swipeDir === 'L')
        [start, fieldIncr, cellIncr] = [0, gridSize, 1]
    if (swipeDir === 'R')
        [start, fieldIncr, cellIncr] = [gridSize-1, gridSize, -1]
    return [start, fieldIncr, cellIncr]
}

const getAnimatXY = (swipeDir, moveCount) => {
    let [X, Y] = [0, 0]
    if (swipeDir === 'L')
        X = moveCount * -1
    else if(swipeDir === 'R') 
        X = moveCount
    else if(swipeDir === 'U')
        Y = moveCount*-1
    else 
        Y = moveCount 
    return [X,Y]
}

export default class Grid {
    constructor(gridSize, gridElement, savedGameData){
        gridElement.style.setProperty('--grid-size', gridSize)
        this.gridSize = gridSize
        this.element = gridElement
        this.score = 0
        this.cells = createCells(this.gridSize)
        this.insertCells()
        this.isAnimateEnd = true
        this.pointsPerMove = 0
        this.isPoint2048 = false
        this.savedGameData = savedGameData
        processSaveData(this, savedGameData)
    }


    insertCells() {
        // remove exiting cells, comes effective when grid size changes
        while (this.element.hasChildNodes()) {
            this.element.removeChild(this.element.firstChild);
          }
        for (const cell of this.cells){
            this.element.appendChild(cell.cellElement)
        }
        if (this.savedGameData)//check it is main or HTP grid
            new Tile(this.chooseInactiveCells)
        new Tile(this.chooseInactiveCells)
    }

    get chooseInactiveCells(){
        const inactiveCells = []
        for (let cell of this.cells)
            if (cell.tile === null) inactiveCells.push(cell)

        if (inactiveCells[0] === undefined)
            return null
        else
            return inactiveCells[Math.floor(Math.random()*inactiveCells.length)]
    }

    // This method is 💖 of the game🔥
    async moveTiles(swipeDir) {
        if (!this.isAnimateEnd){
            // Since the past move animation doesn't end yet!🐌
            return new Promise((res, rej) => res())
        }

        this.isAnimateEnd = false

        const [start, fieldIncr, cellIncr] = getIters(this.gridSize, swipeDir)

        // get moved tiles data & count
        let cellIndex = start 
        let [moveTilesData, moveStepsData, pointsCounter] = [[], [], 0]
        for (let i=0; i<this.gridSize; i++){

            let [movedTiles, moveCounts, pointsCount] = this.getMovedTilesData(cellIndex, cellIncr)
            moveTilesData.push(movedTiles)
            moveStepsData.push(moveCounts)
            pointsCounter += pointsCount
            cellIndex += fieldIncr
        }

        if (pointsCounter > 0) {
            this.pointsPerMove = pointsCounter
            this.score += pointsCounter
        }
        else {
            this.pointsPerMove = 0
        }
        // Sliding Animations before deleting the tile!
        await this.doSlidingTransform(start, swipeDir, moveStepsData, cellIncr, fieldIncr);

        this.deleteCurrentTiles()
        await this.createNewTiles(start, moveTilesData, cellIncr, fieldIncr)

        this.isAnimateEnd = true

        if (this.savedGameData) {
            // Save the game progress💾
            saveLocally(this)

            // Check for Win
            if (this.isPoint2048) {
                this.isPoint2048 = false
                await openWinLoseScrn('win')
                clearTiles(this.cells)
                new Tile(this.chooseInactiveCells)
                new Tile(this.chooseInactiveCells)
            }
        }
    }


    async doSlidingTransform(cellIndex, swipeDir, moveStepsData, cellIncr, fieldIncr) {

        let animateCount = 0
        let promiseResolved 
        const animatePromise = new Promise((res, rej) => {
            promiseResolved = res
        })
        
        const handleSlideAnimatoinEnd = (e) => {
            animateCount--
            e.srcElement.removeEventListener('webkitAnimationEnd', handleSlideAnimatoinEnd)
            if (animateCount === 0){
                promiseResolved()
            }
        }


        for (let i = 0; i < this.gridSize; i++) {
            let cellIndex2 = cellIndex;
            for (let j = 0; j < this.gridSize; j++) {
                let tile = this.cells[cellIndex2].tile

                if (tile) {
                    let [X, Y] = getAnimatXY(swipeDir, moveStepsData[i][j]);
                    if (X !== 0)
                        tile.element.style.setProperty('--tile-moveX', X);
                    if (Y !== 0)
                        tile.element.style.setProperty('--tile-moveY', Y);
                    if (X !== 0 || Y !== 0){
                        tile.element.addEventListener('webkitAnimationEnd', handleSlideAnimatoinEnd)
                        tile.element.classList.add('tile-move');
                        animateCount++
                    }
                }
                cellIndex2 += cellIncr;
            }
            cellIndex += fieldIncr;
        }
        if (animateCount === 0) promiseResolved()
        return animatePromise
        
    }

    async createNewTiles(cellIndex, moveTilesData, cellIncr, fieldIncr) {
        let animationEndPromises = []

        for (let i = 0; i < this.gridSize; i++) {
            let index = cellIndex;
            for (const data of moveTilesData[i]) {
                let tilePromise
                if (data.isColapse){
                    tilePromise = new Tile(this.cells[index], data.value, 'C')
                }
                else
                tilePromise = new Tile(this.cells[index], data.value)

                index += cellIncr;
                animationEndPromises.push(tilePromise)
            }
            cellIndex += fieldIncr;
        }

        // Creates a new tile
        this.spawnNewTile()
        return Promise.all(animationEndPromises)
    }

    deleteCurrentTiles() {
        for (let i = 0; i < this.gridSize ** 2; i++) {
            if (this.cells[i].tile) {
                this.cells[i].tile.element.classList.remove('tile-move');
                this.cells[i].tile.remove();
            }
        }
    }

    async spawnNewTile () {
        const inactiveCell = this.chooseInactiveCells
        if (inactiveCell !== null)
            new Tile(inactiveCell)
        else{
            // no space for a new tile
            if (!isNextMovePossible(this.cells, this.gridSize)){
                await openWinLoseScrn('lose')
                clearTiles(this.cells)
                new Tile(this.chooseInactiveCells)
                new Tile(this.chooseInactiveCells)
            }
        }
    }


    getMovedTilesData(cellIndex, cellIncr) {
        let [movedTiles, moveCounts, moveCount] = [[], [], 0]
        let pointsCounter = 0


        for (let j = 0; j < this.gridSize; j++) {
            if (this.cells[cellIndex].tile  ) {
                let value = this.cells[cellIndex].tile.value

                if (movedTiles.at(-1) !== undefined
                            && !movedTiles.at(-1).isColapse 
                            && movedTiles.at(-1).value === value){
                    movedTiles[movedTiles.length - 1] = {
                        value: value * 2,
                        isColapse: true
                    }
                    moveCount++
                    moveCounts.push(moveCount)
                    pointsCounter += (value * 2)
                    // Checks for win
                    if (value * 2 === 32) this.isPoint2048 = true
                }
                else {
                    moveCounts.push(moveCount)
                    movedTiles.push({
                        value: value,
                        isColapse: false
                    })
                }
            }
            else {
                moveCounts.push(0)
                moveCount++
            }
            cellIndex += cellIncr
        }
        
        return [movedTiles, moveCounts, pointsCounter]
    }

}





class Cell {
    constructor(x , y){
        this.cellElement = document.createElement('div')
        this.cellElement.classList.add('cell')
        
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


const saveLocally = (grid) => {
    let tileData = []
    for (let i=0; i<grid.cells.length; i++){
        let cell = grid.cells[i]
        if (cell.tile){
            tileData.push([i, cell.tile.value])
        }
    }
    localStorage.setItem('tileData', JSON.stringify(tileData))
    localStorage.setItem('score', grid.score)
    localStorage.setItem('gridSize', grid.gridSize)
    updateScoreBoard(grid)
}

const clearTiles = (cells) => {
    for (const cell of cells){
        if (cell.tile !== null) {
            cell.tile.remove()
        }
    }
}

const processSaveData = (grid, savedTileData) => {
    if (!savedTileData) {

        return
    }
    if (savedTileData === 'new'){
        saveLocally(grid)
        return
    }

    clearTiles(grid.cells)
    const tileData = JSON.parse(savedTileData)
    
    for (const data of tileData){
        const [cellIndex, tileVal] = data
        new Tile(grid.cells[cellIndex], tileVal)
    }
    grid.score = parseInt(localStorage.getItem('score'))
    updateScoreBoard(grid)
}

const isNextMovePossible = (cells, gridSize) => {
    let tileVal = []
    let size = gridSize
    for (let cell of cells){
        if (cell.tile) tileVal.push(cell.tile.value)
    }
    for (let i=0; i<tileVal.length; i++){
        if (tileVal[i+size] === tileVal[i] || tileVal[i-size] === tileVal[i]){
            return true
        }
        if ((i+1)%gridSize != 0 && tileVal[i+1] === tileVal[i]){
            return true
        }
        if ((i+1)%gridSize != 1 && tileVal[i-1] === tileVal[i]){
            return true
        }
    }
    return false
}





