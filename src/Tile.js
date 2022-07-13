const getInitValue = (initValue) => {
    if (initValue !== undefined) return initValue
    let initValues = [2, 2, 2, 4] //Increased the probablity of getting 2 
    return initValues[Math.floor(Math.random() * initValues.length)]

}

export default class Tile {
    constructor(cell, initValue, type){
        this.x = cell.x
        this.y = cell.y
        this.value = getInitValue(initValue)

        this.mergeEndResolve
        let promise =  new Promise((res)=> this.mergeEndResolve = res)

        // Creates HTML element for tile
        this.createTile(initValue)
        this.checkType(type)

        // parent cell details
        this.parentCell = cell
        
        // Updates to cell object
        cell.tile = this
        cell.cellElement.appendChild(this.element)

        return promise

    }
    
    createTile(initValue) {
        this.element = document.createElement('div')
        this.element.className = 'tile main-tile'
        this.element.textContent = this.value.toString()
        const [fontColor, BGcolor] = getTileColor[this.value]
        this.element.style.setProperty('color', fontColor)
        this.element.style.setProperty('background-color', BGcolor)

        if (initValue === undefined) 
            this.element.classList.add('new-tile')
    }
    checkType(type) {
        const handleMergeEnd = (e) => {
            e.srcElement.removeEventListener('webkitAnimationEnd', handleMergeEnd)
            this.mergeEndResolve()
        }

        if (type === 'C') {
            this.element.addEventListener('webkitAnimationEnd', handleMergeEnd)
            this.element.classList.add('merge-tile')
        }
        else this.mergeEndResolve()
    }
    remove(){
        this.element.remove()
        this.parentCell.tile = null
    }
}


    
    
// Posible values = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048]
// font = #201919, #EDEEF7
const getTileColor = {
    2: ['#201919', '#E4FBFF'],
    4: ['#201919', '#58bef0'],
    8: ['#201919', '#ABC9FF'],
    16: ['#EBFFFB', '#3161A3'],
    32: ['#201919', '#F1FFAB'],
    64: ['#201919', '#FBD341'],
    128: ['#EBFFFB', '#00B7C2'],
    256: ['#EBFFFB', '#128494'],
    512: ['#EBFFFB', '#3161A3'],
    1024: ['#201919', '#FEFFDE'],
    2048: ['#EBFFFB', '#1C1427']
}