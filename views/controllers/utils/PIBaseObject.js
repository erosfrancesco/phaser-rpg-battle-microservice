import CornerArrows from './CornerArrows.js'
import DragWrapper from './DragWrapper.js'

export default function PIBaseObjectFrom(item) {
    const a = {
        item,
        events: {},
        addChangeEventOn: (prop, callback) => {
            a.events[prop] = a.events[prop] || {}
            const index = Object.keys(a.events[prop]).length
            a.events[prop][index] = callback
            return index
        },
        removeChangeEventOn: (prop, index) => {
            a.events[prop][index] = false
        },
        modifyProperty: (prop, newValue) => {
            modifyProperty(a, prop, newValue);
            if (a.events[prop]) {
                Object.keys(a.events[prop]).forEach(index => {
                    if (a.events[prop][index]) {
                        a.events[prop][index](newValue, item)
                    }
                })
            }
        }
    };


    a.hideArrows = () => {
        Object.keys(a.decorators.oldArrowIndexes).forEach(key => {
            const index = a.decorators.oldArrowIndexes[key]
            a.removeChangeEventOn(key, index)
        })

        // remove arrows
        a.decorators.center.destroy()
        a.decorators.corners.destroy()
    }

    a.showArrows = () => {
        a.decorators = setDecoratorsTo(a, item.scene)
    }

    item.scene.addGameObject(a)
    setOnClick(a)

    return a
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