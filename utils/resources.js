// should get those
const metadata = {
	"actions":  	{ items: [] },
	"actors":   	{ items: [] }, 
	"ai":       	{ items: [] },  
	"animations": 	{ items: [] }, 
	"battles":      { items: [] },
	"commands": 	{ items: [] }, 
	"objects": 		{ items: [] },
	"sprites":  	{ items: [] }
};
const basePath = "https://arcane-whispers-7140.herokuapp.com/"


const asyncFetch = async () => {

	const promises = [];
	// const token = await getAuthToken();

	Object.keys(metadata).forEach(resource => {
		const promise = fetchPromise(resource).then(items => {
			metadata[resource].items = items;
		});
		promises.push(promise);
	});

	await Promise.all(promises).catch(error => console.error(error));

	return metadata
};

// // login
// const getAuthToken = async () => {

// 	const headers = new Headers();
// 	headers.append('Accept', 'application/json');
// 	headers.append("Content-Type", "application/json");

// 	const body = JSON.stringify({
// 		"username": "jason",
// 		"password": "darthvent"
// 	});

// 	const options = { method: 'POST', headers, body };
// 	const request = new Request(basePath + "users/authenticate", options);
// 	const data = await fetch(request)
// 	const json = await data.json()

// 	return json.token || false;
// }
// //

const fetchPromise = (path) => {
	const options = { 
		// headers : {
		// 	"Authorization": "Bearer " + token
		// }
	};

	return fetch(basePath + path, options).then(res => res.json());
}


export default { asyncFetch };