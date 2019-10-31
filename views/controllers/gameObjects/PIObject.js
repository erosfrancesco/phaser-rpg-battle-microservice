import SmartGuides from '../utils/SmartGuides/SmartGuides.js'

import SmartLineHor from "../utils/SmartGuides/SmartLineHor.js"
import SmartLineVer from "../utils/SmartGuides/SmartLineVer.js"


export default class PIObject {
    constructor(item) {
        this.displayItem = item
        item.gameObject = this
        item.scene.addGameObject(this)
        
        item.data = item.data || {}
        item.data = Object.assign(item.data, {
            customObservers: {},
            displayableProperties: buildBasicJSONEncodedProps(this),
            smartGuides: new SmartGuides(this, [
                { x: 0, y: 0 }, 
                { x: 1, y: 0 }, 
                { x: 1, y: 1 }, 
                { x: 0, y: 1 }, 
                { x: 0.5, y: 0.5 }
            ]) 
        })

        this.addChangeEventOn("x", v => {
            this.displayItem.scene.forEachGameObject(gameobject2 => {
                if (this.id === gameobject2.id) {
                    return
                }

                if (this.data.smartGuideX) {
                    this.data.smartGuideX.destroy()
                    this.data.smartGuideX = false
                }

                const {points} = gameobject2.item.data.smartGuides
                const couple = this.data.smartGuides.checkXWith(gameobject2.item, points, 10)

                if (!couple) {
                    return
                }

                const {x, width} = gameobject2.item
                const m = couple[1].x
                const smartX = x + m * width
                this.data.smartGuideX = new SmartLineVer(this.displayItem.scene, smartX - width / 2)
                this.data.smartGuideX.delta = (couple[1].x - couple[0].x)
            })
            
        })
        
    }

    get data() { return this.displayItem.data }
    set data(v) { this.displayItem.data = v; this.informAllObserverOf("data") }

    addChangeEventOn(prop, observer) {
        const displayableProps = this.data.customObservers
        displayableProps[prop] = displayableProps[prop] || {}
        const index = Object.keys(displayableProps[prop]).length
        displayableProps[prop][index] = observer

        return index
    }

    removeChangeEventOn(prop, index) {
        const displayableProps = this.data.customObservers
        if ( !(displayableProps[prop] && displayableProps[prop][index]) ) {

        }
        displayableProps[prop][index] = false
    }

    informAllObserverOf(prop) {
        const displayableProp = this.data.customObservers[prop]
        if ( !displayableProp ) {
            return
        }

        Object.keys(displayableProp).forEach(key => {   
            const observer = displayableProp[key]
            observer(this[prop], this)
        })
    }

    

    get x() { return Number(this.displayItem.x) }
    set x(va) { this.displayItem.x = Number(va); this.informAllObserverOf("x") }

    get y() { return Number(this.displayItem.y) }
    set y(va) { this.displayItem.y = Number(va); this.informAllObserverOf("y") }

    get width() { return Number(this.displayItem.displayWidth) }
    set width(va) { this.displayItem.width = Number(va); this.informAllObserverOf("width") }

    get height() { return Number(this.displayItem.height) }
    set height(va) { this.displayItem.height = Number(va); this.informAllObserverOf("height") }

    get scaleX() { return Number(this.displayItem.scaleX) }
    set scaleX(va) { this.displayItem.scaleX = Number(va); this.informAllObserverOf("scaleX") }

    get scaleX() { return Number(this.displayItem.scaleY) }
    set scaleY(va) { this.displayItem.scaleY = Number(va); this.informAllObserverOf("scaleY") }
    

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



function buildBasicJSONEncodedProps(i) {
    const o = i.displayItem
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
                v => i.addChangeEventOn("x", () => { v.input.value = o.x }),
                v => { o.x = v.input.value }
            ],
            section: 2
        },
        y: {
            builder: "textUIEncodedProperty",
            args: ["number", "y"],
            events: [
                v => i.addChangeEventOn("y", () => { v.input.value = o.y }),
                v => { o.y = v.input.value }
            ],
            section: 2
        }
        ,
        width: {
            builder: "textUIEncodedProperty",
            args: ["number", "width"],
            events: [
                v => {
                    i.addChangeEventOn("width", () => { v.input.value = o.displayWidth })
                    i.addChangeEventOn("scaleX", () => { v.input.value = o.displayWidth })
                },
                v => { o.width = v.input.value }
            ],
            section: 2
        },
        height: {
            builder: "textUIEncodedProperty",
            args: ["number", "height"],
            events: [
                v => {
                    i.addChangeEventOn("height", () => { v.input.value = o.displayHeight })
                    i.addChangeEventOn("scaleY", () => { v.input.value = o.displayHeight })
                },
                v => {o.height = v.input.value}
            ],
            section: 2
        }
    }
}