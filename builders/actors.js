import protoBuilder from "./protoBuilder.js";

const statParser = stats => {
    let ret = {};
    stats.forEach(stat => {
        const {name, value} = stat;
        ret[name] = Number(value);
    });

    return ret;
}

const commandParser = (commands, scene) => {
    let ret = [];
    commands.forEach(id => ret.push(scene.builders.commands.get(id)));
    return ret;
}

const actorBuilder = (properties, scene) => {
    const {
        stats,
        actorCommands,
        name,
        canBeAlly,
        canBeEnemy,
        sprite,
        ai
    } = properties;

    const actorPrototype = {

        preload: () => {
            const spriteProto = scene.builders.sprites.get(sprite)
            spriteProto.preload();
        },
        create: (x, y, isEnemyOpt = false, isAllyOpt = false) => {
            const spriteProto = scene.builders.sprites.get(sprite);
            const spriteObj = spriteProto.create(scene, x, y);
            
            // check if can be enemy or ally, or none
            // if (!isEnemyOpt) {
            //     spriteObj.flipX();
            // }


            const Sprite = spriteObj;
            const Commands = commandParser(actorCommands, scene);
            const AI = scene.builders.ai.get(ai);
            const statspp = statParser(stats)

            const isAlly = () => isAllyOpt
            const isEnemy = () => isEnemyOpt



            return {AI, Commands, Sprite, isAlly, isEnemy, name, stats: statspp}
        },

        canBeAlly,
        canBeEnemy,
        name,
        //stats: statParser(stats)
    }
    
    return actorPrototype;
};

const builder = protoBuilder((properties, scene) => actorBuilder(properties, scene) );
export default builder


/*
stats
actorCommands
name
canBeAlly
canBeEnemy
sprite
ai
*/













// import storeFactory from "./store.js";

// const build = (name, isEnemy = false, AIIndex = 0, spriteIndex, commands, stats) => {

// 	const spriteStore = Store.scene.stores.Sprites;
// 	const commandStore = Store.scene.stores.ActorCommands;
// 	const aiStore = Store.scene.stores.AIs;

//     const Actor = {
//         commands,
//         preload: scene => {
//         	Actor.spriteStoreLabel = spriteStore.getLabel(Number(spriteIndex));
//         	spriteStore.preload(Actor.spriteStoreLabel);
//         },
//         create: (scene, x = 0, y = 0, switchSide = false) => {
//             isEnemy = switchSide ? !isEnemy : isEnemy;
            
//         	const AI = aiStore.getAt(AIIndex);
//         	const Sprite = spriteStore.create(Actor.spriteStoreLabel, x, y);
//             isEnemy ? "" : Sprite.flipX();
//         	const Commands = [];
//         	Actor.commands.forEach(commandIndx => {
//         		const label = commandStore.getLabel(commandIndx);
//         		const command = commandStore.get(label);
//         		Commands.push(command);
//         	});
//         	return {Sprite, Commands, name, isEnemy, AI, stats};
//         }
//     };
//     return Actor;
// };


// const Store = storeFactory((resource) => {
// 	const {name, isEnemy, AI, sprite, actorCommands, stats} = resource;
//     return build(name, isEnemy, AI, sprite, actorCommands, stats);
// });

// export default Store;