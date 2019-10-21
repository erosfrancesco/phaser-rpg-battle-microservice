import config from '../config.js'
import WidgetBridge from './WidgetBridge.js'

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

        itemProps.update = () => WidgetBridge(itemProps, window.currentSelectedItem)
}

export default  {
        GameCanvas,
        LeftBox
}