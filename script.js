import Grid from "./src/Grid.js"
import Tile from "./src/Tile.js"
import openOption from "./src/optionScreen.js"
import updateScoreBoard from "./src/scoreBoard.js"


// the gridElement size; default size 4x4
const GRID_SIZE = 4

// The gridElement element reference 
const gridElement = document.getElementById('the-grid')



export let grid 
let savedTileData = localStorage.getItem('tileData')
let gridSize = parseInt(localStorage.getItem('gridSize'))
if (savedTileData){
    grid = new Grid(gridSize, gridElement, savedTileData)
}
else{
    grid = new Grid(GRID_SIZE, gridElement)
    new Tile(grid.chooseInactiveCells)
    new Tile(grid.chooseInactiveCells)
}


document.addEventListener('keydown', (e)=>{
    switch(e.key){
        case 'w':
        case 'W':
        case 'ArrowUp':
            doMove('U')
            break
        case 's':
        case 'S':
        case 'ArrowDown':
            doMove('D')
            break
        case 'a':
        case 'a':
        case 'ArrowLeft':
            doMove('L')
            break
        case 'd':
        case 'D':
        case 'ArrowRight':
            doMove('R')
            break
    }
})

const doMove = async (dir) => {
    grid.moveTiles(dir)
    updateScoreBoard(grid)
} 



const optionBtn = document.getElementsByClassName("option-btn")[0]
optionBtn.addEventListener('click', async () => {
    let chgGridSize = await openOption(grid)
    console.log(chgGridSize)
    if (chgGridSize === 'R') //Restart
        grid = new Grid(grid.gridSize, gridElement)
    else if(chgGridSize)
        localStorage.setItem('gridSize', chgGridSize)
        grid = new Grid(chgGridSize, gridElement)
})




















