function simpleUIEncodedProperty(type = "div", style = {}, build = () => {}, onchange = false, onkeydown = false) {
    return {
        type, style, build, onchange, onkeydown
    }
}

function textUIEncodedProperty(type, name, value, build, onkeydown, onchange) {
    const a = simpleUIEncodedProperty(undefined, undefined, build, onchange, onkeydown)
    a.input = { type, value, name }
    return a
}

export default {simpleUIEncodedProperty, textUIEncodedProperty}