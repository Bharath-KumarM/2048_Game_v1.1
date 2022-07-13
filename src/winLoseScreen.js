var closeBtn,
    popScreenCnt,
    popScreenBG, 
    popScreen, 
    playAgainBtn,
    openResolve 

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
    openResolve()

}




function getAllElements() {
    closeBtn = document.getElementsByClassName("close-btn")[0]
    popScreenCnt = document.getElementsByClassName("pop-screen-cnt")[0]
    popScreenBG = document.getElementsByClassName("pop-screen-bg")[0]
    popScreen = document.getElementsByClassName("pop-screen")[0]
    playAgainBtn = document.getElementsByClassName("play-again-cnt")[0]

}

export const openWinLoseScrn = (msg) => {
    const openPromise = new Promise((res) => openResolve = res)
    createWinLoseElement()
    getAllElements()
    popScreenCnt.style.setProperty('display', 'block')
    const winLoseScreen = document.getElementsByClassName("win-screen")[0]
    let winLoseScreenChildren = winLoseScreen.childNodes
    closeBtn.addEventListener('click', closeScreen)
    playAgainBtn.addEventListener('click', closeScreen)
    if (msg === 'win'){
        winLoseScreenChildren[1].innerHTML = 'Congratulation🎉' //h1
        winLoseScreenChildren[3].innerHTML = 'You Won🎈' //h2
    } 
    else {
        winLoseScreenChildren[1].innerHTML = 'Game Over⏸️' //h1
        winLoseScreenChildren[3].innerHTML = 'You Lose😕' //h2
    } 

    return openPromise
}

// openWinLoseScrn('win')
const hiScoreScrn = (msg) => {
    const openPromise = new Promise((res) => openResolve = res)
    createWinLoseElement()
    getAllElements()
    popScreenCnt.style.setProperty('display', 'block')
    const winLoseScreen = document.getElementsByClassName("win-screen")[0]
    let winLoseScreenChildren = winLoseScreen.childNodes
    closeBtn.addEventListener('click', closeScreen)
    playAgainBtn.addEventListener('click', closeScreen)
    if (msg === 'win'){
        winLoseScreenChildren[1].innerHTML = 'Congratulation🎉' //h1
        winLoseScreenChildren[3].innerHTML = 'You Won🎈' //h2
    } 
    else {
        winLoseScreenChildren[1].innerHTML = 'Game Over⏸️' //h1
        winLoseScreenChildren[3].innerHTML = 'You Lose😕' //h2
    } 

    return openPromise
}



function createWinLoseElement() {
    let winLoseCnt = document.getElementsByClassName("pop-screen-cnt")[0]
    winLoseCnt.innerHTML = `
<div class="pop-screen-bg">
    <div class="pop-screen">
        <div class="close-btn">
        X
        </div>
        <div class="win-screen">
            <h1></h1>
            <h2></h2>
            <div class="play-again-cnt">
                <button>Play Again🤩</button>
            </div>
        </div>
    </div>
</div>
`
}