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
const animateMoves = async () => {
    const keyArrowChild = document.getElementsByClassName('HTP-bg-arrow-cnt')[0].children
    while (true){

        for (const dir of keyPressPattern ){

            let dirIndex = arrowDirIndx[dir]
            keyArrowChild[dirIndex].classList.add('key-arrow-active')
            await delay(500)
            keyArrowChild[dirIndex].classList.remove('key-arrow-active')
            keyArrowChild[dirIndex].childNodes[1].classList.remove('key-arrow-svg')
            await delay(500)

        }
    }

  }

  
const HTPbg = document.getElementsByClassName("HTP-bg")[0]

HTPbg.style.display = 'none'

const HTPBtn = document.getElementsByClassName("HTP-btn")[0]
console.log(HTPBtn)


const closeHTPbg = () => {
    HTPbg.style.display = 'none'
}

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
    
    


const openHTPbg = () => {
    HTPbg.style.display = 'flex'
    // The logic to create the grid
    animateMoves()

}

HTPBtn.addEventListener('click', openHTPbg)















