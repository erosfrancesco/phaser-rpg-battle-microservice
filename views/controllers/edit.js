import GameObjectsPoolScene from './utils/gameObjectManagerScene.js';
import PIView from "./gameObjects/PIView.js"

import setSmartGuides from "./utils/SmartGuides/SceneBridge.js"
import setSelectFunctionalityTo from "./utils/SelectObject/SceneBridge.js"

class EditObject extends GameObjectsPoolScene {
    constructor() {
        super()
    }

    preload() {
        super.preload()
    }

    create() {

        setSmartGuides(this)
        setSelectFunctionalityTo(this)
        
        const back = new PIView(this)
        const front = new PIView(this, 350, 200, 40, 80, 0, 0xfaafff)

        back.setFromJSON({color: 0xffaaaa, width: 200, height: 30, x: 4, y: 400, opacity: 0.4, radius: 4})

        console.log(this.saveEdits())
        
        
    }

    addGameObject(...args) {
        super.addGameObject(...args)

        const [item] = args

        this.setSmartGuidesX(item)
        this.setSmartGuidesY(item)
    }

    saveEdits() {
        const a = {}
        super.forEachGameObject(gameObject => {
            a[gameObject.id] = gameObject.item.convertedToJSON
        })
        return a
    }
}


import config from './config.js'
config.scene = EditObject

export default new Phaser.Game(config);