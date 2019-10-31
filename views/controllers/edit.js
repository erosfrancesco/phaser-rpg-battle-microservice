import PluginsScene from './select.js';
import PIBaseObject from '../PIBaseObject.js'
// import PIBordersBuild from '../PIBordersBuilder.js'

class EditObject extends PluginsScene {
    constructor() {
        super()

        this.currentSelectedItem = []
    }

    preload() {
        super.preload()

        this.load.scenePlugin({
            key: 'rexdragplugin',
            url: 'views/controllers/plugins/dragplugin.min.js',
            sceneKey: 'rexDrag'
        });
    }

    create() {
        super.create()

        const item1 = this.rexUI.add.roundRectangle(450, 250, 500, 200, 0, 0x666)
        const obj = new PIBaseObject(item1)

        // back.setFromJSON({color: 0xffaaaa, width: 200, height: 30, x: 4, y: 400, opacity: 0.4, radius: 4})
        // console.log(this.saveEdits())
    }

    // saveEdits() {
    //     const a = {}
    //     super.forEachGameObject(gameObject => {
    //         a[gameObject.id] = gameObject.item.convertedToJSON
    //     })
    //     return a
    // }
}



import config from './config.js'
config.scene = EditObject

export default new Phaser.Game(config);