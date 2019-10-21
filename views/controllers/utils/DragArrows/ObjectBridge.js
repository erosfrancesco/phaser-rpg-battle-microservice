import CornerArrows from './CornerArrows.js'
import SmartPoint from './SmartPoint.js'

export default function setDecoratorsTo(PIitem) {
    const corners = new CornerArrows(PIitem.scene, PIitem)
    const center = new SmartPoint(PIitem.scene, 0, 0, "center")
    center.alignToCenterOf(PIitem)

    center.onDragEnd.push( (...args) => PIitem.events.onDragEnd.forEach(f => f(...args)) );
    center.onDrag.push( (...args) => PIitem.events.onDrag.forEach(f => f(...args)) );

    center.onDrag.push( (...args) => {
        const [p, x, y] = args
        PIitem.modifyProperty("x", x - (PIitem.width - center.width) / 2 )
        PIitem.modifyProperty("y", y - (PIitem.height - center.width) / 2 )
        corners.alignToParent()
    })

    const x = PIitem.addChangeEventOn("x", v => {
        center.alignToCenterOf(PIitem)
        corners.alignToParent()
    })

    const y = PIitem.addChangeEventOn("y", v => {
        center.alignToCenterOf(PIitem)
        corners.alignToParent()
    })

    const width = PIitem.addChangeEventOn("width", v => {
        center.alignToCenterOf(PIitem)
        corners.alignToParent()
    })

    const height = PIitem.addChangeEventOn("height", v => {
        center.alignToCenterOf(PIitem)
        corners.alignToParent()
    })


    return {
        oldArrowIndexes: {x, y, width, height},
        corners,
        center
    }
}