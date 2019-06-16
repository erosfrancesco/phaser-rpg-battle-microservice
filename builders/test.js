const getFirstItem = (scene, category) => {
	const builder = scene.builders[category];
	const firstItem = Object.keys( builder.items ) [0]
	return builder.get(firstItem.id)
}


const action = scene => {
	const item = getFirstItem(scene, "ai")
	console.log(item);
}

const ai = scene => {
	const item = getFirstItem(scene, "ai")
	item(null, null, () => console.log("control taken to main") );	
}


export default {
	action,
	ai
}