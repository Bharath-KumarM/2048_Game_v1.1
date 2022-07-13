

const darkLightBtn = document.getElementsByClassName("dark-light-btn")[0]
const bodyElement = document.getElementsByTagName('body')[0]

let isDark
if (localStorage.getItem('isDark')){
    makeDark(bodyElement, darkLightBtn)
    isDark = true
}
else {
    makeLight(bodyElement, darkLightBtn)
    isDark = false
}


const swapDarkLight = (darkLightBtn) => {
    
    if (!isDark){
        makeDark(bodyElement, darkLightBtn)
    }
    else {
        makeLight(bodyElement, darkLightBtn)
    }
    isDark = !isDark
}

darkLightBtn.addEventListener('click', () => swapDarkLight(darkLightBtn))

function makeLight(bodyElement, darkLightBtn) {
    bodyElement.style.setProperty('--color-prime', 'rgb(71, 71, 71)')
    bodyElement.style.setProperty('--color-base', 'rgb(230, 248, 247)')
    bodyElement.style.setProperty('--color-grid', 'rgba(118, 149, 149, 0.833)')
    bodyElement.style.setProperty('--color-cell', 'rgba(203, 220, 223, 0.92)')
    darkLightBtn.textContent = '🌙'
    localStorage.setItem('isDark', '')
}

function makeDark(bodyElement, darkLightBtn) {
    bodyElement.style.setProperty('--color-prime', 'rgb(201, 198, 198)')
    bodyElement.style.setProperty('--color-base', 'rgb(24, 23, 23)')
    bodyElement.style.setProperty('--color-grid', 'rgb(136, 136, 136)')
    bodyElement.style.setProperty('--color-cell', 'rgba(72, 68, 68, 0.92)')
    darkLightBtn.textContent = '💡'
    localStorage.setItem('isDark', 'Yes')
}
