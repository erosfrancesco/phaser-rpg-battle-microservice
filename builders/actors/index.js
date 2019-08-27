import HELPER from "../utils/index.js";
const { parseEncodedFunction } = HELPER;

/**/
const statParser = stats => {
    let ret = {};
    stats.forEach(stat => {
        const {name, value} = stat;
        ret[name] = Number(value);
    });

    return ret;
}


/**/
const commandParser = (commands, scene) => {
    const ret = [];
    commands.forEach(id => ret.push(scene.builders.commands.get(id)));
    return ret;
};


/**/
const eventParser = (events, scene) => {
    const ret = {};

    const standardEvents = computeListOfStandardEvents(events);

    standardEvents.forEach(name => {
        ret[name] = parseEncodedFunction(events[name]);
    });

    events.custom.forEach(({name, params, body}) => {
        if (!ret[name]) {
            ret[name] = parseEncodedFunction({params, body});
        }
    });
    
    return ret;
};

const computeListOfStandardEvents = events => {
    const list = Object.keys(events);
    const indx = list.indexOf("custom");
    if (indx > -1) {
        list.splice(indx, 1);
    }
    return list;
}


export default {statParser, commandParser, eventParser};