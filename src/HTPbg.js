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
const clearTiles = (cells) => {
    for (const cell of cells){
        if (cell.tile !== null) {
            cell.tile.remove()
        }
    }
}
const openHTPbg =  async () => {
    let running = true

    // Create Pop screen Cnt
    let popScreenCnt = document.createElement('div')
    popScreenCnt.classList.add('pop-screen-cnt')
    document.querySelector('body').prepend(popScreenCnt)

    //How to play template
    const htpEle  = document.getElementById("HTP-html").content.cloneNode(true)
    popScreenCnt.appendChild(htpEle)
    getAllDOMElements()
    
    const handleCloseClick = ()=>{
        running = false
        closeHTPbg()
    }

    popScreenBG.addEventListener('click',handleCloseClick)
    HTPcloseBtn.addEventListener('click',handleCloseClick)
    
    grid = createGrid()
    let count = 0

    while (running) {   
        let dir = arrowMoves[count%5]
        let dirIndex = arrowDirIndx[dir]
        keyArrowChild[dirIndex].classList.add('key-arrow-active')
        
        if (!running) return
        await grid.moveTiles(dir)
        await delay(700)

        keyArrowChild[dirIndex].classList.remove('key-arrow-active')
        
        if (count > 0 && count % 12 === 0) clearTiles(grid.cells)
        count++
    }
}

const closeHTPbg =  () => {
    //Starts the closing animation
    popScreen.addEventListener('webkitAnimationEnd', ()=> popScreenCnt.remove())
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


function getAllDOMElements() {
    popScreenCnt = document.getElementsByClassName("pop-screen-cnt")[0];
    popScreenCnt.style.setProperty('display', 'block')
    
    HTPbg = document.getElementsByClassName('pop-screen-bg')[0];
    HTPbg.style.setProperty('--grid-size', GRID_SIZE)

    popScreenBG = document.getElementsByClassName("pop-screen-bg")[0];
    popScreen = document.getElementsByClassName("pop-screen")[0];

    keyArrowChild = document.getElementsByClassName('HTP-bg-arrow-cnt')[0].children

    HTPcloseBtn = document.getElementsByClassName("close-btn")[0]

}

// Open and close
const HTPopenBtn = document.getElementsByClassName("HTP-btn")[0];
HTPopenBtn.addEventListener('click', openHTPbg)



