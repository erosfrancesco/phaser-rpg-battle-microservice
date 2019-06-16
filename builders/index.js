/*
import actionBuilder from "./actions.js";
import actorBuilder from "./actors.js";
import aiBuilder from "./ai.js";
import commandBuilder from "./commands.js";
import objectBuilder from "./objects.js";
import spriteBuilder from "./sprites.js";
//import battleStore from "./battles.js";
/**/
import actionBuilder from "./actions.js";
import aiBuilder from "./ai.js";

import test from "./test.js";

export default class StoreScene extends Phaser.Scene {

	constructor(...args) {
        super(...args);
        this.builders = {};
    }

    static get key() { 
        return "ResourcesScene";
    }

    // HELPERS
    loadBuilder(builder, resources, category) {
        builder.init(this);
        resources[category].items.forEach(builder.parse);
        this.builders[category] = builder;
    }


    // PHASER 3 SCENE METHODS
    init(params) {
        
        this.loadBuilder(actionBuilder, params.resources, "actions");
        this.loadBuilder(aiBuilder, params.resources, "ai");

        test.ai(this);
        test.action(this);

        /*
        this.loadBuilder(commandBuilder, params.resources, "commands");
        this.loadBuilder(actionBuilder, params.resources, "actions");
        this.loadBuilder(spriteBuilder, params.resources, "sprites");
        this.loadBuilder(aiBuilder, params.resources, "ai");
        this.loadBuilder(actorBuilder, params.resources, "actors");
        this.loadBuilder(objectBuilder, params.resources, "objects");
        //this.loadBuilder(battleBuilder, params.resources, "BattleOptions");
        /**/
    }
};