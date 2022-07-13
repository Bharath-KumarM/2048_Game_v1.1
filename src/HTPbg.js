import Grid from "./Grid.js"

// the gridElement size; default size 4x4
const GRID_SIZE = 3
const delay = ms => new Promise(res => setTimeout(res, ms));

// Global Variables - HTML Elements

var  popScreenCnt,
popScreenBG, 
popScreen, 
HTPbg, 
keyArrowChild, 
HTPcloseBtn,
grid

//How-To-Play key press pattern
const arrowDirIndx = {
    'U': 0,
    'L': 1,
    'D': 2,
    'R': 3
}
const arrowMoves = ['U', 'D', 'L', 'R', 'L']

const openHTPbg = async () => {
    isAnimationRunning = true


    createHTPelements()
    referAllElements()

    popScreenBG.addEventListener('click',closeHTPbg)
    HTPcloseBtn.addEventListener('click',closeHTPbg)
    
    grid = createGrid()
    let count = 0
    while (isAnimationRunning) {

        let dir = arrowMoves[count%5]
        let dirIndex = arrowDirIndx[dir]
        keyArrowChild[dirIndex].classList.add('key-arrow-active')
        await grid.moveTiles(dir)
        await delay(1000)
        keyArrowChild[dirIndex].classList.remove('key-arrow-active')
        
        if (count != 0 && count % 12 === 0) {
            grid.clearTiles()
        }
        count++
    }
}

const closeHTPbg =  () => {
    isAnimationRunning = false

    //Starts the closing animation
    popScreen.addEventListener('webkitAnimationEnd', handleCloseAnimationEnd)
    popScreen.classList.add('pop-screen-close')
    popScreenBG.classList.add('pop-screen-bg-close')

}

function createGrid() {
    const gridElement = document.getElementById('HTP-grid')
    gridElement.style.setProperty('--grid-size', GRID_SIZE)

    // Grid Created
    let grid = new Grid(GRID_SIZE, gridElement)
    return grid
}


function referAllElements() {
    popScreenCnt = document.getElementsByClassName("pop-screen-cnt")[0];
    popScreenCnt.style.setProperty('display', 'block')
    
    HTPbg = document.getElementsByClassName('pop-screen-bg')[0];
    HTPbg.style.setProperty('--grid-size', GRID_SIZE)

    popScreenBG = document.getElementsByClassName("pop-screen-bg")[0];
    popScreen = document.getElementsByClassName("pop-screen")[0];

    keyArrowChild = document.getElementsByClassName('HTP-bg-arrow-cnt')[0].children

    HTPcloseBtn = document.getElementsByClassName("close-btn")[0]

}


const handleCloseAnimationEnd = async () => {
    popScreenCnt.style.setProperty('display', 'none')
    popScreenBG.classList.remove('pop-screen-bg-close')
    popScreen.classList.remove('pop-screen-close')

    popScreenBG.remove()
    popScreen.removeEventListener('webkitAnimationEnd', handleCloseAnimationEnd)
    
}



// Open and close
var isAnimationRunning = true
const HTPopenBtn = document.getElementsByClassName("HTP-btn")[0];
HTPopenBtn.addEventListener('click', openHTPbg)


function createHTPelements() {
    let popScreenCnt = document.getElementsByClassName("pop-screen-cnt")[0]
    popScreenCnt.innerHTML = document.getElementById("HTP-html").textContent
}

