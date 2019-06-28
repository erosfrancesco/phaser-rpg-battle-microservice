import protoBuilder from "./protoBuilder.js";

//const defaultWinEvent  = 'console.log("you win");  scene.pause();';
//const defaultLoseEvent = 'console.log("you lose"); scene.pause();';


const parseFunction = encodedFunction => {
    const {params, body} = encodedFunction;
    const args = params.split(", ");
    return new Function(...args, body);
}

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
            preload: parseFunction(preload),
            create : parseFunction(create),
            update : parseFunction(update),
            onWin  : parseFunction(onWin),
            onLose : parseFunction(onLose)
        } 
    };
    return item;
};

export default protoBuilder((properties, scene) => battleBuilder(properties, scene) );