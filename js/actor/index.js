import TurnSystem from "./actorTurn.js";
import StatPlugin from "./stats/index.js";

// MOCK ACTOR CONTROLLER
const buildBattleActor = (scene, actor, template = {}) => {

    // adjust sprite
    if (actor.isAlly()) {
        actor.Sprite.flipX();
    }
    

    // turn
    actor.Turn = new TurnSystem(actor);

    StatPlugin(actor, template.stats);

    // events & helpers
    actor.events = Object.assign(actor.events, {
        // damage: c => c(),
        // ko:  c => c()
    });

    actor.checkDeath = callback => {
        if (actor.getLife() <= 0) {
            actor.events.ko(() => callback());
            return;
        }
        callback();
    }

    actor.applyDamage = (value, callback = function() {}) => {
        const dmg = actor.Stats.getStatModifier("damage", "life");
        actor.Stats.putStatModifier("damage", "life", { value: dmg - value });
        actor.events.damage(() => actor.checkDeath(callback) );
    }

    actor.useMana = value => {
        const dmg = actor.Stats.getStatModifier("usedMana", "remainingMana");
        actor.Stats.putStatModifier("usedMana", "remainingMana", { value: dmg - value });
    }

    actor.events.create(scene, actor, () => {});
}


export default buildBattleActor;