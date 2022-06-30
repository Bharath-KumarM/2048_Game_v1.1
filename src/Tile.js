const getInitValue = (initValue) => {
    if (initValue !== undefined) return initValue
    let initValues = [2, 4] 
    return initValues[Math.floor(Math.random() * initValues.length)]

}

export default class Tile {
    constructor(cell, initValue, type){
        this.x = cell.x
        this.y = cell.y
        this.value = getInitValue(initValue)

        // Creates HTML element for tile
        this.createTile(initValue)
        this.checkType(type)

        // parent cell details
        this.parentCell = cell
        
        // Updates to cell object
        cell.tile = this
        cell.cellElement.appendChild(this.element)
    }
    
    createTile(initValue) {
        this.element = document.createElement('div')
        this.element.className = 'tile main-tile'
        this.element.textContent = this.value.toString()
        if (initValue === undefined) 
            this.element.classList.add('new-tile')
    }
    checkType(type) {
        if (type === 'C') this.element.classList.add('merge-tile')
    }
    remove(){
        this.element.remove()
        this.parentCell.tile = null
    }
}