export default parse => {
    const builder = {
        init: scene => {
            builder.items = {};
            builder.scene = scene;
        },
        parse: item => {
            const {label, _id, properties} = item;
            builder.items[_id] = parse(properties, builder.scene)
        },
        get: _id => builder.items[_id],
        getAt: i => builder.items[ Object.keys(builder.items)[i] ],
        
        preload: _id => {

            const item = builder.get(_id);
            if (item) {
                if (item.setup) {
                    item.setup()
                }else{
                    console.log("setup for not found", _id, builder)
                }
            } else {
                console.log("item not found: ", _id, builder);
            }

            //builder.items[_id].setup(builder.scene)
        },
        create: (_id, ...options) => {
            console.log(_id, builder.items[_id]);
            builder.items[_id].create(builder.scene, ...options)
        },
        forEach: (iterator) => Object.keys(builder.items).forEach((key, indx) => iterator(key, indx))
    };
    return builder;
};