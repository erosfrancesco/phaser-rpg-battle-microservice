/**/
const parseEncodedFunction = (encodedFunction, bodyHead = "", bodyAppend = "") => {
    const {params = "", body = ""} = encodedFunction;
    const args = params.split(", ");
    return new Function(...args, bodyHead + body + bodyAppend);
}

export default { parseEncodedFunction };