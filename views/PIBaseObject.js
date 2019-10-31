// import PIBordersBuild from './PIBordersBuilder.js'

export default class PIBaseObject {
    constructor(rexUIItem) {
        this.displayItem = rexUIItem
        this.displayItem.setInteractive().on("pointerdown", () => this.scene.toggleSelection(this) )
        this.scene.addGameObject(this)
    }

    get scene() {
        return this.displayItem.scene
    }
}