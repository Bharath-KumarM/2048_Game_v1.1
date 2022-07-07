


const openOption = () => {
    console.log('clicked option btn')
    mainPage.insertBefore(popScreenBG, mainPage.firstChild)
    mainPage.insertBefore(popScreen, mainPage.firstChild)
}




const mainPage = document.getElementsByClassName("main-page")[0];
const popScreenBG = document.getElementsByClassName("pop-screen-bg")[0];
const popScreen = document.getElementsByClassName("pop-screen")[0];
const optionBtn = document.getElementsByClassName("option-btn")[0]


optionBtn.addEventListener('click', openOption)
