const defaultOptions = {
    x: 0, 
    y: 0, 
    fontSize: "24px"
}

export default class PILabel extends RexPlugins.UI.Label {
    constructor(scene, options = defaultOptions) {
        const {x, y, fontSize} = options
        const config = Object.assign(options, {
            text: scene.add.text(x, y, 'Hello world', { fontSize: fontSize })
        })
        super(scene, config);

        this.drag = scene.plugins.get('rexDrag').add(img);
        this.drag.drag();

        // var drag = scene.plugins.get('rexDrag').add(this, {
        //     enable: true,
        //     // axis: 0,      //0|'both'|'h&v'|1|'horizontal'|'h'|2|'vertical'|'v'
        //     // rotation: Phaser.Math.DegToRad(45)  // axis rotation in rad
        // });
        // var enable = drag.enable

        this.on('dragstart', function(pointer, dragX, dragY){ console.log("drag did start") });
        this.on('drag', function(pointer, dragX, dragY){ console.log("drag") });
        this.on('dragend', function(pointer, dragX, dragY, dropped){ console.log("drag did end") });
    }
}