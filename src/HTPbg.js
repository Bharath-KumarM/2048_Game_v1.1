function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
//How-To-Play key press pattern
const keyPressPattern = ['L', 'R', 'L', 'U', 'D', 'D']
const arrowDirIndx = {
    'U': 0,
    'L': 1,
    'D': 2,
    'R': 3
}
var stopMoves = true
// Creates cells for small grid
for (let i=0; i<9; i++){
    const HTPgrid = document.getElementsByClassName("HTP-grid-cnt")[0]
    const cell = document.createElement('div')
    cell.className = `cell HTP-cell`
    const child = document.createElement('div')
    if (i%2 === 0) {
        child.className = `tile HTP-tile`
        child.textContent = '88'
    }  
    cell.appendChild(child)
    HTPgrid.append(cell)
}

const animateMoves = async () => {
    const keyArrowChild = document.getElementsByClassName('HTP-bg-arrow-cnt')[0].children
    while (!stopMoves){

        for (const dir of keyPressPattern ){

            let dirIndex = arrowDirIndx[dir]
            keyArrowChild[dirIndex].classList.add('key-arrow-active')
            if (stopMoves) break
            await delay(500)
            if (stopMoves) break

            keyArrowChild[dirIndex].classList.remove('key-arrow-active')
            keyArrowChild[dirIndex].childNodes[1].classList.remove('key-arrow-svg')
            if (stopMoves) break
            await delay(500)
            if (stopMoves) break

        }
    }

  }

// Get all the elements we need!
const HTPbg = document.getElementsByClassName("HTP-bg")[0]
const popScreenBG = document.getElementsByClassName("pop-screen-bg")[0]
const popScreen = document.getElementsByClassName("pop-screen")[0]
const mainPage = document.getElementsByClassName("main-page")[0]
const HTPBtn = document.getElementsByClassName("HTP-btn")[0]

// As default the How-to-play does not show-up!
HTPbg.remove()
popScreenBG.remove()



const handleAnimationEnd = (e) => {
    HTPbg.remove()
    popScreenBG.remove()
    popScreenBG.classList.remove('pop-screen-bg-close')
    popScreen.classList.remove('pop-screen-close')

    popScreen.removeEventListener('webkitAnimationEnd', handleAnimationEnd)
    stopMoves = true
}

const closeHTPbg = async () => {
    // Listens to animation ends 
    popScreen.addEventListener('webkitAnimationEnd', handleAnimationEnd) 
    
    //Starts the sliding animation
    popScreen.classList.add('pop-screen-close') 
    popScreenBG.classList.add('pop-screen-bg-close')
}


    
    


const openHTPbg = () => {
    mainPage.insertBefore(popScreenBG, mainPage.firstChild)
    mainPage.insertBefore(HTPbg, mainPage.firstChild)
    // The logic to create the grid
    stopMoves = false
    animateMoves()
}

HTPBtn.addEventListener('click', openHTPbg)















