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
        act = create(scene, act, executor, target, options);

        act.resolve = callback => resolve(Store.scene, act, callback);
        return act;
    };

    return protoBuilder
}


const buildAction = (properties, scene, Store) => {
    const {setup, create, resolve} = properties;


    const setupAction = parseFunction(setup);


    const createBodyHead = "action.executor = executor;\n\
                            action.target = target;\n\
                            action.options = options;";
    const createBodyAppend = "; return Object.assign(action);";
    const createAction = parseFunction(create, createBodyHead, setupBodyAppend);


    const resolveBodyHead = "const action = options;";
    const resolveAction = parseFunction(resolve, resolveBodyHead);

    return buildInGameAction(setupAction, createAction, resolveAction, Store)
};

const Store = protoBuilder((properties, scene) => buildAction(properties, scene, Store) );

export default Store;