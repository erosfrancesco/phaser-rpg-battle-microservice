const defaultMargins = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
};
const defaultColor = 0x666;

export default class PIView {
    // CONSTRUCTOR
    constructor(scene, x = 0, y = 0, w = 0, h = 0, r = 0, margins = defaultMargins, color = defaultColor) {
        if (!scene) {
            console.error("Hey! PIView needs a scene parent")
            return
        }
        
        this.parent = null
        this.item = scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(x, y, w, h, r, color),
            space: margins
        });
    }
    
    // PROPS
    get x() {
        return this.item.x
    }
    set x(v) {
        this.item.x = v
    }

    get y() {
        return this.item.x
    }
    set y(v) {
        this.item.y = v
    }

    get width() {
        return this.item.width
    }
    set width(v) {
        this.item.width = v
    }

    get height() {
        return this.item.height
    }
    set height(v) {
        this.item.height = v
    }

    get scene() {
        return this.item.scene
    }
    set scene(v) {
        this.item.scene = v
    }
}