import protoBuilder from "./protoBuilder.js";

import HELPERS from "./utils/index.js";
const { parseEncodedFunction } = HELPERS;


const commandBuilder = (properties, scene) => {

	const {label, action} = properties;
    const commandAction = parseEncodedFunction(action)

    return {
        label,
        action: (options = {}, callback) => commandAction(builder.scene, options, callback)
    };
};

const builder = protoBuilder((properties, scene) => commandBuilder(properties, scene) );
export default builder