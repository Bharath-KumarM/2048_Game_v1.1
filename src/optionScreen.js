var popScreenCnt,
    popScreenBG, 
    popScreen,
    closeBtn,
    openOptResolve,
    chngConfirmScrn,
    chngConfirmScrnCnt

export default function openOption(grid) {
    const openOptPromise = new Promise(res => openOptResolve = res)

    createOptElements()
    getAllElements()
    popScreenCnt.style.setProperty('display', 'block')


    chngConfirmScrnCnt.remove()
    let activeChgSize = document.getElementsByClassName(`chg-grid-size-${grid.gridSize}`)[0]
    activeChgSize.classList.add('chg-grid-size-active')
    
    for (let i=3; i<=10; i++){
        if (grid.gridSize !== i){
            let chgGridSizeOpt = document.getElementsByClassName(`chg-grid-size-${i}`)[0]
            chgGridSizeOpt.addEventListener('click', (e) => handleGridchg(e, i))
        }
    }

    let restartbtn = document.getElementsByClassName(`restart-btn-cnt`)[0]
    restartbtn.addEventListener('click', (e) => handleGridchg(e, 'R'))

    closeBtn.addEventListener('click', () => closeOption())

    return openOptPromise
}

const handleGridchg = (e, info) => {
    popScreen.appendChild(chngConfirmScrnCnt)
    chngConfirmScrnCnt.style.opacity = '1'

    chngConfirmScrn.addEventListener('webkitAnimationEnd', () => {
        chngConfirmScrn.classList.remove('chng-confirm-scrn-active')
        chngConfirmScrnCnt.classList.remove('chng-confirm-scrn-cnt-active')

    })
    chngConfirmScrn.classList.add('chng-confirm-scrn-active')
    chngConfirmScrnCnt.style.animationDirection = 'normal'
    chngConfirmScrnCnt.classList.add('chng-confirm-scrn-cnt-active')

    const chngConfirmYes = document.getElementsByClassName('chng-confirm-scrn-opt-yes')[0]
    const chngConfirmNo = document.getElementsByClassName('chng-confirm-scrn-opt-no')[0]


    chngConfirmNo.addEventListener('click', chngConfirmScrnDeActive)
    chngConfirmYes.addEventListener('click', (e) => closeOption(info))

}

const chngConfirmScrnDeActive= (e) => {
    chngConfirmScrn.addEventListener('webkitAnimationEnd', chngConfirmScrnDeActiveEnd)
    chngConfirmScrnCnt.style.animationDirection = 'reverse'
    chngConfirmScrnCnt.classList.add('chng-confirm-scrn-cnt-active')
    chngConfirmScrn.classList.add('chng-confirm-scrn-deActive')

}

const chngConfirmScrnDeActiveEnd = () => {
    chngConfirmScrn.removeEventListener('webkitAnimationEnd', chngConfirmScrnDeActiveEnd)
    chngConfirmScrnCnt.classList.remove('chng-confirm-scrn-cnt-active')

    chngConfirmScrn.classList.remove('chng-confirm-scrn-deActive')
    chngConfirmScrnCnt.remove()
}

const handleCloseAnimationEnd = async () => {
    popScreenCnt.style.setProperty('display', 'none')
    popScreenBG.classList.remove('pop-screen-bg-close')
    popScreen.classList.remove('pop-screen-close')

    popScreenBG.remove()
    popScreen.removeEventListener('webkitAnimationEnd', handleCloseAnimationEnd)
    
}

const closeOption =  (i) => {
    openOptResolve(i)
    //Starts the closing animation
    popScreen.addEventListener('webkitAnimationEnd', handleCloseAnimationEnd)
    popScreenBG.addEventListener('webkitAnimationEnd', handleCloseAnimationEnd)
    popScreen.classList.add('pop-screen-close')
    popScreenBG.classList.add('pop-screen-bg-close')

}




function getAllElements() {
    closeBtn = document.getElementsByClassName("close-btn")[0]
    popScreenCnt = document.getElementsByClassName("pop-screen-cnt")[0]
    popScreenBG = document.getElementsByClassName("pop-screen-bg")[0]
    popScreen = document.getElementsByClassName("pop-screen")[0]
    chngConfirmScrn = document.getElementsByClassName('chng-confirm-scrn')[0]
    chngConfirmScrnCnt = document.getElementsByClassName('chng-confirm-scrn-cnt')[0]
}

function createOptElements() {
    let popScreenCnt = document.getElementsByClassName("pop-screen-cnt")[0]
    popScreenCnt.innerHTML = document.getElementById("opt-scrn-html").textContent || ''
}
