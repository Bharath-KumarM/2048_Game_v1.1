import Grid from "./src/Grid.js"
import openOption from "./src/optionScreen.js"


// the gridElement size; default size 4x4
const GRID_SIZE = 4

// The gridElement element reference 
const gridElement = document.getElementById('the-grid')



export let grid = new Grid(GRID_SIZE, gridElement)

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



const optionBtn = document.getElementsByClassName("option-btn")[0]
optionBtn.addEventListener('click', async () => {
    let chgGridSize = await openOption(grid)
    console.log(chgGridSize)
    if (chgGridSize === 'R') //Restart
        grid = new Grid(grid.gridSize, gridElement)
    else if(chgGridSize)
        grid = new Grid(chgGridSize, gridElement)
})




















