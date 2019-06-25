import StatsSystem from "./actorStats.js";


// MOCK ACTOR CONTROLLER
const buildBattleActor = (actor, stats) => {

    // stats
    const customStats = stats || {};
    const actorStats = actor.stats || {};
    const defaultStats = {
        health: 50,
        life: actor.stats.health || 50,
        mana: 20,
        remainingMana: actor.stats.mana || 20,
        strenght: 2,
        velocity: 1
    };
    const statsTemplate = Object.assign(defaultStats, customStats, actorStats);

    actor.Stats = new StatsSystem(statsTemplate);
    actor.Stats.Modifiers.put("damage", "life", {value: 0});
    actor.Stats.Modifiers.put("usedMana", "remainingMana", {value: 0});


    // stats getters
    actor.getVelocity = () => actor.Stats.getStat("velocity");
    actor.getAttack = () => actor.Stats.getStat("strenght");
    actor.getDefense = () => actor.Stats.getStat("defense");
    actor.getMaxLife = () => actor.Stats.getStat("health");
    actor.getLife = () => {
        const a = actor.Stats.getStat("life");
        return a;
    }
    actor.getMaxMana = () => actor.Stats.getStat("mana");
    actor.getMana = () => actor.Stats.getStat("remainingMana");


    // stats bonus/malus setters
    actor.giveBonus = (id, stat, bonus) => actor.Stats.Modifiers.put(id + "-Bonus", stat, bonus);
    actor.giveMalus = (id, stat, {percentage, value}) => {
        value = -value;
        actor.Stats.Modifiers.put(id + "-Malus", stat, {percentage, value});
    };

    actor.removeBonus = (id, stat) => actor.Stats.Modifiers.remove(id + "-Bonus", stat);
    actor.removeMalus = (id, stat) => actor.Stats.Modifiers.remove(id + "-Malus", stat);

    actor.applyDamage = (value, callback = function() {}) => {
        const dmg = actor.Stats.Modifiers.get("damage", "life");
        actor.Stats.Modifiers.put("damage", "life", { value: dmg.value - value });
        actor.events.onDamage(() => actor.checkDeath(callback) );
    }

    actor.useMana = value => {
        const dmg = actor.Stats.Modifiers.get("usedMana", "remainingMana");
        actor.Stats.Modifiers.put("usedMana", "remainingMana", { value: dmg.value - value });
    }
}


export default buildBattleActor;