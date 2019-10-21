const defaultColor = 0x666;

import PIBaseObject from '../utils/PIBaseObject.js'
import JSONBridge from '../utils/Encoding/JSONBridge.js'
const {simpleUIEncodedProperty, textUIEncodedProperty} = JSONBridge

export default class PIView extends PIBaseObject {
 
    constructor(scene, ...args) {
        if (!scene) {
            console.error("Hey! PIView needs a scene parent")
            return
        }

        if (args[1]) {
            const [x = 0, y = 0, w = 10, h = 10, r = 0, color = defaultColor] = args
            super(scene.rexUI.add.roundRectangle(x, y, w, h, r, color))
        } else {
            
            const { x = 0, y = 0, w = 100, h = 100, r = 0, color = defaultColor } = args
            super(scene.rexUI.add.roundRectangle(x, y, w, h, r, color))
        }
    }

    get radius() { return this.item.radius }
    set radius(va) { this.item.radius = Number(va) }

    get color() { return this.item.fillColor }
    set color(va) { this.item.fillColor = va }

    get opacity() { return this.item.fillAlpha }
    set opacity(va) { this.item.fillAlpha = Number(va) }

    get convertedToJSON() {
        const {color, radius, opacity} = this
        return Object.assign(super.convertedToJSON, {color, radius, opacity})
    }
    get JSONEncodedProps() {
        return Object.assign(super.JSONEncodedProps, {
            radius: {
                builder: "textUIEncodedProperty",
                args: ["number", "radius"],
                events: [
                    undefined, undefined, v => { this.radius = v.input.value }
                ],
                section: 2
            },
        
            color: {
                builder: "textUIEncodedProperty",
                args: ["color", "color"],
                events: [
                    v => { v.input.value = '#' + this.color.toString(16) }, 
                    undefined, 
                    v => { this.color = '0x' + v.input.value.substr(1); }
                ],
                section: 3
            },
            opacity: {
                section: 3,
                builder: "textUIEncodedProperty",
                args: ["number", "opacity (%)"],
                events: [
                    el => { el.input.value = this.opacity * 100 }, 
                    undefined,
                    v => { this.opacity = v.input.value / 100 }]
            }
        })
    }
}