import protoBuilder from "./protoBuilder.js";

const parseFunction = (encodedFunction, bodyHead = "", bodyAppend = "") => {
    const {params = "", body = ""} = encodedFunction;
    const args = params.split(", ");
    return new Function(...args, bodyHead + body + bodyAppend);
}

const objectBuilder = (properties, scene) => {
    const {animations, setup, create, destroy} = properties;

    const destroyHead = "\
    Object.keys(battleObject.data).forEach(k => {\
        const component = battleObject.data[k];\
        if (component.destroy) { component.destroy(); };\
    });\n"
    const createAppend = "\
    \nreturn battleObject;\
    ";

    const createFunction = parseFunction(create, "", createAppend);
    const destroyFunction = parseFunction((destroy == "" ? "callback();" : destroy))//, destroyHead);
    const setupFunction = parseFunction(setup);


    const objectCreator = {
        
        setup: scene => setupFunction(scene),
        create: (scene, options = {}) => {
            const Animations = {};
            animations.forEach(id => { Animations[id] = scene.builders.animations.get(id) });

            let o = {
                scene,
                Animations,
                data: {},
            };

            o = createFunction(scene, o, options);
            o.destroy = (opts = {}, callback = function() {}) => destroyFunction(scene, o, opts, () => { 
                Object.keys(o.data).forEach(k => {
                    const component = o.data[k];
                    if (component.destroy) { component.destroy(); };
                });
                callback(); 
            });
            o.play = (name, options = {}, callback = function() {}) => o.Animations[name](scene, Object.assign(options, {battleObject: o}), callback);
            return o;
        },
        
    };

    
    return objectCreator;

}

const builder = protoBuilder((properties, scene) => objectBuilder(properties, scene));

export default builder;


/****************************************************************************/


/*
    import storeFactory from "./store.js";



    const buildObject = (animations, build, preload, destroy) => {

        const destroyFunctionHeaders = "\
        Object.keys(battleObject.data).forEach(k => {\
            const component = battleObject.data[k];\
            if (component.destroy) { component.destroy(); };\
        });\n"

        const createFunction = new Function("scene", "battleObject", "options", build + "\nreturn battleObject;");
        const destroyFunction = new Function("battleObject", "callback", destroyFunctionHeaders + destroy);
        const preloadFunction = new Function("scene", preload);

        const Animations = {};
        animations.forEach(anim => {
            const {name, body} = anim;
            const play = new Function("battleObject", "callback", 
                "options", "callback = callback || function() {}; options = options || {};" + body);
            Animations[name] = play;
        });


        const battleObjectPrototype = {
            //Animations,
            preload: scene => preloadFunction(scene),
            create: (scene, options = {}) => {
                const o = Object.assign({data: {}, Animations, scene}, battleObjectPrototype);
                o.play = (name, callback, options = {}) => o.Animations[name](o, callback, options);
                o.destroy = callback => destroyFunction(o, callback);

                // const ret = createFunction(scene, newObject, options);
                // return ret;
                
                return createFunction(scene, o, options);
            }
        };
        return battleObjectPrototype;
    };

    const Store = storeFactory(resource => {
        const {animations, build, preload, destroy} = resource;
        return buildObject(animations, build, preload, destroy);
    });

    export default Store;
/**/