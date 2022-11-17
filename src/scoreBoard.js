
const pointsAnimation = (pointsCounter) => {
    if (!pointsCounter) return null

    // const scorePointsElement = document.getElementsByClassName('score-points')[0]
    const scorePointsElement = document.createElement('div')
    scorePointsElement.classList.add('score-points')
    scorePointsElement.textContent = '+' + pointsCounter
    scorePointsElement.addEventListener('webkitAnimationEnd', ()=>{
        scorePointsElement.remove()
    })

    const scoreBoardEle = document.querySelector('.game-title .score-board')
    scoreBoardEle.append(scorePointsElement)

}


export default function updateScoreBoard(grid) {
    if (localStorage.getItem('high-socre')){
        if (localStorage.getItem('high-socre') < grid.score)
            localStorage.setItem('high-socre', grid.score)
    }
    else 
        localStorage.setItem('high-socre', grid.score)

    //Update Score Board
    const scoreElement = document.getElementsByClassName('score-board-score')[0]
    scoreElement.textContent = grid.score

    //Points Animation
    pointsAnimation(grid.pointsPerMove)
    grid.pointsPerMove = 0
}


var closeBtn,
    popScreenCnt,
    popScreenBG ,
    popScreen


const closeScreen =  (i) => {
    //Starts the closing animation
    popScreen.addEventListener('webkitAnimationEnd', ()=>{
        popScreenCnt.remove()
    })
    popScreenBG.addEventListener('webkitAnimationEnd', ()=>{
        popScreenCnt.remove()
    })
    popScreen.classList.add('pop-screen-close')
    popScreenBG.classList.add('pop-screen-bg-close')

}

const hiScoreScrn = (e) => {
    createHiScoreElement()
    // getAllElements()
    closeBtn = document.getElementsByClassName("close-btn")[0]
    popScreenCnt = document.getElementsByClassName("pop-screen-cnt")[0]
    popScreenBG = document.getElementsByClassName("pop-screen-bg")[0]
    popScreen = document.getElementsByClassName("pop-screen")[0]

    //Close screen clicking background
    closeBtn.addEventListener('click', closeScreen)
    popScreenBG.addEventListener('click', closeScreen)

}

//Script starts here
let scoreBoardEle = document.getElementsByClassName('score-board')[0]
scoreBoardEle.addEventListener('click', hiScoreScrn)

function createHiScoreElement() {
    popScreenCnt = document.createElement('div')
    popScreenCnt.classList.add('pop-screen-cnt')
    document.querySelector('body').prepend(popScreenCnt)

    const scoreBoardEle = document.getElementById("score-board-temp").content.cloneNode(true)
    scoreBoardEle.querySelector('.hi-score h2').textContent = `High Score⚡: ${localStorage.getItem('high-socre')}`
    popScreenCnt.append(scoreBoardEle)

}