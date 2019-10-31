export default class SmartLineHor extends Phaser.GameObjects.Line {
    constructor(scene, y = 100) {
        if (!scene) {
            console.error("HEY! SmartLineHor needs a scene!")
            return
        }

        super(scene, 0, y, 0, 0, 10000, 0, 0xfff)
        scene.add.existing(this)
    }

    set position(v) {
        this.y = v
    }
}