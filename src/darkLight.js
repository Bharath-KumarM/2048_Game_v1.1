let isNight = true

const swapDarkLight = (darkLightBtn) => {
    let bodyElement = document.getElementsByTagName('body')[0]
    
    if (!isNight){
        bodyElement.style.setProperty('--color-prime', 'rgb(201, 198, 198)')
        bodyElement.style.setProperty('--color-base',  'rgb(24, 23, 23)')
        bodyElement.style.setProperty('--color-grid',  'rgb(136, 136, 136)')
        bodyElement.style.setProperty('--color-cell',  'rgba(72, 68, 68, 0.92)')
        darkLightBtn.textContent = '💡'
    }
    else {
        bodyElement.style.setProperty('--color-prime', 'rgb(71, 71, 71)')
        bodyElement.style.setProperty('--color-base', 'rgb(230, 248, 247)')
        bodyElement.style.setProperty('--color-grid', 'rgba(118, 149, 149, 0.833)')
        bodyElement.style.setProperty('--color-cell', 'rgba(203, 220, 223, 0.92)')
        darkLightBtn.textContent = '🌙'
    }
    isNight = !isNight
}
let darkLightBtn = document.getElementsByClassName("dark-light-btn")[0]
darkLightBtn.addEventListener('click', () => swapDarkLight(darkLightBtn))
swapDarkLight(darkLightBtn)