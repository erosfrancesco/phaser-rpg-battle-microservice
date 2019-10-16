import GameObjectsPoolScene from './utils/gameObjectManagerScene.js';
import PIBaseObject from './utils/PIBaseObject.js'

class EditObject extends GameObjectsPoolScene {
    constructor() {
        super()
    }

    preload() {
        super.preload()
    }

    create() {
        const back = this.rexUI.add.roundRectangle(300, 150, 40, 80, 0, 0xffffff)
        const item1 = PIBaseObject(back)

        const front = this.rexUI.add.roundRectangle(400, 200, 40, 80, 0, 0xff66ff)
        const item2 = PIBaseObject(front)
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