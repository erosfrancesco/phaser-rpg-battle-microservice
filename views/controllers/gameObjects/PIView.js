const defaultColor = 0x666;

import PIBaseObject from '../utils/PIBaseObject.js'

export default class PIView extends PIBaseObject {
 
    constructor(scene, x = 0, y = 0, w = 0, h = 0, r = 0, color = defaultColor) {
        if (!scene) {
            console.error("Hey! PIView needs a scene parent")
            return
        }
        
        super(scene.rexUI.add.roundRectangle(x, y, w, h, r, color))
    }

    get encodedProperties() {
        return [
            encodedProperty("h4", { color: "white" }, v => { v.innerHTML = window.currentSelectedItem.id }),
            textEncodedProperty("text", "name", 
                                this.name || "", 
                                false, false, 
                                v => { this.name = v.input.value; }
            ),
            textEncodedProperty("number", "x",
                                this.item.x, 
                                v => this.addChangeEventOn("x", () => { v.input.value = this.item.x }), 
                                v => this.modifyProperty("x", v.input.value)
            ),
            textEncodedProperty("number", "y", 
                                this.item.y, 
                                v => this.addChangeEventOn("y", () => { v.input.value = this.item.y }), 
                                v => this.modifyProperty("y", v.input.value)
            ),
            textEncodedProperty("number", "width",
                                this.item.width, 
                                v => this.addChangeEventOn("width", () => { v.input.value = this.item.width }), 
                                v => this.modifyProperty("width", v.input.value)
            ),
            textEncodedProperty("number", "height",
                                this.item.height, 
                                v => this.addChangeEventOn("height", () => { v.input.value = this.item.height }), 
                                v => this.modifyProperty("height", v.input.value)
            ),
            textEncodedProperty("color", "color", 
                                '#' + this.item.fillColor.toString(16), undefined, undefined,
                                v => { this.item.fillColor = '0x' + v.input.value.substr(1); }),

            textEncodedProperty("number", "radius", 
                                this.item.radius, undefined, undefined, 
                                v => { this.item.radius = Number(v.input.value) })

        ]
    }
}

function encodedProperty(   type = "div", 
                            style = {}, 
                            build = () => {}, 
                            onchange = false, 
                            onkeydown = false
) {
    return {
        type, style, build, onchange, onkeydown
    }
}

function textEncodedProperty(type, name, value, build, onkeydown, onchange) {
    const a = encodedProperty(undefined, undefined, build, onchange, onkeydown)
    a.input = { type, value, name }
    return a
}