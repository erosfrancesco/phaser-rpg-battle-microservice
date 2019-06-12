import config from "./config.js";

function initApp() {
    window.addEventListener('resize', e => resizeApp() );      
    resizeApp();
}

// Resize
function resizeApp()
{
    const div = document.getElementById('game-container');
    
    if (!div) { return; }

    const height = window.innerHeight * (8 / 6);

    div.style.width = height;
    div.style.height = height * config.height / config.width;
    // console debug
    //console.log('resizing');
}
        


initApp();

const game = new Phaser.Game(config);

export default game;