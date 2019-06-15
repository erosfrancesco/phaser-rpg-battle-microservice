/*
import actionBuilder from "./actions.js";
import actorBuilder from "./actors.js";
import aiBuilder from "./ai.js";
import commandBuilder from "./commands.js";
import objectBuilder from "./objects.js";
import spriteBuilder from "./sprites.js";
//import battleStore from "./battles.js";
/**/
import aiBuilder from "./ai.js";

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
        this.loadBuilder(aiBuilder, params.resources, "ai");
        const ai = this.builders["ai"].get("5d05547ea1e85e0017422ecb")
        ai(null, null, () => {
            console.log("control taken to main")
        })
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