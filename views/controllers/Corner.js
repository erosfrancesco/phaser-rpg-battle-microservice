import "./plugins/rexuiplugin.min.js"

export default class Corner extends RexPlugins.UI.Label {
    constructor(scene, x = 100, y = 100) {
        if (!scene) {
            console.error("HEY! Corner needs a scene!")
            return
        }

        const width = 20;
        const height = 20;

        const background = scene.rexUI.add.roundRectangle(x, y, 0, 0, 0, 0xff99ff)

        super(scene, { width, height, x, y, background });
        this.background = background

        this.setInteractive().on('pointerdown', (...args) => this.onClick(args) );
    }

    //
    onClick(...args) {
        console.log(args)
    }

    // override
    setInteractive() {
        this.background.setInteractive()
        return this;
    }
    on(...args) {
        this.background.on(...args)
    }
}