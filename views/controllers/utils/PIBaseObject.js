import CornerArrows from './CornerArrows.js'
import DragWrapper from './DragWrapper.js'

export default class PIBaseObject {
    constructor(item) {
        this.item = item
        this.events = {}
        item.scene.addGameObject(this)
        setOnClick(this)
    }

    addChangeEventOn (prop, callback) {
        this.events[prop] = this.events[prop] || {}
        const index = Object.keys(this.events[prop]).length
        this.events[prop][index] = callback
        return index
    }

    removeChangeEventOn (prop, index) {
        this.events[prop][index] = false
    }

    modifyProperty (prop, newValue) {
        modifyProperty(this, prop, newValue);
        if (this.events[prop]) {
            Object.keys(this.events[prop]).forEach(index => {
                if (this.events[prop][index]) {
                    this.events[prop][index](newValue, this.item)
                }
            })
        }
    }

    
    hideArrows () {
        Object.keys(this.decorators.oldArrowIndexes).forEach(key => {
            const index = this.decorators.oldArrowIndexes[key]
            this.removeChangeEventOn(key, index)
        })

        // remove arrows
        this.decorators.center.destroy()
        this.decorators.corners.destroy()
    }

    showArrows () {
        this.decorators = setDecoratorsTo(this, this.item.scene)
    }
}
 


function setOnClick(PIitem) {
    PIitem.item.setInteractive().setOrigin(0, 0).on("pointerdown", () => {
        if (window.currentSelectedItem && window.currentSelectedItem.id === PIitem.id) {
            console.log("same item")
            return
        }
        PIitem.item.scene.selectItem(PIitem) 
    })
}


function modifyProperty(o, prop, newValue) {
    o.item[prop] = newValue
}

function setDecoratorsTo(PIitem) {
    const {scene} = PIitem.item
    const corners = new CornerArrows(scene, PIitem)

    const s = 14
    const ccHor = scene.add.line(s / 2, s / 2, 0, 0, s, 0, 0xfff)
    const ccVer = scene.add.line(s / 2, s / 2, 0, 0, 0, s, 0xfff)
    const center = new DragWrapper(scene, 0, 0, s, s, ccHor, ccVer)
    center.setColor(0xffffff)
    center.setOpacity(0.2)

    center.alignToParent = () => {
        center.x = PIitem.item.x + (PIitem.item.width / 2) - (s / 2)
        center.y = PIitem.item.y + (PIitem.item.height / 2) - (s / 2)
    }
    center.onDrag.push( (...args) => {
        const [p, x, y] = args
        PIitem.modifyProperty("x", x - (PIitem.item.width / 2) + s / 2)
        PIitem.modifyProperty("y", y - (PIitem.item.height / 2) + s / 2)
        corners.alignToParent()
    })

    const x = PIitem.addChangeEventOn("x", v => {
        center.alignToParent()
        corners.alignToParent()
    })

    const y = PIitem.addChangeEventOn("y", v => {
        center.alignToParent()
        corners.alignToParent()
    })

    const width = PIitem.addChangeEventOn("width", v => {
        center.alignToParent()
        corners.alignToParent()
    })

    const height = PIitem.addChangeEventOn("height", v => {
        center.alignToParent()
        corners.alignToParent()
    })

    center.alignToParent()

    return {
        oldArrowIndexes: {x, y, width, height},
        corners,
        center
    }
}