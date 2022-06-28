import Grid from "./Grid.js"
import Tile from "./Tile.js"

// the gridElement size; default size 4x4
const GRID_SIZE = 5



// The gridElement element reference 
const gridElement = document.getElementById('the-grid')
gridElement.style.setProperty('--grid-size', GRID_SIZE)

// Grid Created
let grid = new Grid(GRID_SIZE, gridElement)

// Randomly choose one cell and create a tile
new Tile(grid.chooseInactiveCells)
new Tile(grid.chooseInactiveCells)



document.addEventListener('keydown', (e)=>{
    switch(e.key){
        case 'w':
        case 'W':
        case 'ArrowUp':
            grid.moveTiles('U')
            break
        case 's':
        case 'S':
        case 'ArrowDown':
            grid.moveTiles('D')
            break
        case 'a':
        case 'a':
        case 'ArrowLeft':
            grid.moveTiles('L')
            break
        case 'd':
        case 'D':
        case 'ArrowRight':
            grid.moveTiles('R')
            break
    }

})









