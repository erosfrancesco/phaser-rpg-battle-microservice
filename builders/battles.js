import protoBuilder from "./protoBuilder.js";

import HELPERS from "./utils/index.js";
const { parseEncodedFunction } = HELPERS;

//const defaultWinEvent  = 'console.log("you win");  scene.pause();';
//const defaultLoseEvent = 'console.log("you lose"); scene.pause();';


const battleBuilder = (properties, scene) => {

	const {
        actors,
        preload,
        create,
        update,
        onWin, 
        onLose,
    } = properties;

    const item = { 
        actors, 
        events: {
            preload: parseEncodedFunction(preload),
            create : parseEncodedFunction(create),
            update : parseEncodedFunction(update),
            onWin  : parseEncodedFunction(onWin),
            onLose : parseEncodedFunction(onLose)
        } 
    };
    return item;
};

export default protoBuilder((properties, scene) => battleBuilder(properties, scene) );