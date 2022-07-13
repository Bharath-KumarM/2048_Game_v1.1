
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


export default function updateScoreBoard(grid) {
    if (localStorage.getItem('high-socre')){
        if (localStorage.getItem('high-socre') < grid.score)
            localStorage.setItem('high-socre', grid.score)
    }
    else 
        localStorage.setItem('high-socre', grid.score)

    updateScore(grid.score)
    pointsAnimation(grid.pointsPerMove)
    grid.pointsPerMove = 0
}


var closeBtn,
    popScreenCnt,
    popScreenBG ,
    popScreen

const handleCloseAnimationEnd = async () => {
    popScreenCnt.style.setProperty('display', 'none')
    popScreenBG.classList.remove('pop-screen-bg-close')
    popScreen.classList.remove('pop-screen-close')

    popScreenBG.remove()
    popScreen.removeEventListener('webkitAnimationEnd', handleCloseAnimationEnd)
    
}

const closeScreen =  (i) => {
    //Starts the closing animation
    popScreen.addEventListener('webkitAnimationEnd', handleCloseAnimationEnd)
    popScreenBG.addEventListener('webkitAnimationEnd', handleCloseAnimationEnd)
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

    popScreenCnt.style.setProperty('display', 'block')
    closeBtn.addEventListener('click', closeScreen)

}


let scoreBoardEle = document.getElementsByClassName('score-board')[0]
scoreBoardEle.addEventListener('click', hiScoreScrn)

function createHiScoreElement() {
    let scoreBoardCnt = document.getElementsByClassName("pop-screen-cnt")[0]
    scoreBoardCnt.innerHTML = `
<div class="pop-screen-bg">
    <div class="pop-screen hi-score-screen">
        <div class="close-btn">
        X
        </div>
        <div class="hi-score">
            <h2>High Score⚡: ${localStorage.getItem('high-socre')} </h2>
        </div>
    </div>
</div>
`
}