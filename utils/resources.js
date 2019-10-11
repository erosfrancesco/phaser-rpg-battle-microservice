// should get those
const metadata = {
	// "actions":  	{ items: [] },
	// "actors":   	{ items: [] }, 
	// "ai":       	{ items: [] },  
	// "animations": 	{ items: [] }, 
	// "battles":      { items: [] },
	// "commands": 	{ items: [] }, 
	// "objects": 		{ items: [] },
	// "sprites":  	{ items: [] }
};
const basePath = "https://arcane-whispers-7140.herokuapp.com/"

const fetchMetadata = async () => {
	await fetch(basePath).then(res => res.json()).then(metadataIndexes => 
		metadataIndexes.forEach(metadataIndex => {
			metadata[metadataIndex] = { items: [] }
		})
	);
}

const asyncFetch = async () => {

	const promises = [];
	await fetchMetadata()

	Object.keys(metadata).forEach(resource => {
		const promise = fetchPromise(resource).then(items => {
			metadata[resource].items = items;
		});
		promises.push(promise);
	});

	await Promise.all(promises).catch(error => console.error(error));

	return metadata
};


const fetchPromise = (path) => {
	const options = { 
	};

	return fetch(basePath + path, options).then(res => res.json());
}


export default { asyncFetch };