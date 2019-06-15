import protoBuilder from "./protoBuilder.js";

const aiBuilder = (properties, scene) => {
	const {params, body} = properties.waterfall[0];
	const args = params.split(", ");
    const AI = new Function(...args, body)

    return AI;
};

export default protoBuilder((properties, scene) => aiBuilder(properties, scene) );