 // Create ground collider
 var ground = BABYLON.MeshBuilder.CreateGround("ground", { height: 140, width: 100, subdivisions: 4 }, scene);
 ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON
    .PhysicsImpostor.BoxImpostor, {
        mass: 0
    }, scene);
var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
groundMaterial.diffuseTexture = new BABYLON.Texture("../../3d/textures/floor.jpg", scene);
groundMaterial.diffuseTexture.uScale = 10;
groundMaterial.diffuseTexture.vScale = 10;
groundMaterial.specularColor = new BABYLON.Color3(.1, .1, .1);
ground.material = groundMaterial;
ground.position.y = -2.7; // -2.8
ground.position.z = 40;
ground.receiveShadows = true;




 
            
 