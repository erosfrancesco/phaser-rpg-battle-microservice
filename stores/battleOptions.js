import storeFactory from "./store.js";

const defaultWinEvent  = 'console.log("you win");  scene.pause();';
const defaultLoseEvent = 'console.log("you lose"); scene.pause();';

const build = (actors, events) => {
	const {
        preload = '', 
        create  = '', 
        update  = '', 
        onWin   = defaultWinEvent, 
        onLose  = defaultLoseEvent
    } = events;

    const item = { 
        actors, 
        events: {
            preload: new Function("scene", preload),
            create : new Function("scene", create),
            update : new Function("scene", update), 
            onWin  : new Function("scene", onWin),
            onLose : new Function("scene", onLose)
        } 
    };
    return item;
};

export default storeFactory(resource => {
    const {
    	actors = [], 
        preload, create, update, onWin, onLose
    } = resource;
    return build(actors, {preload, create, update, onWin, onLose});
});