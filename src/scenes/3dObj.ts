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
import { PointLight } from "@babylonjs/core/Lights/pointLight";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { CubeTexture } from "@babylonjs/core/Materials/Textures/cubeTexture";
  
  


export default (engine: Engine, options :any = {}) :Scene => {
    
    const scene = new Scene(engine);

    // LIGHTS
    const ambientColor = new Color3(22 / 255, 33 / 255, 41 / 255);
    const ambientPosition = new Vector3(0, -10, 0)
    const ambient = new HemisphericLight("HemiLight", ambientPosition, scene);
    ambient.diffuse = ambientColor;
    const ambient2 = new HemisphericLight("HemiLight2", Vector3.Zero(), scene);
    ambient2.intensity = 0.4;
    const point = new PointLight('Point Light', Vector3.Zero(), scene)
    point.intensity = 0.5
    point.position.z = 100


    // CAMERA
    const cameraPosition = Vector3.Zero()
    const cameraAngleX = -Math.PI / 2
    const cameraAngleY = Math.PI / 1.2
    const cameraDistance = 4
    const camera = new ArcRotateCamera("Camera", cameraAngleX, cameraAngleY, cameraDistance, cameraPosition, scene);
    camera.attachControl(engine.getRenderingCanvas(), true)
  
    
    

    // SPHERE
    const sphere = MeshBuilder.CreateSphere("sphere", {}, scene);
    sphere.position.z = -1;
    
    


    // PLANE
    const plane = MeshBuilder.CreatePlane('plane', {
        width: 10,
        height: 10
    }, scene);

    const planeColor = new Color3(68 / 255, 127 / 255, 139 / 255)
    const planeMaterial = new StandardMaterial('greenMat', scene)
    planeMaterial.emissiveColor = planeColor
    plane.material = planeMaterial


    return scene;
}