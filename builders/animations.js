import protoBuilder from "./protoBuilder.js";

const animationBuilder = (properties, scene) => {
	const {params, body, type} = properties;
	const args = params.split(", ");
    const animation = new Function(...args, body);

    return animation;
};

export default protoBuilder((properties, scene) => animationBuilder(properties, scene) );