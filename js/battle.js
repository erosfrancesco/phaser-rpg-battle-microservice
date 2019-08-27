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

        this.battleTemplate = params.battle
    }
    
    preload() {
        super.preload();
        this.createLoadingBar();

        const battleOptions = this.builders.battles.getAt(0);
        this.battleTemplate = Object.assign(this.battleTemplate, battleOptions);

        this.battleTemplate.events.preload(this);
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

            if (protoObject) {
                buildBattleActor(this, {
                    protoObject,
                    options
                });
            } else {
                console.log("building. actor not found: ", id);
            }

            
        });


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

        //this.battleTemplate.events.update(this);
    }


    /*Loading bar*/
    createLoadingBar() {
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRoundedRect(240, 270, 320, 50);
        
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
            
        this.load.on('progress', value => {
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRoundedRect(250, 280, 300 * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
        });
    }
};
//
