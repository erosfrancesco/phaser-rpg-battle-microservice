import storeFactory from "./store.js";

const build = (functionBody, functionParams) => {
    const item = new Function("scene", "actor", "callback", functionBody)
    return item;
};

export default storeFactory(resource => {
    const {functionBody, functionHeader} = resource;
    return build(functionBody, functionHeader);
});