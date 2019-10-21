import DragWrapper from './DragWrapper.js'

export default class SmartPoint extends DragWrapper {
    constructor(scene, x, y, name = "") {
        if (!scene) {
            console.error("HEY! SmartPoint needs a scene!")
            return
        }

        const s = 14
        const ccHor = scene.add.line(s / 2, s / 2, 0, 0, s, 0, 0xfff)
        const ccVer = scene.add.line(s / 2, s / 2, 0, 0, 0, s, 0xfff)

        super(scene, x, y, s, s, ccHor, ccVer)
        
        this.color = 0xffffff
        this.opacity = 0.2
        this.label = name
    }

    alignToCenterOf(PIitem) {
        this.x = PIitem.x + (PIitem.width - this.width ) / 2
        this.y = PIitem.y + (PIitem.height - this.width ) / 2
    }


    get label() {
        if (!this._namePlaceholder) {
            return 
        }

        return this._namePlaceholder.text
    }
    set label(v) {
        if (!this._namePlaceholder) {
            this._namePlaceholder = this.buildPlaceholder(v)
        }

        this._namePlaceholder.text = v
    }

    buildPlaceholder(text) {
        let label = this.scene.add.text(14, -14, text, { 
            fontSize: "12px", 
            strokeThickness: 4, stroke: 0x000000,
            color: '#ffffff',
            
        })
        this.add(label)
        return label
    }   
}