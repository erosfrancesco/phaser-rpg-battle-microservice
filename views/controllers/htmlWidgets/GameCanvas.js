import config from '../config.js'
import LeftPanel from './LeftPanel.js'
import RightPanel from './RightPanel.js'

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
        wrapper.resizeCanvas = () => (wrapper.innerHeight > wrapper.innerWidth * ratio) ? resizeDivByHeight() : resizeDivByWidth();
        
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

export default  {
        GameCanvas,
        RightPanel,
        LeftPanel
}