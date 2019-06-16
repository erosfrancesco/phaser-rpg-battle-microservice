const getFirstItem = (scene, category) => {
	const builder = scene.builders[category];
	return builder.getAt(0)
}


const action = scene => {
	/*
	const item = getFirstItem(scene, "actions")
	const act = item.create(scene, {});
	act.resolve({}, () => console.log("all right") )
	/**/
}

const ai = scene => {
	/*
	const item = getFirstItem(scene, "ai");
	item(null, null, () => console.log("control taken to main") );
	/**/	
}


export default {
	action,
	ai
}