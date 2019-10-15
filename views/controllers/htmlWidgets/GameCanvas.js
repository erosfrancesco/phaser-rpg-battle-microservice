/*
<div style="width: 79%; height: 100%;">
        <div id="game-container"></div>
</div>
*/

function GameCanvas(document) {
        const wrapper = document.createElement('div')
        const canvas = document.createElement('div')
        document.body.appendChild(wrapper)
        wrapper.appendChild(canvas)
        
        canvas.id = "game-container" // get it from config...
        wrapper.style.width = "100%"
        // wrapper.style.height = "200%"
        wrapper.style.background = "grey"
        window.GameCanvas = wrapper

        const ratio = 900 / 500 // get it from config...
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

/*
<div id="property-box" style="position:absolute; top: 0%; right: 0%; width: 20%; height: 100%; background: grey;">
</div>
*/

function LeftBox(document) {
        const leftBox = document.createElement('div')
        document.body.appendChild(leftBox)
        
        leftBox.id = "game-container" 
        leftBox.style.position = "absolute"
        leftBox.style.top = "0%"
        leftBox.style.right = "0%"
        leftBox.style.width = "18%"
        leftBox.style.height = "100%"
        leftBox.style.background = "grey"


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
}

export default  {
        GameCanvas,
        LeftBox
}