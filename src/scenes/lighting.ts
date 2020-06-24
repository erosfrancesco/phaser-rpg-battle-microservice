import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3, Color3 } from "@babylonjs/core/Maths/math";
// Required side effects to populate the Create methods on the mesh class.
// Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";

 
import { PointLight } from "@babylonjs/core/Lights/pointLight";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";



export default (engine: Engine, options :any = {}) :Scene => {

    var scene = new Scene(engine);
    var camera = new ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 2, 5, Vector3.Zero(), scene);
    camera.attachControl(engine.getRenderingCanvas(), true);
    
    var light = new PointLight("light", new Vector3(0, 1, 0), scene);
    light.diffuse = new Color3(1, 0, 0);
    light.specular = new Color3(0, 1, 0);

    var sphere = MeshBuilder.CreateSphere("sphere", {}, scene);
    sphere.position.z = 1;			
        
    return scene;
}