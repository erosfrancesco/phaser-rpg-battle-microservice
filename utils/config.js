export default {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 900,
    height: 500,
    physics: {
        default: 'matter',
        matter: {
            //debug: true,
            gravity: { y: 0 }
        }
    }
};