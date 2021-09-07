var canvas = document.getElementById("renderCanvas");

var engine = null;
var scene = null;
var sceneToRender = null;
var camera;
var pipCamera;
var light;
var light2;
var light3;

var createDefaultEngine = function () {
    return new BABYLON.Engine(canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true,
        disableWebGL2Support: false
    });
};



var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    // Ammo Physics

   /* var ammo;

    Ammo().then(() => {
        ammo = new BABYLON.AmmoJSPlugin(true);
    });
     scene.enablePhysics(null, new BABYLON.AmmoJSPlugin());
     scene.applyGravity = true;
     scene.gravity = new BABYLON.Vector3(0, -0.10, 0);
    */

    var gravityVector = new BABYLON.Vector3(0,-9.81, 0);
    var physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);   
    scene.collisionsEnabled = true;

    

    

    // Camera

    //camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 0, 0), scene);
    //camera.radius = -18;
    //camera.heightOffset = 10;

    camera = new BABYLON.UniversalCamera("MyCamera", new BABYLON.Vector3(0, 10, -12), scene);
    camera.attachControl(canvas, true);
    camera.direction = new BABYLON.Vector3(Math.cos(camera.angle), 0, Math.sin(camera.angle));
    camera.setTarget(new BABYLON.Vector3(0, 2, 1));   

    //camera.applyGravity = true;
    //camera.collisionsEnabled = true;
    //camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
    // Set camera to look down the hall and show face

    let ar = engine.getAspectRatio(camera);
    let pipW = (ar < 1) ? 0.3 : 0.3 * (1/ar);
    let pipH = (ar < 1) ? 0.3 * ar : 0.3;
    let pipX = 1 - pipW;
    let pipY = 1 - pipH;

    pipCamera = new BABYLON.FreeCamera("pipCamera", new BABYLON.Vector3(0,20,0), scene);
    pipCamera.setTarget(BABYLON.Vector3.Zero());

    camera.viewport = new BABYLON.Viewport(0, 0, 1, 1);
    pipCamera.viewport = new BABYLON.Viewport(pipX, pipY, pipW, pipH);

    pipCamera.parent = camera;

     

    scene.activeCameras.push(camera);
    scene.activeCameras.push(pipCamera);




   

    

    // Adding Layer Mask 
    
    

    //First remove the default management.
    //camera.inputs.clear();
    //camera.inputs.removeByType("ArcRotateCameraKeyboardMoveInput");
    //camera.inputs.removeByType("ArcRotateCameraMouseInput");
    //camera.inputs.removeByType('ArcRotateCameraPointersInput');
   



    //camera.inputs.removeByType('FollowCameraPointersInput');

    // Lights

    light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -2, -1), scene);
    light.position = new BABYLON.Vector3(0, 10, 100);
    light.intensity = 0.4;

    var lightSphere = BABYLON.Mesh.CreateSphere("sphere", 10, 2, scene);
    lightSphere.position = light.position;
    lightSphere.material = new BABYLON.StandardMaterial("light", scene);
    lightSphere.material.emissiveColor = new BABYLON.Color3(0, 0, 1);

    light2 = new BABYLON.SpotLight("spot02", new BABYLON.Vector3(0, 10, 90), new BABYLON.Vector3(0, -2, -1), 1.1, 16, scene);
    light2.intensity = 0.4;

    light3 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light3.intensity = 0.4;
    light3.specular = BABYLON.Color3.Black();
    light3.position = new BABYLON.Vector3(0, 10, 40);


    // Skybox
    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {
        size: 5000.0
    }, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("3d/textures/space", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = BABYLON.Color3.Black()
    skyboxMaterial.specularColor = BABYLON.Color3.Black();
    skybox.material = skyboxMaterial;


    // Hide Mesh when camera touches
    

    // End

   
    return scene;

}

var objectUrl;
function doDownload(filename, scene) {
    if(objectUrl) {
        window.URL.revokeObjectURL(objectUrl);
    }
    
    var serializedScene = BABYLON.SceneSerializer.Serialize(scene);
        
    var strMesh = JSON.stringify(serializedScene);
    
    if (filename.toLowerCase().lastIndexOf(".babylon") !== filename.length - 8 || filename.length < 9){
        filename += ".babylon";
    }
            
	var blob = new Blob ( [ strMesh ], { type : "octet/stream" } );
       
    // turn blob into an object URL; saved as a member, so can be cleaned out later
    objectUrl = (window.webkitURL || window.URL).createObjectURL(blob);
    
    var link = window.document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    var click = document.createEvent("MouseEvents");
    click.initEvent("click", true, false);
    link.dispatchEvent(click);          
}

var engine;
var scene;
initFunction = async function () {
    var asyncEngineCreation = async function () {
        try {
            return createDefaultEngine();
        } catch (e) {
            console.log(
                "the available createEngine function failed. Creating the default engine instead"
            );
            return createDefaultEngine();
        }
    }

    engine = await asyncEngineCreation();
    if (!engine) throw 'engine should not be null.';
    scene = createScene();
};
initFunction().then(() => {
    sceneToRender = scene
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();

});