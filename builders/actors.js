import protoBuilder from "./protoBuilder.js";

import ACTORPARSERS from "./actors/index.js";
const {statParser, commandParser, eventParser} = ACTORPARSERS;


const actorBuilder = (properties, scene) => {
    const {
        stats,
        actorCommands,
        name,
        canBeAlly,
        canBeEnemy,
        sprite,
        ai,
        events
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


            const Sprite = spriteObj;
            const Commands = commandParser(actorCommands, scene);
            const AI = scene.builders.ai.get(ai);
            const statspp = statParser(stats);
            const eventspp = eventParser(events);

            const isAlly = () => isAllyOpt
            const isEnemy = () => isEnemyOpt


            //const a = 
            return {AI, Commands, Sprite, isAlly, isEnemy, name, stats: statspp, events: eventspp};
            // a.events.create(scene, {actor: a}, () => {
            //     return a;
            // });
        },

        canBeAlly,
        canBeEnemy,
        name
    }
    
    return actorPrototype;
};

const builder = protoBuilder((properties, scene) => actorBuilder(properties, scene) );
export default builder
