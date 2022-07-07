
var popScreenCnt,
    popScreenBG, 
    popScreen,
    closeBtn

const openOption = () => {
    console.log('clicked option btn')
    createOptElements()
    getAllElements()

    closeBtn.addEventListener('click', closeOption)

    popScreenCnt.style.setProperty('display', 'block')
}

const handleCloseAnimationEnd = async () => {
    popScreenCnt.style.setProperty('display', 'none')
    popScreenBG.classList.remove('pop-screen-bg-close')
    popScreen.classList.remove('pop-screen-close')

    popScreenBG.remove()
    popScreen.removeEventListener('webkitAnimationEnd', handleCloseAnimationEnd)
    
}

const closeOption =  () => {

    //Starts the closing animation
    popScreen.addEventListener('webkitAnimationEnd', handleCloseAnimationEnd)
    popScreen.classList.add('pop-screen-close')
    popScreenBG.classList.add('pop-screen-bg-close')

}

const optionBtn = document.getElementsByClassName("option-btn")[0]
optionBtn.addEventListener('click', openOption)


function getAllElements() {
    closeBtn = document.getElementsByClassName("close-btn")[0]
    popScreenCnt = document.getElementsByClassName("pop-screen-cnt")[0]
    popScreenBG = document.getElementsByClassName("pop-screen-bg")[0]
    popScreen = document.getElementsByClassName("pop-screen")[0]
}

function createOptElements() {
    let popScreenCnt = document.getElementsByClassName("pop-screen-cnt")[0]
    popScreenCnt.innerHTML = document.getElementById("opt-html").textContent || ''
}