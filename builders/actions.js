import HELPERS from "./utils/index.js";
const { parseEncodedFunction } = HELPERS;

import protoBuilder from "./protoBuilder.js";


const buildInGameAction = (setup, create, resolve, Store) => {

    const protoAction = {}

    protoAction.setup = setup;

    protoAction.create = (scene, options = {}) => {    
        const {executor, target} = options;
        let act = {};
        act = create(scene, act, executor, target);
        act.resolve = (options, callback) => resolve(Store.scene, act, executor, target, options, callback);
        return act;
    };


    return protoAction
}


const buildAction = (properties, scene, Store) => {
    const {setup, create, resolve} = properties;

    const setupAction = parseEncodedFunction(setup);

    const createBodyHead = "action.executor = executor;\n\
                            action.target = target;\n\
                            action.options = options;";
    const createBodyAppend = "; return Object.assign(action);";
    const createAction = parseEncodedFunction(create, createBodyHead, createBodyAppend);

    const resolveAction = parseEncodedFunction(resolve);


    const act = buildInGameAction(setupAction, createAction, resolveAction, Store);
    return act;
};

const Store = protoBuilder((properties, scene) => buildAction(properties, scene, Store) );

export default Store;