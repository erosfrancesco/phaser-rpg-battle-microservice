import { Engine } from "@babylonjs/core/Engines/engine";


// Get the canvas element from the DOM - Associate a Babylon Engine to it.
const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new Engine(canvas);


// Load the desired scene
import loadScene from './scenes/meshAndSprite'
const scene = loadScene(engine)


// Debug and useful scene tool
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector"; 
scene.debugLayer.show();


// Render every frame
engine.runRenderLoop(() => {
    scene.render();
});