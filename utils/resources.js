const metadata = {
	"actions":  	{ items: [] },
	"actors":   	{ items: [] }, 
	"ai":       	{ items: [] },  
	"animations": 	{ items: [] }, 
	"battle":       { items: [] },
	"commands": 	{ items: [] }, 
	"objects": 		{ items: [] },
	"sprites":  	{ items: [] }
};
const basePath = "https://arcane-whispers-7140.herokuapp.com/"


const asyncFetch = async () => {
	try {
		for ( const resource of Object.keys(metadata) ) {
			const items = await getRequest(resource);
			metadata[resource].items = items;
		}
		return metadata;
	} catch(err) {
		console.log("error in fetching resources", err);
		return false;
	}
};

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


export default { asyncFetch };