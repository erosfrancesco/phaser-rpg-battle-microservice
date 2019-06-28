import actionBuilder from "./actions.js";
import actorBuilder from "./actors.js";
import aiBuilder from "./ai.js";
import animationBuilder from "./animations.js";
import battleBuilder from "./battles.js";
import commandBuilder from "./commands.js";
import objectBuilder from "./objects.js";
import spriteBuilder from "./sprites.js";


import Game from "../utils/index.js"



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
        this.loadBuilder(animationBuilder, params.resources, "animations");
        this.loadBuilder(commandBuilder, params.resources, "commands");
        this.loadBuilder(objectBuilder, params.resources, "objects");
        this.loadBuilder(spriteBuilder, params.resources, "sprites");

        this.loadBuilder(actorBuilder, params.resources, "actors");
        this.loadBuilder(battleBuilder, params.resources, "battle");
    }


    preload() {
    }

    create() {
    }
};