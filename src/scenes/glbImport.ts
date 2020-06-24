import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3, Color3, Color4 } from "@babylonjs/core/Maths/math";
// Required side effects to populate the Create methods on the mesh class.
// Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";

 
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { StandardMaterial }
 from "@babylonjs/core/Materials/standardMaterial";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { BackgroundMaterial } from "@babylonjs/core/Materials/Background/backgroundMaterial";
import { CubeTexture } from "@babylonjs/core/Materials/Textures/cubeTexture";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";




export default (engine: Engine, options :any = {}) :Scene => {

    const scene = new Scene(engine);

    const ambient = new HemisphericLight("HemiLight", new Vector3(0, 1, 0), scene);
    // ambient.diffuse = Color3.Blue();
    const camera = new ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 2, 5, Vector3.Zero(), scene);
    camera.attachControl(engine.getRenderingCanvas(), true)
  
    SceneLoader.ImportMesh(
        '',
        './assets/',
        'FFVIAirForce.glb',
        scene,
        objects => {
            // You can apply properties to object.
            objects[0].scaling = new Vector3(0.09, 0.09, 0.09);
        }
    );

    // const sphere = MeshBuilder.CreateSphere("sphere", {}, scene);
    // sphere.position.z = 1;


    // const cubeMaterial = new StandardMaterial("cubeMat", scene);
    // // cubeMaterial.diffuseColor = Color3.Red();
    // cubeMaterial.diffuseTexture = new Texture("./assets/kisspng-sphere-circle-sand-texture-5add03cf5fb451.451980271524433871392.png", scene)
    // //new Texture("https://dl.dropboxusercontent.com/s/iyvyn2qs8vrzzz2/TexturesCube.png", scene);
    // // cubeMaterial.bumpTexture = new Texture("https://dl.dropboxusercontent.com/s/abywt5s0dpy9vrk/TexturedCube_norm.png", scene);

    // sphere.material = cubeMaterial
    // scene.clearColor = new Color4(0.7, 0.7, 0.6, 1);

    // // const skybox = new BackgroundMaterial("skyBox", scene)
    // // skybox.diffuseTexture = new Texture("./assets/pngwave-sky.png", scene)

    // const skybox = MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
    
    // const skyboxMaterial = new StandardMaterial("skyBox", scene);
    // // skyboxMaterial.diffuseTexture = new Texture("./assets/pngwave-sky.png", scene)
    // skyboxMaterial.backFaceCulling = false;
    // skyboxMaterial.reflectionTexture = new Texture("./assets/pngwave-sky.png", scene);
    // skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    // // skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    // // skyboxMaterial.specularColor = new Color3(0, 0, 0);
    // skybox.material = skyboxMaterial;

    // SceneLoader.ImportMesh("FFVIAirForce", "/assets/", "Air_Force_Mount.stl", scene, newMeshes => {
    //     newMeshes[0].scaling = new Vector3(1 / 50, 1 / 50, 1 / 50);
    //     newMeshes[0].material = cubeMaterial
    // });

    // SceneLoader.ImportMesh(
    //     '',
    //     './assets/',
    //     'cube.obj',
    //     scene,
    //     objects => {
    //         // You can apply properties to object.
    //         objects[0].scaling = new Vector3(0.09, 0.09, 0.09);
    //     }
    // );

    return scene;
}