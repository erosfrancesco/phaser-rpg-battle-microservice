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
    loadBuilder(builder, category) {
        builder.init(this);
        this.protoResources[category].items.forEach(builder.parse);
        this.builders[category] = builder;
    }


    // PHASER 3 SCENE METHODS
    init(params) {
        this.protoResources = params.resources;

        this.loadBuilder(actionBuilder,    "actions");
        this.loadBuilder(aiBuilder,        "ai");
        this.loadBuilder(animationBuilder, "animations");
        this.loadBuilder(commandBuilder,   "commands");
        this.loadBuilder(objectBuilder,    "objects");
        this.loadBuilder(spriteBuilder,    "sprites");
        this.loadBuilder(actorBuilder,     "actors");
        this.loadBuilder(battleBuilder,    "battles");
    }

    // preloadAllItemsFromBuilder(builder) {
    //     builder.forEach(id => {
    //         //const item = builder.get(id);
    //         //if (item) {
    //             builder.preload(id);
    //         //} else {
    //         //    console.log("item not found: ", id, builder);
    //         //}
    //     });
    // }


    preload() {

        this.builders["actions"].forEach(id => {
            const item = this.builders["actions"].get(id);
            item.setup(this);
        });

        this.builders["objects"].forEach(id => {
            const item = this.builders["objects"].get(id);
            item.setup(this);
        });

        this.builders["sprites"].forEach(id => {
            const item = this.builders["sprites"].get(id);
            item.preload(this);
        });

        //this.preloadAllItemsFromBuilder(this.builders["actions"]);
        // this.preloadAllItemsFromBuilder(this.builders["ai"]);
        // this.preloadAllItemsFromBuilder(this.builders["animations"]);
        // this.preloadAllItemsFromBuilder(this.builders["commands"]);
        // this.preloadAllItemsFromBuilder(this.builders["objects"]);
        // this.preloadAllItemsFromBuilder(this.builders["sprites"]);
        // this.preloadAllItemsFromBuilder(this.builders["actors"]);
        // this.preloadAllItemsFromBuilder(this.builders["battle"]);
    }

    create() {
    }
};