import HELPERS from "./utils/index.js";
const { parseEncodedFunction } = HELPERS;

import protoBuilder from "./protoBuilder.js";

const aiBuilder = (properties, scene) => parseEncodedFunction(properties);

export default protoBuilder((properties, scene) => aiBuilder(properties, scene) );