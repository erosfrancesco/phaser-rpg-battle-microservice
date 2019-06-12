import storeFactory from "./store.js";

const build = (label, actionBody) => {

    const action = new Function("scene", "options", actionBody);

    const item = {
        label,
        action: (options = {}) => action(commandStore.scene, options)
    };
    return item;
};


const commandStore = storeFactory((resource) => {
    const {label, action} = resource;
    return build(label, action);
});

export default commandStore;