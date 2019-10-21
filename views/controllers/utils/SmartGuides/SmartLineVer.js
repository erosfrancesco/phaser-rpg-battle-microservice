export default class SmartLineVer extends Phaser.GameObjects.Line {
    constructor(scene, x = 100) {
        if (!scene) {
            console.error("HEY! SmartLineVer needs a scene!")
            return
        }

        super(scene, x, 0, 0, 0, 0, 1000, 0xfff)
        scene.add.existing(this)
    } 

    set position(v) {
        this.x = v
    }
}