export default parse => {
    const store = {
        init: scene => {
            store.items = {};
            store.scene = scene;
        },
        parse: ({label, properties}) => store.items[label] = parse(properties, store.scene),
        get: label => store.items[label],
        getAt: i => store.items[ Object.keys(store.items)[i] ],
        getLabel: indx => Object.keys(store.items)[indx],
        preload: label => store.items[label].preload(store.scene),
        create: (label, ...options) => store.items[label].create(store.scene, ...options),
        forEach: (iterator) => Object.keys(store.items).forEach((key, indx) => iterator(key, indx))
    };
    return store;
};