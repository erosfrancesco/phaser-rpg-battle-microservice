import storeFactory from "./store.js";

const build = (filePath, frameX, frameY, frameWidth, frameHeight, scaleX, scaleY) => {
    const item = {
        preload: scene => {
            const options = { frameWidth: Number(frameWidth), frameHeight: Number(frameHeight) };
            scene.load.spritesheet(filePath, filePath, options);
        },
        create: (scene, x = 0, y = 0) => {
            
            const item = new Phaser.Physics.Matter.Sprite(scene.matter.world, Number(x), Number(y), filePath);
            item.body.isSensor = true;
            item.wrapper = scene.add.container(0, 0);
            item.wrapper.add(item);
            scene.add.existing(item);

            

            const {width} = item.frame.source;
            const factor = Math.floor( Number(width) / Number(item.width));
            const frameIndex = Number(frameX) + Number(frameY) * factor;
            

            item.setFrame(frameIndex);
            item.scaleX = scaleX / 100;
            item.scaleY = scaleY / 100;
            item.depth = item.y;

            // methods
            item.flipX = () => { item.scaleX = -item.scaleX; };

            return item;
        }
    };
    return item;
};

export default storeFactory(resource => {
    const {src, frameX, frameY, frameWidth, frameHeight, scaleX = 100, scaleY = 100} = resource;
    const filePath = "assets/sprites/" + src;
    return build(filePath, 
        Number(frameX), Number(frameY), 
        Number(frameWidth), Number(frameHeight), 
        Number(scaleX), Number(scaleY));
});