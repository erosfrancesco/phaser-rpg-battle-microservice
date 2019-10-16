import CornerArrows from './CornerArrows.js'
import PIWrapper from './PIWrapper.js'

export default function PIBaseObjectFrom(item, scene) {
    const a = {
        item,
        events: {},
        addChangeEventOn: (prop, callback) => {
            a.events[prop] = a.events[prop] || []
            a.events[prop].unshift(callback)
            return a.events[prop].length 
        },
        removeChangeEventOn: (prop, index) => {
            a.events[prop].splice(index, 1)
        },
        modifyProperty: (prop, newValue) => {
            modifyProperty(a, prop, newValue);
            if (a.events[prop]) {
                a.events[prop].forEach(c => c(newValue, item))
            }
        }
    };

    a.decorators = setDecoratorsTo(a, scene)

    return a
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
    const center = new PIWrapper(scene, 400 - s / 2, 200 - s / 2, s, s, ccHor, ccVer)
    center.setColor(0xffffff)
    center.setOpacity(0.2)

    center.alignToParent = () => {
        center.x = PIitem.item.x - s / 2
        center.y = PIitem.item.y - s / 2
    }
    center.onDrag.push( (...args) => {
        const [p, x, y] = args
        PIitem.modifyProperty("x", x + s / 2)
        PIitem.modifyProperty("y", y + s / 2)
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

    return {
        oldArrowIndexes: {x, y, width, height},
        corners,
        center
    }
}