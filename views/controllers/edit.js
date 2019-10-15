// const __scene_key = "EditObjectScene";

// import Demo from "./dragTestScene.js"

// IMPORTS
// import AssetsScene from "../../../builders/index.js";
// import Game from "../../utils/index.js"
// // import TestWidget from "./testWidget.js"
// import PropertyToggle from "./PropertyToggle.js"
// import PIView from "./PIView.js"
// import PILabel from "./PILabel.js"

// // MOCK BATTLE CONTROLLER
// export default class EditObjectScene extends AssetsScene {
//     constructor(...args) {
//         super(...args);
//         console.log("[EDIT OBJECT SCENE] start")
//     }

//     static get key() {
//         return __scene_key;
//     }


//     // PHASER 3 SCENE METHODS
//     init(params) {
//         super.init(params);
//     }
    
//     preload() {
//         super.preload()
//         // console.log("[EDIT OBJECT SCENE] preload ui")
//         // this.load.scenePlugin({
//         //     key: 'rexuiplugin',
//         //     url: '../../utils/rexuiplugin.min.js',
//         //     sceneKey: 'rexUI'
//         // });
//     }

//     create() {
//         super.create()
//         // this.toggleProperties = new PropertyToggle(this)
//         // this.testView = new PIView(this, 100, 100, 100, 200, 20)
//         // console.log(this.testView)
//         this.label = new PILabel(this, {
//             space: {
//                 left: 0,
//                 right: 0,
//                 top: 0,
//                 bottom: 0,
        
//                 icon: 0,
//                 text: 0,
//             },
//             fontSize: '24px',
//             x: 100,
//             y: 100,
//             draggable: true,
//         })
//     }
    
//     update() {
//     }
// };
// //

// Game.addScene(EditObjectScene);
// Game.startScene(EditObjectScene.key);
import GameObjectsPoolScene from './utils/gameObjectManagerScene.js';
// import PropertyButton from './PropertyToggle.js'
import CornerArrows from './utils/CornerArrows.js'
import PIWrapper from './utils/PIWrapper.js'

class EditObject extends GameObjectsPoolScene {
    constructor() {
        super()
    }

    preload() {
        super.preload()
    }

    create() {
        // this.propertyButton = new PropertyButton(this);
        const back = this.rexUI.add.roundRectangle(400, 200, 40, 80, 0, 0xffffff)        
        this.setDecoratorsTo(back)
    }

    setDecoratorsTo(item) {
        const corners = new CornerArrows(this, item)

        const s = 14
        const ccHor = this.add.line(s / 2, s / 2, 0, 0, s, 0, 0x333333)
        const ccVer = this.add.line(s / 2, s / 2, 0, 0, 0, s, 0x333333)
        const center = new PIWrapper(this, 400 - s / 2, 200 - s / 2, s, s, ccHor, ccVer)
        center.setColor(0x555)
        center.setOpacity(0.2)

        center.alignToParent = () => {
            center.x = item.x - s / 2
            center.y = item.y - s / 2
        }
        center.onDrag.push( (...args) => {
            const [p, x, y] = args
            item.x = x + s / 2
            item.y = y + s / 2
            corners.alignToParent()
        })

        corners.topLeft.onDrag.push(center.alignToParent)
        corners.topRight.onDrag.push(center.alignToParent)
        corners.downLeft.onDrag.push(center.alignToParent)
        corners.downRight.onDrag.push(center.alignToParent)

        item.decorators = {
            corners,
            center
        }
    }
}

var config = {
    ttype: Phaser.AUTO,
    parent: 'game-container',
    width: 900,
    height: 500,
    scene: EditObject
};

export default new Phaser.Game(config);