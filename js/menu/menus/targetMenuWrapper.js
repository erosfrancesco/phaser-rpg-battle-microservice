import TargetMenu from "./targetMenu.js";

export default class TargetMenuWrapper extends TargetMenu {

    constructor(scene, targets = [], player, actionType, ...actionArgs) {
        super(scene, targets);
        this.actionArgs = actionArgs;
        this.actionType = actionType;
        this.player = player;
    }

    buildAction(executor, target) {
        // console debug
        //console.log("building action in the menu", executor, target);
            
        this.scene.Menus.forEach(menu => menu.animationClose(() => this.scene.Menus.unload()) );
        const actor = this.scene.findActorById(executor);
        actor.executingAction = this.scene.stores.Actions.create(this.actionType, { 
            executor, target, options: this.actionArgs[0] 
        });

        this.scene.turnExecutionQueue.add(actor, undefined, undefined, (item, next) => {
            return this.scene.turnExecutionQueue.events.onRemove(item, () => { 
                next(); 
                actor.onSelectedTargets(); 
            });
        });
    }

    init(callback = () => {}) {
        const executor = this.player;

        this.menuItems.forEach(item => {
            const target = item.actor;
            item.actionWhenActive = () => this.buildAction(executor, target);
        });
        this.selectedItem.select();
        callback(this);
    }

    animationClose() {
        this.player = false;
        super.animationClose();
    }
};
