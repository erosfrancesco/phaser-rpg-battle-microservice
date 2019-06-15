import storeFactory from "./store.js";


const buildAction = (imports, buildBody, resolveBody) => {
    buildBody = "action.executor = executor;\n\
                 action.target = target;\n\
                 action.options = options;" + 
                 buildBody + 
                 "; return Object.assign(action);";

    const createAction = new Function("scene", "action", "executor", "target", "options", buildBody);
    const resolveAction = new Function("scene", "action", "callback", resolveBody);

    
    const protoAction = {};

    protoAction.create = (scene, options = {}) => {
        
        const {executor, target} = options;
        let act = {};
        act = createAction(scene, act, executor, target, options);

        act.resolve = callback => resolveAction(Store.scene, act, callback);
        return act;
    };
    /**/
    return protoAction;
};

const Store = storeFactory(resource => {
    const {imports, build, resolve} = resource;
    return buildAction(imports, build, resolve);
});

export default Store;