import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3, Color3 } from "@babylonjs/core/Maths/math";

 
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";

import { PBRMaterial } from "@babylonjs/core/Materials/PBR";

import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Mesh } from "@babylonjs/core/Meshes";

import { CubeTexture } from "@babylonjs/core/Materials/Textures/cubeTexture";
import { Texture } from "@babylonjs/core/Materials/Textures";
import "@babylonjs/core/Meshes/meshBuilder";
  


export default (engine: Engine, options :any = {}) :Scene => {
    
    const scene = new Scene(engine);
    
    const camera = new ArcRotateCamera("Camera", 
                                    -Math.PI / 4, 
                                    Math.PI / 2.5, 
                                    200, 
                                    Vector3.Zero(), 
        scene);
    camera.attachControl(engine.getRenderingCanvas(), true);
    camera.minZ = 0.1;
    
    // Environment Texture
    const hdrTexture = CubeTexture.CreateFromPrefilteredData("../../assets/textures/environment.dds", scene);

    scene.imageProcessingConfiguration.exposure = 0.6;
    scene.imageProcessingConfiguration.contrast = 1.6;

    // Skybox
    const hdrSkybox = Mesh.CreateBox("hdrSkyBox", 1000.0, scene);
    const hdrSkyboxMaterial = new PBRMaterial("skyBox", scene);
    hdrSkyboxMaterial.backFaceCulling = false;
    hdrSkyboxMaterial.reflectionTexture = hdrTexture.clone();
    hdrSkyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
	hdrSkyboxMaterial.microSurface = 1.0;
    hdrSkyboxMaterial.disableLighting = true;
    hdrSkybox.material = hdrSkyboxMaterial;
    hdrSkybox.infiniteDistance = true;

    // Create meshes
    const sphereGlass = Mesh.CreateSphere("sphereGlass", 48, 30.0, scene);
    sphereGlass.translate(new Vector3(1, 0, 0), -60);

    const sphereMetal = Mesh.CreateSphere("sphereMetal", 48, 30.0, scene);
    sphereMetal.translate(new Vector3(1, 0, 0), 60);

	const spherePlastic = Mesh.CreateSphere("spherePlastic", 48, 30.0, scene);
    spherePlastic.translate(new Vector3(0, 0, 1), -60);

    const woodPlank = MeshBuilder.CreateBox("plane", { width: 65, height: 1, depth: 65 }, scene);

    // Create materials
    const glass = new PBRMaterial("glass", scene);
    glass.reflectionTexture = hdrTexture;
    glass.refractionTexture = hdrTexture;
    glass.linkRefractionWithTransparency = true;
    glass.indexOfRefraction = 0.52;
    glass.alpha = 0;
    glass.microSurface = 1;
    glass.reflectivityColor = new Color3(0.2, 0.2, 0.2);
    glass.albedoColor = new Color3(0.85, 0.85, 0.85);
    sphereGlass.material = glass;

    const metal = new PBRMaterial("metal", scene);
    metal.reflectionTexture = hdrTexture;
    metal.microSurface = 0.96;
    metal.reflectivityColor = new Color3(0.85, 0.85, 0.85);
    metal.albedoColor = new Color3(0.01, 0.01, 0.01);
    sphereMetal.material = metal;
	
	const plastic = new PBRMaterial("plastic", scene);
    plastic.reflectionTexture = hdrTexture;
    plastic.microSurface = 0.96;
	plastic.albedoColor = new Color3(0.206, 0.94, 1);
	plastic.reflectivityColor = new Color3(0.003, 0.003, 0.003);
    spherePlastic.material = plastic;

    const wood = new PBRMaterial("wood", scene);
    wood.reflectionTexture = hdrTexture;
    wood.environmentIntensity = 1;
    wood.specularIntensity = 0.3;

    wood.reflectivityTexture = new Texture("textures/reflectivity.png", scene);
    wood.useMicroSurfaceFromReflectivityMapAlpha = true;

    wood.albedoColor = Color3.White();
    wood.albedoTexture = new Texture("textures/albedo.png", scene);
    woodPlank.material = wood;
		
    return scene;
}