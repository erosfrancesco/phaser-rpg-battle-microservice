// import WidgetBridge from './WidgetBridge.js'
import BuildPropertyPanel from './PropertiesPanel.js'

export default function RightPanel(document) {
        const rightBox = document.createElement('div')
        document.body.appendChild(rightBox)
        
        rightBox.id = "box-container" 
        rightBox.style.position = "absolute"
        rightBox.style.top = "0%"
        rightBox.style.right = "0%"
        rightBox.style.width = "18%"
        rightBox.style.height = "100%"
        rightBox.style.background = "black"


        rightBox.show = () => {
                rightBox.isShowing = true

                if (window.GameCanvas) {
                        window.GameCanvas.style.width = "79%"  
                }

                rightBox.style.width = "18%"
        }
        rightBox.hide = () => {
                rightBox.isShowing = false
                if (window.GameCanvas) {
                        window.GameCanvas.style.width = "100%"  
                }
                rightBox.style.width = "0%"
        }
        rightBox.toggle = () => {
                rightBox.isShowing ? rightBox.hide() : rightBox.show() 
        }

        rightBox.hide()
        window.RightBox = rightBox

        const button = document.createElement("button")
        button.innerHTML = "Properties"
        button.onclick = () => window.RightBox.toggle()
        button.style.position = "absolute"
        button.style.top = "1%"
        button.style.left = "1%"
        document.body.appendChild(button)

        SelectedItemProperties()
}

function SelectedItemProperties() {
        const itemProps = document.createElement('div')
        window.RightBox.appendChild(itemProps)
        
        itemProps.style.position = "absolute"
        itemProps.style.top = "4px"
        itemProps.style.left = "4px"
        itemProps.style.width = "calc(100% - 8px)"
        itemProps.style.height = "calc(100% - 8px)"
        itemProps.style.display = "block"

        window.ItemProperties = itemProps

        itemProps.update = () => BuildPropertyPanel(itemProps, window.currentSelectedItem)
        // WidgetBridge(itemProps, window.currentSelectedItem)
}
