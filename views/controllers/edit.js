import GameObjectsPoolScene from './utils/gameObjectManagerScene.js';
import PIView from "./gameObjects/PIView.js"

class EditObject extends GameObjectsPoolScene {
    constructor() {
        super()
    }

    preload() {
        super.preload()
    }

    create() {
        const back = new PIView(this, 300, 150, 40, 80, 0, 0xffffff)
        const front = new PIView(this, 200, 250, 40, 80, 0, 0xfaafff)
    }
        

    selectItem(PIitem) {
        if (window.currentSelectedItem) {
            this.removeSelectedItem()
        }

        this.setSelectedItem(PIitem)
    }

    setSelectedItem(PIitem) {
        PIitem.showArrows()
        window.currentSelectedItem = PIitem
        window.ItemProperties.update()
    }

    removeSelectedItem() {
        Object.keys(window.currentSelectedItem.selectedOldPointers).forEach(key => {
            const index = window.currentSelectedItem.selectedOldPointers[key]
            window.currentSelectedItem.removeChangeEventOn(key, index)
        })
        window.currentSelectedItem.selectedOldPointers = false

        window.currentSelectedItem.hideArrows()
        window.currentSelectedItem = false

        window.ItemProperties.innerHTML = ""
    }
}


import config from './config.js'
config.scene = EditObject

export default new Phaser.Game(config);