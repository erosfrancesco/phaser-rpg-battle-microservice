import Game from "./app.js";
import Resources from "./resources.js";
import InputController from "./inputControllerScene.js";
import DragPlugin from "./dragplugin.js"

Game.DragPlugin = DragPlugin;
Game.Resources = Resources.asyncFetch();

Game.addScene = (SceneInitializer, startScene = false, sceneData = {}) => {
	Game.scene.add(SceneInitializer.key, SceneInitializer, startScene, sceneData);
}
Game.startScene = (sceneKey, options = {}) => {
	Game.Resources.then(resources => {
		options.resources = resources;
		Game.scene.start(sceneKey, options);
		// Debug log
		console.log("[SCENE START]", sceneKey)
	});
}
Game.addScene(InputController, true);



export default Game;