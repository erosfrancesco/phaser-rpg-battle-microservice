import protoBuilder from "./protoBuilder.js";

const commandBuilder = (properties, scene) => {

	const {label, action} = properties;
	const {params, body} = action;
	const args = params.split(", ");
    const commandAction = new Function(...args, body);

    return {
        label,
        action: (options = {}) => commandAction(builder.scene, options)
    };
};

const builder = protoBuilder((properties, scene) => commandBuilder(properties, scene) );
export default builder