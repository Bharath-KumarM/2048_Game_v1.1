const getInitValue = (initValue) => {
    if (initValue !== undefined) return initValue
    let initValues = [2, 4] 
    return initValues[Math.floor(Math.random() * initValues.length)]

}

export default class Tile {
    constructor(cell, initValue){
        this.x = cell.x
        this.y = cell.y
        this.value = getInitValue(initValue)

        // Creates HTML element for tile
        this.createTile()

        // parent cell details
        this.parentCell = cell
        
        // Updates to cell object
        cell.tile = this
        cell.cellElement.appendChild(this.element)
    }
    
    createTile() {
        this.element = document.createElement('div')
        this.element.className = 'tile main-tile'
        this.element.textContent = this.value.toString()
    }

    remove(){
        this.element.remove()
        this.parentCell.tile = null
    }
}