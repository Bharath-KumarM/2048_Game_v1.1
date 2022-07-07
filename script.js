import Grid from "./src/Grid.js"
import Tile from "./src/Tile.js"

// the gridElement size; default size 4x4
const GRID_SIZE = 4

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
    // Updates the Score Board!
    updateScoreBoard()
})




const pointsAnimation = (pointsCounter) => {
    if (!pointsCounter) return null
    const scorePointsElement = document.getElementsByClassName('score-points')[0]

    const handlePointsAnimatoinEnd = (e) => {
        scorePointsElement.classList.remove('score-points-active')
        scorePointsElement.removeEventListener('webkitAnimationEnd', handlePointsAnimatoinEnd)
        
    }
    scorePointsElement.addEventListener('webkitAnimationEnd', handlePointsAnimatoinEnd)
    scorePointsElement.textContent = '+' + pointsCounter
    scorePointsElement.classList.add('score-points-active')
}

const updateScore = (score) => {
    const scoreElement = document.getElementsByClassName('score-board-score')[0]

    const handlePointsAnimatoinEnd = (e) => {
        scoreElement.classList.remove('score-board-score-active')
        scoreElement.removeEventListener('transitionend', handlePointsAnimatoinEnd)
        
    }
    scoreElement.addEventListener('transitionend', handlePointsAnimatoinEnd)
    scoreElement.classList.add('score-board-score-active')
    scoreElement.textContent = score
}

const restartGrid = () => {
    for (const cell of grid.cells){
        if (cell.tile)
            cell.tile.remove()
    }
    new Tile(grid.chooseInactiveCells)
    new Tile(grid.chooseInactiveCells)
}

let isNight = true

const swapDarkLight = (darkLightBtn) => {
    let bodyElement = document.getElementsByTagName('body')[0]
    
    if (!isNight){
        bodyElement.style.setProperty('--color-prime', 'rgb(201, 198, 198)')
        bodyElement.style.setProperty('--color-base',  'rgb(24, 23, 23)')
        bodyElement.style.setProperty('--color-grid',  'rgb(136, 136, 136)')
        bodyElement.style.setProperty('--color-cell',  'rgba(72, 68, 68, 0.92)')
        darkLightBtn.textContent = '💡'
    }
    else {
        bodyElement.style.setProperty('--color-prime', 'rgb(71, 71, 71)')
        bodyElement.style.setProperty('--color-base', 'rgb(230, 248, 247)')
        bodyElement.style.setProperty('--color-grid', 'rgba(118, 149, 149, 0.833)')
        bodyElement.style.setProperty('--color-cell', 'rgba(203, 220, 223, 0.92)')
        darkLightBtn.textContent = '🌙'
    }
    isNight = !isNight
}
let darkLightBtn = document.getElementsByClassName("dark-light-btn")[0]
darkLightBtn.addEventListener('click', () => swapDarkLight(darkLightBtn))
swapDarkLight(darkLightBtn)

function updateScoreBoard() {
    updateScore(grid.score)
    pointsAnimation(grid.pointsPerMove)
    grid.pointsPerMove = 0
}













