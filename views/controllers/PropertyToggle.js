const options = {
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    orientation: 0,

    // Elements
    // background: ,

    // buttons: [
    //     buttonGameObject,
    //     buttonGameObject,
    //     // ...
    // ],
    // groupName: undefined,
    // align: undefined,
    click: {
        mode: 'pointerup',
        clickInterval: 100
    },

    space: 0,

    name: 'Button'
}

import "../../utils/rexuiplugin.min.js"

export default class PropertyToggle extends RexPlugins.UI.Label {
    constructor(scene) {
        if (!scene) {
            console.error("HEY! PropertyToggle needs a scene!")
            return
        }
        super(scene, {
            width: 100,
            height: 40,
            x: 200,
            y: 190,
            background: scene.rexUI.add.roundRectangle(200, 190, 0, 0, 20, 0xff99ff),
            // text: scene.add.text(0, 0, "A", {
            //     fontSize: 18
            // }),
            space: {
                left: 10,
                right: 10,
            }
        });
        this.add( scene.add.text(0, 0, "A", {
            fontSize: 18
        }) )


        // super.on('click', function (button, index, pointer, event) {
        //     console.log(`Click button-${button.text}`);
        // })
    }
}


// function create(scene) {
//     var buttons = scene.rexUI.add.buttons({
//         x: 'left+10',
//         y: 'center',

//         orientation: 'y',

//         buttons: [
//             createButton(scene, 'A')
//         ],

//     })
//         .setOrigin(0, 0.5)
//         .layout()
//         .drawBounds(scene.add.graphics(), 0xff0000)

//     buttons
//         .on('button.click', function (button, index, pointer, event) {
//             console.log(`Click button-${button.text}`);
//         })

// }

// var createButton = function (scene, text) {
//     return scene.rexUI.add.label({
//         width: 100,
//         height: 40,
//         background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0xff99ff),
//         text: scene.add.text(0, 0, text, {
//             fontSize: 18
//         }),
//         space: {
//             left: 10,
//             right: 10,
//         }
//     });
// }