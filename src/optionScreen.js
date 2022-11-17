var popScreenCnt,
    popScreenBG, 
    popScreen,
    closeBtn,
    openOptResolve,
    chngConfirmScrn,
    chngConfirmScrnCnt

export default function openOption(grid) {
    const openOptPromise = new Promise(res => openOptResolve = res)

    //Pop Screen Elements
    popScreenCnt = document.createElement('div')
    popScreenCnt.classList.add('pop-screen-cnt')
    document.querySelector('body').prepend(popScreenCnt)

    const optionScreenEle = document.getElementById("opt-scrn-html").content.cloneNode(true)
    popScreenCnt.append(optionScreenEle)

    popScreenBG = document.getElementsByClassName("pop-screen-bg")[0]
    popScreen = document.getElementsByClassName("pop-screen")[0]

    //show current gird size
    let activeChgSize = document.getElementsByClassName(`chg-grid-size-${grid.gridSize}`)[0]
    activeChgSize.classList.add('chg-grid-size-active')
    
    //Click Event listener to each button
    for (let i=3; i<=10; i++){
        if (grid.gridSize !== i){
            let chgGridSizeOpt = document.getElementsByClassName(`chg-grid-size-${i}`)[0]
            chgGridSizeOpt.addEventListener('click', (e) => handleGridchg(e, i))
        }
    }

    //Restart Button
    let restartbtn = document.getElementsByClassName(`restart-btn-cnt`)[0]
    restartbtn.addEventListener('click', (e) => handleGridchg(e, 'R'))

    //Close button
    closeBtn = document.getElementsByClassName("close-btn")[0]
    closeBtn.addEventListener('click', () => closeOption())
    //Close screen clicking background and not screen
    popScreenBG.addEventListener('click', () => closeOption())
    popScreen.addEventListener('click', (e)=>e.stopPropagation() )

    return openOptPromise
}

const handleGridchg = (e, info) => {
    chngConfirmScrnCnt = document.querySelector('#grid-size-chng-scrn').content.cloneNode(true)
    chngConfirmScrnCnt = chngConfirmScrnCnt.querySelector('.chng-confirm-scrn-cnt')
    chngConfirmScrn = chngConfirmScrnCnt.querySelector('.chng-confirm-scrn')
    popScreen.appendChild(chngConfirmScrnCnt)


    const chngConfirmYes = document.getElementsByClassName('chng-confirm-scrn-opt-yes')[0]
    const chngConfirmNo = document.getElementsByClassName('chng-confirm-scrn-opt-no')[0]


    chngConfirmNo.addEventListener('click', chngConfirmScrnHide)
    chngConfirmYes.addEventListener('click', (e) => closeOption(info))

}

const chngConfirmScrnHide= (e) => {
    chngConfirmScrn.addEventListener('transitionend', ()=>{
        chngConfirmScrnCnt.remove()
    })
    chngConfirmScrn.classList.add('hide')
    chngConfirmScrnCnt.classList.add('hide')
}

const closeOption =  (i) => {
    openOptResolve(i)
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



