import Grid from "./src/Grid.js"
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
    grid = new Grid(GRID_SIZE, gridElement, 'new')
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




grid.element.addEventListener("touchstart", startTouch, false);
grid.element.addEventListener("touchmove", moveTouch, false);
 
// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;
 
function startTouch(e) {
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;
};
 
function moveTouch(e) {
  if (initialX === null) {
    return;
  }
 
  if (initialY === null) {
    return;
  }
 
  var currentX = e.touches[0].clientX;
  var currentY = e.touches[0].clientY;
 
  var diffX = initialX - currentX;
  var diffY = initialY - currentY;
 
  if (Math.abs(diffX) > Math.abs(diffY)) {
    // sliding horizontally
    if (diffX > 0) {
      // swiped left
      console.log("swiped left");
      doMove('L')
    } else {
      // swiped right
      console.log("swiped right");
      doMove('R')
    }  
  } else {
    // sliding vertically
    if (diffY > 0) {
      // swiped up
      console.log("swiped up");
      doMove('U')
    } else {
      // swiped down
      console.log("swiped down");
      doMove('D')
    }  
  }
 
  initialX = null;
  initialY = null;
   
  e.preventDefault();
};

const doMove = async (dir) => {
    grid.moveTiles(dir)
    updateScoreBoard(grid)
} 



const optionBtn = document.getElementsByClassName("option-btn")[0]
optionBtn.addEventListener('click', async () => {
    let chgGridSize = await openOption(grid)
    console.log(chgGridSize)
    if (chgGridSize === 'R') //Restart
        grid = new Grid(grid.gridSize, gridElement, 'new')
    else if(chgGridSize)
        grid = new Grid(chgGridSize, gridElement, 'new')
})




















