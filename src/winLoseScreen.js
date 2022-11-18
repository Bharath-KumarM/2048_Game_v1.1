var closeBtn,
    popScreenCnt,
    popScreenBG, 
    popScreen, 
    playAgainBtn 

const handleCloseAnimationEnd = async () => {
    popScreenCnt.style.setProperty('display', 'none')
    popScreenBG.classList.remove('pop-screen-bg-close')
    popScreen.classList.remove('pop-screen-close')

    popScreenBG.remove()
    popScreen.removeEventListener('webkitAnimationEnd', handleCloseAnimationEnd)
    
}

const closeScreen =  (openResolve) => {
    //Starts the closing animation
    popScreen.addEventListener('webkitAnimationEnd', ()=>{
        popScreenCnt.remove()
    })
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
    let openResolve
    const openPromise = new Promise((res) => openResolve = res)
    createWinLoseElement()
    getAllElements()
    const winLoseScreen = document.getElementsByClassName("win-screen")[0]
    let winLoseScreenChildren = winLoseScreen.childNodes

    closeBtn.addEventListener('click', ()=> closeScreen(openResolve))
    playAgainBtn.addEventListener('click', ()=> closeScreen(openResolve))
    popScreenCnt.addEventListener('click', ()=> closeScreen(openResolve))

    popScreen.addEventListener('click', (e)=>{
        e.stopPropagation()
    })

    if (msg === 'win'){
        winLoseScreenChildren[1].innerHTML = 'Congratulation🎉' //h1
        winLoseScreenChildren[3].innerHTML = 'You Won🎈' //h2
    } 
    else {
        winLoseScreenChildren[1].innerHTML = 'Game Over⏸️' //h1
        winLoseScreenChildren[3].innerHTML = '😕' //h2
    } 

    return openPromise
}



function createWinLoseElement() {
    let winLoseCnt = document.createElement('div')
    winLoseCnt.classList.add('pop-screen-cnt')
    document.querySelector('body').prepend(winLoseCnt)

    const winLoseEle = document.getElementById("win-lose-scrn-temp").content.cloneNode(true)
    winLoseCnt.append(winLoseEle)

}