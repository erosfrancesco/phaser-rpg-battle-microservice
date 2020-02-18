import { Engine } from "@babylonjs/core/Engines/engine";import { Scene } from "@babylonjs/core/scene";
import { Vector3, Color3 } from "@babylonjs/core/Maths/math";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

// Required side effects to populate the Create methods on the mesh class.
// Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";


import { SpriteManager } from "@babylonjs/core/Sprites/spriteManager";
import { Sprite } from "@babylonjs/core/Sprites/sprite";
import { Action } from "@babylonjs/core/Actions/action";
import { ActionManager } from "@babylonjs/core/Actions/actionManager";




export default (engine: Engine, options :any = {}) :Scene => {

    const scene = new Scene(engine);

    // This creates and positions a free camera (non-mesh)
    const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(engine.getRenderingCanvas(), true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.groundColor = new Color3(155, 155, 155)



    const spriteManagerDog = new SpriteManager("dogManager", "assets/wolfsheet2.png", 1, {width: 32, height: 64}, scene);
    spriteManagerDog.isPickable = true;

    // First animated player
    const playerSprite = new Sprite("player", spriteManagerDog);
    playerSprite.isPickable = true
    playerSprite.width = 0.5
    playerSprite.height = 1


    return scene
}
