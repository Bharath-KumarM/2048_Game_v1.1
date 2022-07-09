
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
    updateScore(grid.score)
    pointsAnimation(grid.pointsPerMove)
    grid.pointsPerMove = 0
}