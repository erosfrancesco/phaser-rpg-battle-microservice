export default function WidgetBridge(itemProps, selectedItem) {
        console.log(itemProps, selectedItem.data)
        if (!selectedItem) {
                return
        }
                
                // if (selectedItem.selectedOldPointers) {
                //         return
                // }
                // selectedItem.selectedOldPointers = {x: false, y: false, width: false, height: false}

                // id - standard
                const id = document.createElement("h4")
                id.innerHTML = selectedItem.id
                id.style.color = "white"
                itemProps.appendChild(id)

                if (!selectedItem.encodedProperties) {
                        selectedItem.selectedOldPointers = false
                        id.innerHTML = "Item has no displayable properties"
                        return       
                }

                const sections = {}
                selectedItem.encodedProperties.forEach(encoded => {
                        
                        const {input, type, style, build, onchange, onkeydown, section = 1} = encoded
                        let el = {}
                        if (!input) {
                                el = document.createElement(type)
                        } else {
                                const { type, value, name } = input
                                el = UIInput(name, type, value)
                        }


                        sections[section] = sections[section] || createSection(itemProps, section)
                        sections[section].appendChild(el)


                        if (build) { build(el) }
                        if (onchange) { el.input.onchange = e => onchange(el, e) }
                        if (onkeydown) { el.input.onkeydown = e => onkeydown(el, e) }

                        Object.keys(style).forEach(key => {
                                const value = style[key]
                                el.style[key] = value
                        })
                })
}

function createSection(parent, id) {
        const div = document.createElement('div')
        div.id = id
        div.style.margin = "auto"
        div.style.marginTop = "15px"
        parent.appendChild(div)
        return div
}


function UIInput(name = "", type = "text", value = "") {
        const div = document.createElement('div')
        div.style.margin = "auto"

        const input = document.createElement('input')
        input.type = type
        input.value = value

        const text = document.createElement('span')
        text.innerHTML = name + " "
        text.style.color = "white"

        div.appendChild(text)
        div.appendChild(input)
        div.input = input
        return div
}