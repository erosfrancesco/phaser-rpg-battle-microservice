import GameObjectsPoolScene from './gameObjectManagerScene.js';
import PIBordersBuild from '../PIBordersBuilder.js'


export default class SelectionWrapper extends GameObjectsPoolScene {
    constructor() {
        super()

        this.selectedGameObjects = []
    }

    preload() {
        super.preload()
    }

    create() {
        const background = this.rexUI.add.roundRectangle(450, 250, 900, 500, 0, 0x000)
        background.setInteractive().on("pointerdown", () => this.deselectAllGameObject() )
    }

    toggleSelection(gameObject) {
        // already selected
        if ( this.indexOfSelectedGameObject(gameObject) ) {
            return
        }

        // select
        this.addGameObjectToSelection(gameObject)
    }

    indexOfSelectedGameObject(gameObject) {
        return this.selectedGameObjects.find(selected => selected.id === gameObject.id)
    }

    deselectAllGameObject() {
        this.selectedGameObjects.forEach(selected => this.deselectGameObject(selected))
        this.selectedGameObjects = []
    }

    deselectGameObject(gameObject) {
        gameObject.borders.destroy()
        gameObject.borders.graphics.clear()
        gameObject.borders = false 
    }

    addGameObjectToSelection(gameObject) {
        gameObject.borders = new PIBordersBuild(gameObject.displayItem)
        this.selectedGameObjects.push(gameObject)
    }
}