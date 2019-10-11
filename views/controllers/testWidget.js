export default class TestWidget {
    constructor(scene) {
        this.scene = scene
    }

    create(...args) {
        return this.scene.rexUI.add.label({
            background: this.roundedRect(...args),
            // text: scene.add.text(0, 0, text, {
            //     fontSize: 18
            // }),
            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            }
        });
    }

    roundedRect(...args) {
        return this.scene.rexUI.add.roundRectangle(...args)
    }
}



// const RandomInt = Phaser.Math.Between;
// const RandomItem = Phaser.Utils.Array.GetRandom;
// const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
// var genText = function () {
//     var s = '';
//     for (var j = 0, jcnt = RandomInt(3, 6); j < jcnt; j++) {
//         s += RandomItem(possible);
//     }
//     return s;
// }
