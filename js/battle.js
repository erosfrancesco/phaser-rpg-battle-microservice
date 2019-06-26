const __scene_key = "BattleScene";


// IMPORTS
import AssetsScene from "../builders/index.js";

import StackRegistry from "../js/utils/stackRegistry.js";
import FiniteStateStack from "../js/utils/finiteStateStack.js";

import buildBattleActor from "../js/actorController.js";
import buildBattleTurn from "../js/turnController.js";
import buildBattleController from "../js/battleController.js";
import buildMenuManager from "../js/menuController.js";

//

// test
//import menuStore from "../js/uniquemenus/menus.js";
//import FightMenuWrapper from "../js/menu/menus/fightMenuWrapper.js";
//import buildBattleController from "../js/battleController.js";


// MOCK BATTLE CONTROLLER
export default class BattleScene extends AssetsScene {
    constructor(...args) {
        super(...args);
        // MENUS
        this.Menus = new buildMenuManager(this);
    }

    static get key() {
        return __scene_key;
    }


    // PHASER 3 SCENE METHODS
    init(params) {
        super.init(params);
        
        this.battleTemplate = Object.assign(params.battle, {});

        //const battleOptions = this.stores.BattleOptions.get(params.battle);
        //Object.assign(params.battle, battleOptions);
    }
    
    preload() {
        super.preload()

        this.battleTemplate.actors.forEach(actor => {
            const {id} = actor;
            this.builders.actors.get(id).preload();
        });

        // this.battleTemplate.events.preload(this)
    }

    create() {
        super.create()

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
        this.battleTemplate.actors.forEach(actor => {
            const {id, options} = actor;
            const protoObject = this.builders.actors.get(id);

            buildBattleActor(this, {
                protoObject,
                options
            });
        });


        //this.battleTemplate.events.create(this);
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

        // this.battleTemplate.events.update(this);
    }
};
//
