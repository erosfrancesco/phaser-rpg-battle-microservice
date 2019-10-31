export default function LeftPanel(document) {
        const leftBox = document.createElement('div')
        document.body.appendChild(leftBox)
        
        // leftBox.id = "box-container" 
        leftBox.style.position = "absolute"
        leftBox.style.top = "0%"
        leftBox.style.left = "0%"
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
        button.innerHTML = "Tree"
        button.onclick = () => window.LeftBox.toggle()
        button.style.position = "absolute"
        button.style.top = "1%"
        button.style.left = "calc(1% + 100px)"
        document.body.appendChild(button)
}