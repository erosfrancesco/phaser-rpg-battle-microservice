import Menu from "../menu.js";

export default class GraphicMenu extends Menu {

    constructor(scene, targets = []) {
        super(100, 100, 400, 800, scene);
        this.targets = targets;
        targets.forEach(id => {
            const actor = scene.findActorById(id);
            const menuItem = this.addMenuItem(actor);
            menuItem.actor = id;

            menuItem.setPosition(actor.placeholder);
        });
    }

    computeItemPosition(menuItem) {
    }

    addMenuItem(character) {
        const menuItemGen = {
            scene: this.scene,
            label: character.name
        };
        
        return super.addMenuItem(menuItemGen);
    }

    

    animationOpen(onComplete = function() {}) {
        onComplete();
    }

    animationClose(onComplete = function() {}) {
        this.destroy();
        onComplete();
    }

    draw() {
    }

    destroy() {
        super.clear();
    }
};
