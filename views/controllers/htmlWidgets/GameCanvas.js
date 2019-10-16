import config from '../config.js'

function GameCanvas(document) {
        const wrapper = document.createElement('div')
        const canvas = document.createElement('div')
        document.body.appendChild(wrapper)
        wrapper.appendChild(canvas)
        
        canvas.id = config.parent
        wrapper.style.width = "100%"
        wrapper.style.background = "grey"
        window.GameCanvas = wrapper

        const ratio = config.width / config.height
        const margin = "30px"

        // Resize
        wrapper.resizeCanvas = () => {
                (wrapper.innerHeight > wrapper.innerWidth * ratio) ? resizeDivByHeight() : resizeDivByWidth();
        }
        
        const resizeDivByWidth = () => {
                wrapper.style.height = "calc(100% - " + margin + ")";
                wrapper.style.width  = "calc(" + (100 / ratio) + "% - " + margin + ")";
                wrapper.style.marginTop  = "calc(50% - (" + wrapper.style.height + " / 2) - (" + margin + ") / 2)";
        }
        
        const resizeDivByHeight = () => {
                wrapper.style.width  = "calc(100% - " + margin + ")";
                wrapper.style.height = "calc(" + (100 * ratio) + "% - " + margin + ")";
                wrapper.style.marginTop  = "calc(50% - (" + wrapper.style.height + " / 2) - (" + margin + ") / 2)";
        }

        wrapper.addEventListener('resize', e => wrapper.resizeCanvas() ); 
        wrapper.resizeCanvas();
}

function LeftBox(document) {
        const leftBox = document.createElement('div')
        document.body.appendChild(leftBox)
        
        leftBox.id = "box-container" 
        leftBox.style.position = "absolute"
        leftBox.style.top = "0%"
        leftBox.style.right = "0%"
        leftBox.style.width = "18%"
        leftBox.style.height = "100%"
        leftBox.style.background = "black"


        leftBox.show = () => {
                leftBox.isShowing = true

                if (window.GameCanvas) {
                        window.GameCanvas.style.width = "79%"  
                }

                leftBox.style.width = "18%"
        }
        leftBox.hide = () => {
                leftBox.isShowing = false
                if (window.GameCanvas) {
                        window.GameCanvas.style.width = "100%"  
                }
                leftBox.style.width = "0%"
        }
        leftBox.toggle = () => {
                leftBox.isShowing ? leftBox.hide() : leftBox.show() 
        }

        leftBox.hide()
        window.LeftBox = leftBox

        const button = document.createElement("button")
        button.innerHTML = "Properties"
        button.onclick = () => window.LeftBox.toggle()
        button.style.position = "absolute"
        button.style.top = "1%"
        button.style.left = "1%"
        document.body.appendChild(button)

        SelectedItemProperties()
}

function SelectedItemProperties() {
        const itemProps = document.createElement('div')
        window.LeftBox.appendChild(itemProps)
        
        itemProps.style.position = "absolute"
        itemProps.style.top = "4px"
        itemProps.style.left = "4px"
        itemProps.style.width = "calc(100% - 8px)"
        itemProps.style.height = "calc(100% - 8px)"
        itemProps.style.display = "block"

        window.ItemProperties = itemProps

        itemProps.update = () => {
                if (window.currentSelectedItem) {
                        
                        if (window.currentSelectedItem.selectedOldPointers) {
                                return
                        }
                        window.currentSelectedItem.selectedOldPointers = {x: false, y: false, width: false, height: false}

                        const itemX = UIInput("x", "number", window.currentSelectedItem.item.x)
                        itemProps.appendChild(itemX)
                        window.currentSelectedItem.addChangeEventOn("x", v => { itemX.input.value = v })
                        itemX.input.onkeydown = () => window.currentSelectedItem.modifyProperty("x", itemX.input.value)
                        

                        const itemY = UIInput("y", "number", window.currentSelectedItem.item.y)
                        itemProps.appendChild(itemY)
                        window.currentSelectedItem.addChangeEventOn("y", v => { itemY.input.value = v })
                        itemY.input.onkeydown = () => window.currentSelectedItem.modifyProperty("y", itemY.input.value)


                        const itemW = UIInput("width", "number", window.currentSelectedItem.item.width)
                        itemProps.appendChild(itemW)
                        window.currentSelectedItem.addChangeEventOn("width", v => { itemW.input.value = v })
                        itemW.input.onkeydown = () => window.currentSelectedItem.modifyProperty("width", itemW.input.value)


                        const itemH = UIInput("height", "number", window.currentSelectedItem.item.height)
                        itemProps.appendChild(itemH)
                        window.currentSelectedItem.addChangeEventOn("height", v => { itemH.input.value = v })
                        itemH.input.onkeydown = () => window.currentSelectedItem.modifyProperty("height", itemH.input.value)

                        
                        const itemC = UIInput("color", "color", '#' + window.currentSelectedItem.item.fillColor.toString(16) )
                        itemProps.appendChild(itemC)
                        itemC.input.onchange = () => { window.currentSelectedItem.item.fillColor = '0x' + itemC.input.value.substr(1); }
                }
        }
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

export default  {
        GameCanvas,
        LeftBox
}