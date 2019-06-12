import storeFactory from "./store.js";

const build = (name, isEnemy = false, AIIndex = 0, spriteIndex, commands, stats) => {

	const spriteStore = Store.scene.stores.Sprites;
	const commandStore = Store.scene.stores.ActorCommands;
	const aiStore = Store.scene.stores.AIs;

    const Actor = {
        commands,
        preload: scene => {
        	Actor.spriteStoreLabel = spriteStore.getLabel(Number(spriteIndex));
        	spriteStore.preload(Actor.spriteStoreLabel);
        },
        create: (scene, x = 0, y = 0, switchSide = false) => {
            isEnemy = switchSide ? !isEnemy : isEnemy;
            
        	const AI = aiStore.getAt(AIIndex);
        	const Sprite = spriteStore.create(Actor.spriteStoreLabel, x, y);
            isEnemy ? "" : Sprite.flipX();
        	const Commands = [];
        	Actor.commands.forEach(commandIndx => {
        		const label = commandStore.getLabel(commandIndx);
        		const command = commandStore.get(label);
        		Commands.push(command);
        	});
        	return {Sprite, Commands, name, isEnemy, AI, stats};
        }
    };
    return Actor;
};


const Store = storeFactory((resource) => {
	const {name, isEnemy, AI, sprite, actorCommands, stats} = resource;
    return build(name, isEnemy, AI, sprite, actorCommands, stats);
});

export default Store;