import protoBuilder from "./protoBuilder.js";


const parseFunction = (encodedFunction, bodyHead = "", bodyAppend = "") => {
    const {params = "", body = ""} = encodedFunction;
    const args = params.split(", ");
    return new Function(...args, bodyHead + body + bodyAppend);
}

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

    const setupAction = parseFunction(setup);

    const createBodyHead = "action.executor = executor;\n\
                            action.target = target;\n\
                            action.options = options;";
    const createBodyAppend = "; return Object.assign(action);";
    const createAction = parseFunction(create, createBodyHead, createBodyAppend);

    const resolveAction = parseFunction(resolve);


    const act = buildInGameAction(setupAction, createAction, resolveAction, Store);
    return act;
};

const Store = protoBuilder((properties, scene) => buildAction(properties, scene, Store) );

export default Store;