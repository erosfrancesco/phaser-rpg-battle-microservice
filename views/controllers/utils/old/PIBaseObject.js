import ObservableProperties from './ObservableProperties.js'
import SmartGuides from './SmartGuides/SmartGuides.js'

import setDecoratorsTo from './DragArrows/ObjectBridge.js'
import setOnClick from './SelectObject/ObjectBridge.js'
import JSONBridge from './Encoding/JSONBridge.js'


export default class PIBaseObject extends ObservableProperties {
    constructor(item) {
        super()
        this.item = item
        this.events = {onDrag: [], onDragStart: [], onDragEnd: []}
        this.smartGuides = new SmartGuides(this, [
            {
                x: 0, y: 0
            }, {
                x: 1, y: 0
            }, {
                x: 1, y: 1
            }, {
                x: 0, y: 1
            }, {
                x: 0.5, y: 0.5
            }
        ])
        item.scene.addGameObject(this)
        setOnClick(this)
        this._basicJSONEncodedProps = buildBasicJSONEncodedProps(this)
    }

    get observablePath() {
        return this.item
    }

    deselect() {
        this.hideArrows()
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
        this.decorators = setDecoratorsTo(this, this.scene)
    }


    get scene() { return this.item.scene }
    set scene(va) { this.item.scene = va }

    get x() { return Number(this.item.x) }
    set x(va) { this.item.x = Number(va) }

    get y() { return Number(this.item.y) }
    set y(va) { this.item.y = Number(va) }

    get width() { return Number(this.item.width) }
    set width(va) { this.item.width = Number(va) }

    get height() { return Number(this.item.height) }
    set height(va) { this.item.height = Number(va) }


    //
    get encodedProperties() {
        const a = []
        Object.keys(this.JSONEncodedProps).forEach(key => {
            const {builder, args, events, section} = this.JSONEncodedProps[key]
            const item = JSONBridge[builder](...args, this[key], ...events)
            item.section = section

            a.push( item ) 
        })
        return a
    }

    get JSONEncodedProps() {
        return this._basicJSONEncodedProps
    }

    setFromJSON(JSONProps) {
        Object.keys(JSONProps).forEach(key => {
            const value = JSONProps[key]
            this[key] = value
        })
    }

    get convertedToJSON() {
        const {x, y, width, height} = this
        return {x, y, width, height}
    }
}



function buildBasicJSONEncodedProps(o) {
    return {
        name: {
            builder: "textUIEncodedProperty",
            args: ["text", "name"],
            events: [undefined, undefined, v => { o.name = v.input.value; }],
            section: 1
        },

        x: {
            builder: "textUIEncodedProperty",
            args: ["number", "x"],
            events: [
                v => o.addChangeEventOn("x", () => { v.input.value = o.x }), 
                v => o.modifyProperty("x", v.input.value)
            ],
            section: 2
        },
        y: {
            builder: "textUIEncodedProperty",
            args: ["number", "y"],
            events: [
                v => o.addChangeEventOn("y", () => { v.input.value = o.y }), 
                v => o.modifyProperty("y", v.input.value)
            ],
            section: 2
        },
        width: {
            builder: "textUIEncodedProperty",
            args: ["number", "width"],
            events: [
                v => o.addChangeEventOn("width", () => { v.input.value = o.width }), 
                v => o.modifyProperty("width", v.input.value)
            ],
            section: 2
        },
        height: {
            builder: "textUIEncodedProperty",
            args: ["number", "height"],
            events: [
                v => o.addChangeEventOn("height", () => { v.input.value = o.height }),
                v => o.modifyProperty("height", v.input.value)
            ],
            section: 2
        }
    }
}