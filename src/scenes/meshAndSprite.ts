import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";

// Required side effects to populate the Create methods on the mesh class.
// Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";

 
import { PointLight } from "@babylonjs/core/Lights/pointLight";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { SpriteManager } from "@babylonjs/core/Sprites/spriteManager";
import { Sprite } from "@babylonjs/core/Sprites/sprite";
import { ActionManager } from "@babylonjs/core/Actions/actionManager";
import { ExecuteCodeAction } from "@babylonjs/core/Actions"





export default (engine: Engine, options :any = {}) :Scene => {

    const scene = new Scene(engine);

    // Create camera and light
    const light = new PointLight("Point", new Vector3(5, 10, 5), scene);
    const camera = new ArcRotateCamera("Camera", 0, 0, 4, new Vector3(0, 0, 0), scene);
    // Link user controls to camera
    // camera.attachControl(engine.getRenderingCanvas(), true);


    //Create a manager for the player's sprite animation
    const spriteManagerPlayer = new SpriteManager("playerManager", "assets/wolfsheet2.png", 2, {width: 32, height: 64}, scene);
    spriteManagerPlayer.isPickable = true;
    
    
    // First sprite
    const player = new Sprite("player", spriteManagerPlayer);
    player.isPickable = true;
    player.width = 0.5
    player.height = 1
    let isAnimating = false
	
	
	
    // click action for player
	player.actionManager = new ActionManager(scene);
	player.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickUpTrigger, () => {
        if (!isAnimating) {
            isAnimating = true
            player.playAnimation(0, 4, false, 75, () => { isAnimating = false })
        }
	}));


    //
    const sprite2ManagerPlayer = new SpriteManager("playerManager", "assets/arshes13.png", 2, {width: 62, height: 62}, scene);
    // First sprite
    const player2 = new Sprite("player", sprite2ManagerPlayer);
    player2.isPickable = true;
    player2.position.x = 1
    


    return scene;
}