const metadata = {
	"ai":       { items: [] }, 
	"actors":   { items: [] }, 
	"actions":  { items: [] }, 
	"sprites":  { items: [] }, 
	"objects": { items: [] }, 
	"commands": { items: [] }
};
const basePath = "https://arcane-whispers-7140.herokuapp.com/"


const asyncFetch = async () => {
	try {
		for ( const resource of Object.keys(metadata) ) {
			//console.log("fetching resource", resource)
			const items = await getRequest(resource);
			metadata[resource].items = items;
		}
		return metadata;
	} catch(err) {
		console.log("error in fetching resources", err);
		return false;
	}
};

/*
const fetchResources = async callback => {
	let res = {};
	let retErr = null;
	try {
		const metadata = await getRequest("/resources");
		if (!metadata) {
			throw("metadata not found");
		}
		for ( const resource of Object.keys(metadata) ) {
			const items = await getRequest("/resources/" + resource);
			metadata[resource].items = items;
			res[resource] = metadata[resource];
		}
	} catch(err) {
		console.log("error in fetching all resources", err);
		retErr = err;
	}
	
	callback(retErr, res);
};
/**/

const getRequest = async path => {
	let res = null;
	const url = basePath + path;
	try {
		const headers = new Headers();
	    const options = { method: 'GET', headers };
	    const request = new Request(url, options);

	    const data = await fetch(request);
	    res = data.json();
	} catch(err) {
		console.log("error in async get request", err);
	}

	return res;
};


export default {
	//fetch: fetchResources, 
	asyncFetch};