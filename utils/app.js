const margin = "30px"

import config from "./config.js";

const initApp = () => {
    window.addEventListener('resize', e => resizeApp() );      
    resizeApp();
}

// Resize
const resizeApp = () => {
    const div = document.getElementById('game-container');
    
    if (!div) { return; }

    const ratio = config.height / config.width;

    ( window.innerHeight > (window.innerWidth * ratio) ) ? resizeDivByHeight(div, ratio) : resizeDivByWidth(div, ratio);
}

const resizeDivByWidth = (div, ratio) => {
	div.style.height = "calc(100% - " + margin + ")";
    div.style.width  = "calc(" + (100 / ratio) + "vh - " + margin + ")";
    div.style.marginTop  = "calc(50% - (" + div.style.height + " / 2) - (" + margin + ") / 2)";
}

const resizeDivByHeight = (div, ratio) => {
	div.style.width  = "calc(100% - " + margin + ")";
    div.style.height = "calc(" + (100 * ratio) + "vw - " + margin + ")";
    div.style.marginTop  = "calc(50vh - (" + div.style.height + " / 2) - (" + margin + ") / 2)";
}

initApp();

const game = new Phaser.Game(config);

export default game;