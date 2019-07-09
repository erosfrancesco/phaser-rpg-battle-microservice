import protoBuilder from "./protoBuilder.js";

import HELPERS from "./utils/index.js";
const { parseEncodedFunction } = HELPERS;


const animationBuilder = (properties, scene) => parseEncodedFunction(properties);

export default protoBuilder((properties, scene) => animationBuilder(properties, scene) );