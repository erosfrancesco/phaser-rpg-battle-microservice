
import commandStore from "./commandStore.js";
import objectStore from "./objectStore.js";
import actionStore from "./actionStore.js";
import spriteStore from "./spriteStore.js";
import actorStore from "./actorStore.js";
import aiStore from "./aiStore.js";
import battleStore from "./battleOptions.js";


export default class StoreScene extends Phaser.Scene {
	constructor(...args) {
        super(...args);
        this.stores = {};
    }


    // HELPERS
    loadStoreWith(store, resources, category) {
        store.init(this);
        resources[category].items.forEach(store.parse);
        this.stores[category] = store;
    }


    // PHASER 3 SCENE METHODS
    init(params) {
        this.loadStoreWith(commandStore, params.resources, "ActorCommands");
        this.loadStoreWith(actionStore, params.resources, "Actions");
        this.loadStoreWith(spriteStore, params.resources, "Sprites");
        this.loadStoreWith(aiStore, params.resources, "AIs");
        this.loadStoreWith(actorStore, params.resources, "Actors");
        this.loadStoreWith(objectStore, params.resources, "BattleObjects");
        this.loadStoreWith(battleStore, params.resources, "BattleOptions");
    }
};