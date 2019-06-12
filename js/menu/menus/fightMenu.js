import Menu from "../menu.js";

export default class FightMenu extends Menu {

    constructor(scene) {
        const width = 150;
        const height = 200;
        const x = 400;
        const y = 250;
        super(x, y, width, height, scene);

        this.tweenMap = { };
        const options = { x: 0, y: 0, width, height };
        this.background = scene.stores.BattleObjects.create("BluePanel", options);
        this.add(this.background.graphic);
    }

    
    animationOpen(onComplete) {
        this.isAnimating = true;
        this.background.play("open", (...args) => {
            this.isAnimating = false;
            onComplete(...args)
        });
    }

    animationClose(onComplete = function() {}) {
        this.isAnimating = true;
        this.menuItems.forEach(item => item.destroy() );
        this.background.play("close", () => { 
            this.isAnimating = false;
            this.destroy(); 
            onComplete(); 
        });
    }
    

    draw( x = 0, y = 0, width = this.displayWidth, height = this.displayHeight ) {
        this.background.draw(x, y, width, height);
    }

    destroy() {
        super.destroy(); 
        this.background.destroy(); 
    }
};
