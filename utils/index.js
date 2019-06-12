import Game from "./app.js";
import Assets from "./resources.js";
import InputController from "./inputControllerScene.js";


Game.Resources = Assets.asyncFetch();

Game.addScene = (SceneInitializer, startScene = false, sceneData = {}) => {
	Game.scene.add(SceneInitializer.key, SceneInitializer, startScene, sceneData);
}
Game.startScene = (sceneKey, options = {}) => {
	Game.Resources.then(resources => {
		options.resources = resources;
		Game.scene.start(sceneKey, options);
	});
}
Game.addScene(InputController, true);



export default Game;