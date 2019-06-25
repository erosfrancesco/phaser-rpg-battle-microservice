import buildBattleActor from "../js/actor/index.js";

function build(scene, template) {

    // BUILD
    const {protoObject, options = {}} = template;
    const {x = 0, y = 0, stats = {}, isEnemy = false, isAlly = false} = options;


    const actor = protoObject.create(x, y, isEnemy, isAlly);
    buildBattleActor(actor, options);


    // PLACEHOLDER
    const {displayWidth, displayHeight} = actor.Sprite;
    const dx = actor.isAlly() ? Number(displayWidth) : -Number(displayWidth);
    const dy = Number(displayHeight) * 2 / 3;

    actor.placeholder = {
        x: Number(x) + dx, 
        y: Number(y) - dy
    };


    // // TURN EVENTS AND UI BAR
    // //actor.statusBars = scene.stores.BattleObjects.create("PlayerBars", { actor });
    actor.events.onDamage = callback => {
        //actor.statusBars.refresh();
        callback();
    }
    actor.events.onDeath = callback => {
        console.log(actor.name, "is dead");

        // check if the turn queues have some references to this actor
        // console debug
        //console.log( "current actor on this registry: ", actor.getRegistry().stack.current() );
        //
        
        actor.getRegistry().unregister(actor.id);
        callback();
    }

    actor.Turn.events.onReady = callback => {
        actor.Turn.pause();
        actor.getRegistry().add(actor);
        callback();
    }
    actor.Turn.events.onUpdate = callback => {
        //const value = 1 + 100 * actor.Turn.counter / actor.Turn.max;
        //actor.statusBars.setATBValue(value);
        callback();
    }

    
    // METHODS
    actor.getRegistry = () => actor.isAlly() ? scene.Players : scene.Enemies;
    actor.getOtherRegistry = () => actor.isAlly() ? scene.Enemies : scene.Players;


    // AFTER BUILD
    actor.getRegistry().register(actor);
    actor.Turn.reset();
}


export default build;