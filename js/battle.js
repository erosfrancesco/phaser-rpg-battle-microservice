const __scene_key = "BattleScene";


// IMPORTS
import StoreScene from "../stores/index.js";
import MenuStore from "../js/menu/menuStore.js";

import StackRegistry from "../js/utils/StackRegistry.js";
import FiniteStateStack from "../js/utils/finiteStateStack.js";

import buildBattleActor from "../js/actorController.js";
import buildBattleTurn from "../js/turnController.js";
import buildBattleController from "../js/battleController.js";
//

// test
//import menuStore from "../js/uniquemenus/menus.js";
//import FightMenuWrapper from "../js/menu/menus/fightMenuWrapper.js";
//import buildBattleController from "../js/battleController.js";


// MOCK BATTLE CONTROLLER
export default class BattleScene extends StoreScene {
    constructor(...args) {
        super(...args);
        // MENU STORE
        this.Menus = new MenuStore(this);
    }

    static get key() {
        return __scene_key;
    }


    // PHASER 3 SCENE METHODS
    init(params) {
        super.init(params);
        const battleOptions = this.stores.BattleOptions.get(params.battle);
        this.battleTemplate = Object.assign(params.battle, battleOptions);
    }
    
    preload() {
        this.battleTemplate.actors.forEach(actor => {
            const {label} = actor;
            this.stores.Actors.preload(label);
        });

        this.stores.BattleObjects.forEach(label => this.stores.BattleObjects.preload(label));

        this.battleTemplate.events.preload(this)
    }

    create() {

        // Actor stacks and Turn queue
        this.Players = new StackRegistry();
        this.Players.labelId = "p-";
        this.Enemies = new StackRegistry();
        this.Enemies.labelId = "e-";
        this.turnExecutionQueue = new FiniteStateStack();
        buildBattleTurn(this);

        // Battle onWin and onLose
        buildBattleController(this, 
            () => this.battleTemplate.events.onWin(this), 
            () => this.battleTemplate.events.onLose(this) 
        );
        
        // ACTORS
        this.battleTemplate.actors.forEach(template => buildBattleActor(this, template) );
        this.battleTemplate.events.create(this);
    }
    
    update() {
        this.battleUpdate(() => {
            this.turnExecutionQueue.update();
            if (this.turnsAreStopped) {
                return;
            }
            this.Players.update();
            this.Enemies.update();
            this.Players.forEach(a => a.Turn.update());
            this.Enemies.forEach(a => a.Turn.update());
        });
        this.battleTemplate.events.update(this);
    }
};
//