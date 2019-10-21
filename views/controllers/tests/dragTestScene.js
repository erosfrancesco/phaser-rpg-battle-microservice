class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            path: './plugins/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
        this.load.scenePlugin({
            key: 'rexdragplugin',
            url: 'views/controllers/plugins/dragplugin.min.js',
            sceneKey: 'rexDrag'
        });
    }

    create() {
        const obj1 = this.rexUI.add.roundRectangle(500, 100, 100, 40, 20, 0x5e92f3);

        obj1.drag = this.rexDrag.add(obj1); // this.plugins.get('rexDrag').add(obj1);
        obj1.on('pointerdown', obj1.drag.dragend, obj1.drag);
        obj1.on('dragend', () => console.log('dragend') );
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};


export default new Phaser.Game(config);