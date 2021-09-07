const boxMat = new BABYLON.StandardMaterial("boxMat");
boxMat.diffuseTexture = new BABYLON.Texture("../../3d/textures/floor.jpg");
 
 // Create ground collider
 var ground = BABYLON.MeshBuilder.CreateBox("Ground", {width: 100, height: 0.5, depth: 300}, scene);
 boxMat.diffuseTexture.uScale = 20.0;
 boxMat.diffuseTexture.vScale = 20.0;
 boxMat.backFaceCulling = false;//All faces
 ground.material = boxMat;
 


 ground.applyGravity = true; 
 ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.0, restitution: 0.5 }, scene);
 ground.position.y = -2.9; // -2.8
 ground.receiveShadows = true;
 //ground.checkCollisions = true;



 
            
 