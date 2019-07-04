import config from "./config.js";

// const initApp = () => {
//     //window.addEventListener('resize', e => resizeApp() );      
//     //resizeApp();
// }

// // Resize
// const resizeApp = () => {
//     const div = document.getElementById('game-container');
    
//     if (!div) { return; }

//     (window.innerHeight > window.innerWidth) ? resizeDivByHeight(div) : resizeDivByWidth(div);

//     // const height = window.innerHeight * (8 / 6);

//     // div.style.width = height;
//     // div.style.height = height * config.height / config.width;
// }
        
// const resizeDivByWidth = div => {
// 	const size = window.innerHeight * (8 / 6);
// 	const ratio = config.height / config.width;

//     div.style.width = size;
//     div.style.height = size * ratio;
// }

// const resizeDivByHeight = div => {
// 	const size = window.innerHeight * (8 / 6);
// 	const ratio = config.height / config.width;

//     div.style.height = size;
//     div.style.width = size / ratio;
// }

// initApp();

const game = new Phaser.Game(config);

export default game;