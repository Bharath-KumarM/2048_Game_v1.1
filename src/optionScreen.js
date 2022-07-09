

var popScreenCnt,
    popScreenBG, 
    popScreen,
    closeBtn,
    openOptResolve

export default function openOption(grid) {
    const openOptPromise = new Promise(res => openOptResolve = res)
    console.log('clicked option btn')

    createOptElements()
    getAllElements()
    let activeChgSize = document.getElementsByClassName(`chg-grid-size-${grid.gridSize}`)[0]
    activeChgSize.classList.add('chg-grid-size-active')
    
    const handleGridchg = (e, i) => {
        const chngConfirmScrnCnt = document.getElementsByClassName('chng-confirm-scrn-cnt')[0]
        chngConfirmScrnCnt.style.display = 'flex'
        const chngConfirmScrn = document.getElementsByClassName('chng-confirm-scrn')[0]
        const chngConfirmYes = document.getElementsByClassName('chng-confirm-scrn-opt-yes')[0]
        const chngConfirmNo = document.getElementsByClassName('chng-confirm-scrn-opt-no')[0]
        chngConfirmYes.addEventListener('click', (e) => closeOption(i))
        chngConfirmNo.addEventListener('click', (e) => closeOption())

        // openOptResolve(i)

    }
    for (let i=3; i<=10; i++){
        if (grid.gridSize !== i){
            let chgGridSizeOpt = document.getElementsByClassName(`chg-grid-size-${i}`)[0]
            chgGridSizeOpt.addEventListener('click', (e) => handleGridchg(e, i))

        }

    }
    let restartbtn = document.getElementsByClassName(`restart-btn-cnt`)[0]
    restartbtn.addEventListener('click', (e) => handleGridchg(e, 'R'))



    closeBtn.addEventListener('click', () => closeOption())
    // popScreenBG.addEventListener('click', closeOption)

    popScreenCnt.style.setProperty('display', 'block')

    return openOptPromise
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
}

function createOptElements() {
    let popScreenCnt = document.getElementsByClassName("pop-screen-cnt")[0]
    popScreenCnt.innerHTML = document.getElementById("opt-scrn-html").textContent || ''
}
