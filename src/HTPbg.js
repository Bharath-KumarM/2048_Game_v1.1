import Grid from "./Grid.js"
import Tile from "./Tile.js"

var stopMoves = true
const openHTPbg = () => {
    mainPage.insertBefore(popScreenBG, mainPage.firstChild)
    mainPage.insertBefore(HTPbg, mainPage.firstChild)
    stopMoves = false
    // animateMoves()
    // loopMoves()
}

const closeHTPbg = () => {
    // Listens to animation ends 
    popScreen.addEventListener('webkitAnimationEnd', handleCloseAnimationEnd)

    //Starts the sliding animation
    popScreen.classList.add('pop-screen-close')
    popScreenBG.classList.add('pop-screen-bg-close')
}

// the gridElement size; default size 4x4
const GRID_SIZE = 3
// The gridElement element reference 
let grid = createGrid()
const { popScreenBG, popScreen, HTPbg,
    mainPage, HTPopenBtn, keyArrowChild, HTPcloseBtn } = getAllElements()

HTPbg.remove()
popScreenBG.remove()

HTPopenBtn.addEventListener('click', openHTPbg)
HTPcloseBtn.addEventListener('click', closeHTPbg)


// 📝 All Function and Methods
function createGrid() {
    const gridElement = document.getElementById('HTP-grid')
    gridElement.style.setProperty('--grid-size', GRID_SIZE)

    // Grid Created
    let grid = new Grid(GRID_SIZE, gridElement)

    // Randomly choose one cell and create a tile
    new Tile(grid.chooseInactiveCells)
    new Tile(grid.chooseInactiveCells)
    return grid
}

const timeOut = (resolve, time) => setTimeout(resolve, time)
function delay(time) {
    return new Promise((resolve) => timeOut(resolve, time))
}

//How-To-Play key press pattern
const arrowDirIndx = {
    'U': 0,
    'L': 1,
    'D': 2,
    'R': 3
}
const loopMoves = async () => {
    let count = 0
    let dirIndex
    while (grid !== null) {
        dirIndex = arrowDirIndx['U']
        keyArrowChild[dirIndex].classList.add('key-arrow-active')
        grid.moveTiles('U')
        await delay(1000)
        keyArrowChild[dirIndex].classList.remove('key-arrow-active')

        dirIndex = arrowDirIndx['R']
        keyArrowChild[dirIndex].classList.add('key-arrow-active')
        grid.moveTiles('R')
        await delay(1000)
        keyArrowChild[dirIndex].classList.remove('key-arrow-active')


        dirIndex = arrowDirIndx['D']
        keyArrowChild[dirIndex].classList.add('key-arrow-active')
        grid.moveTiles('D')
        await delay(1000)
        keyArrowChild[dirIndex].classList.remove('key-arrow-active')


        dirIndex = arrowDirIndx['L']
        keyArrowChild[dirIndex].classList.add('key-arrow-active')
        grid.moveTiles('L')
        await delay(1000)
        keyArrowChild[dirIndex].classList.remove('key-arrow-active')

        if (count % 3 === 0) {
            console.log('inside clear tiles')
            grid.clearTiles()
            new Tile(grid.chooseInactiveCells)
            new Tile(grid.chooseInactiveCells)
            await delay(1000)
        }
        count++
    }
}



function getAllElements() {
    const HTPbg = document.getElementsByClassName("HTP-bg")[0];
    HTPbg.style.setProperty('--grid-size', GRID_SIZE)
    const popScreenBG = document.getElementsByClassName("pop-screen-bg")[0];
    const popScreen = document.getElementsByClassName("pop-screen")[0];
    const mainPage = document.getElementsByClassName("main-page")[0];
    const HTPopenBtn = document.getElementsByClassName("HTP-btn")[0];
    const keyArrowChild = document.getElementsByClassName('HTP-bg-arrow-cnt')[0].children
    const HTPcloseBtn = document.getElementsByClassName("close-btn")[0]

    // As default the How-to-play does not show-up!
    return { popScreenBG, popScreen, HTPbg, mainPage, HTPopenBtn, keyArrowChild, HTPcloseBtn};
}




const handleCloseAnimationEnd = (e) => {
    clearTimeout(timeOut)
    stopMoves = true
    popScreenBG.classList.remove('pop-screen-bg-close')
    popScreen.classList.remove('pop-screen-close')
    HTPbg.remove()
    popScreenBG.remove()
    popScreen.removeEventListener('webkitAnimationEnd', handleCloseAnimationEnd)

}



