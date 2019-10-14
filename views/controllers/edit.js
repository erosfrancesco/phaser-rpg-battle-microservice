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
import PropertyButton from './PropertyToggle.js'
import Corner from './Corner.js'
import PIWrapper from './utils/PIWrapper.js'

class EditObject extends GameObjectsPoolScene {
    constructor() {
        super()
    }

    preload() {
        super.preload()
    }

    create() {
        this.propertyButton = new PropertyButton(this);
        

        const horCornerLine = this.add.line(
            0,
            0,
            0,
            0,
            0 + 15,
            0,
            0xfff
        ).setOrigin(0, 0)

        const verCornerLine = this.add.line(
            0,
            0,
            0,
            0,
            0,
            0 + 15,
            0xfff
        ).setOrigin(0, 0)

        
        this.wrapper = new PIWrapper(this, 150, 50, 15, 15, horCornerLine, verCornerLine)

        this.wrapper.onPointerDown = () => console.log("Point")
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