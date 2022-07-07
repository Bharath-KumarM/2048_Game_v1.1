import Grid from "./Grid.js"

// the gridElement size; default size 4x4
const GRID_SIZE = 3

// Global Variables - HTML Elements
var  popScreenCnt, 
        popScreenBG, 
        popScreen, 
        HTPbg, 
        mainPage, 
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
        keyArrowChild[dirIndex].classList.remove('key-arrow-active')

        if (count % 12 === 0) {
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
    
    mainPage = document.getElementsByClassName("main-page")[0];
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
    HTPbg.remove()
    popScreenBG.remove()
    popScreen.removeEventListener('webkitAnimationEnd', handleCloseAnimationEnd)
    
}



// Open and close
var isAnimationRunning = true
const HTPopenBtn = document.getElementsByClassName("HTP-btn")[0];
HTPopenBtn.addEventListener('click', openHTPbg)


function createHTPelements() {
    document.getElementsByClassName("pop-screen-cnt")[0].innerHTML = ` 
<div class="pop-screen-bg">

<div class="HTP-bg pop-screen">
  <div class="close-btn">
  X
  </div>
  <div class="HTP-instruction">
    <h1>How To Play✨</h1>
    <ul>
      <li>
        🎮Press the arrow keys⌨️ to move the tiles in the grid.
      </li>
      <li>
        🎯Aim is to group numeric tiles with the same numbers🎉.  
      </li>
      <li>
        Each club you make doubles(2X) the tiles number. Ultimately reach 2048 to win!🥇
      </li>
    </ul>
    
    <div class="HTP-bg-arrow-cnt"> 
      <div class="key-arrow key-up " style="transform: rotate(180deg);">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -4 28 28">
          <path d="m 4 2.5 l 10 10 l 10 -10 l 2.5 2.5 l -12.5 12.5 l -12.5 -12.5 z m 10 0 m 0 0 " stroke="#000000"
            stroke-width="0.25" />
        </svg>
      </div>
      <div class="key-arrow key-left" style="transform: rotate(90deg);">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -4 28 28">
          <path d="m 4 2.5 l 10 10 l 10 -10 l 2.5 2.5 l -12.5 12.5 l -12.5 -12.5 z m 10 0 m 0 0 " stroke="#000000"
            stroke-width="0.25" />
        </svg>
      </div>
      <div class="key-arrow " style="transform: rotate(0deg);">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -4 28 28">
          <path d="m 4 2.5 l 10 10 l 10 -10 l 2.5 2.5 l -12.5 12.5 l -12.5 -12.5 z m 10 0 m 0 0 " stroke="#000000"
            stroke-width="0.25" />
        </svg>
      </div>
      <div class="key-arrow " style="transform: rotate(-90deg);">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -4 28 28">
          <path d="m 4 2.5 l 10 10 l 10 -10 l 2.5 2.5 l -12.5 12.5 l -12.5 -12.5 z m 10 0 m 0 0 " stroke="#000000"
            stroke-width="0.25" />
        </svg>
      </div>
    </div>
  </div> 
  <hr/>
  <div id="HTP-grid">
  </div>
</div> 
</div>
`
}

