var library;
BABYLON.SceneLoader.ImportMesh("", "../../3d/library/", "library.gltf", scene, function (libMesh) {
    library = libMesh[0];
    library.position = new BABYLON.Vector3(0.72, -2.82, -10);
    library.rotation = new BABYLON.Vector3(0, -1.55, 0);

    var colliderGroup = scene.getMeshByName('Colliders');
    colliderGroup.checkCollisions = true;
    colliderGroup.isVisible = false;

    var wallCollider = scene.getMeshByName('firstWall');
    wallCollider.checkCollisions = true;
    wallCollider.isVisible = false;

    var wall1 = scene.getMeshByName('w1');
    var wall2 = scene.getMeshByName('w2');
    var wall3 = scene.getMeshByName('w3');
    var wall4 = scene.getMeshByName('w4');
    var wall5 = scene.getMeshByName('w5');
    var wall6 = scene.getMeshByName('w6');
    var wall7 = scene.getMeshByName('w7');
    var wall8 = scene.getMeshByName('w8');
    var wall9 = scene.getMeshByName('w9');
    var wall10 = scene.getMeshByName('w10');
    var wall11 = scene.getMeshByName('w11');
    var wall12 = scene.getMeshByName('w12');
    var wall13 = scene.getMeshByName('w13');
    var wall14 = scene.getMeshByName('w14');


    var allWalls =["wall1","wall2","wall3", "wall4", "wall5", "wall6", "wall7", "wall8", "wall9", "wall10", "wall11", "wall12", "wall13", "wall14"];


   

    wall1.checkCollisions = true;
    wall2.checkCollisions = true;
    wall3.checkCollisions = true;
    wall4.checkCollisions = true;
    wall5.checkCollisions = true;
    wall6.checkCollisions = true;
    wall7.checkCollisions = true;
    wall8.checkCollisions = true;
    wall9.checkCollisions = true;
    wall10.checkCollisions = true;
    wall11.checkCollisions = true;
    wall12.checkCollisions = true;
    wall13.checkCollisions = true;
    wall14.checkCollisions = true;

      
    camCollider.actionManager = new BABYLON.ActionManager(scene);
    camCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:wallCollider,
    }, function () {              
            for(var i = 0; i < allWalls.length; i++){
                allWalls[i].isVisible = true;
            }

            console.log("in");
    }));

    
    camCollider.actionManager = new BABYLON.ActionManager(scene);
    camCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionExitTrigger,
        parameter:wallCollider,
    }, function () {        
        for(var i = 0; i < allWalls.length; i++){
            allWalls[i].isVisible = true;
        }
        console.log("exit");
    }));

    wall1.actionManager = new BABYLON.ActionManager(scene);
    wall1.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
       
            wall1.isVisible = false;
            wall2.isVisible = false; 
            wall14.isVisible = false; 
      
               
    }));

    wall2.actionManager = new BABYLON.ActionManager(scene);
    wall2.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        
            wall1.isVisible = false;
            wall2.isVisible = false; 
            wall3.isVisible = false; 
     
               
    }));

    
    wall3.actionManager = new BABYLON.ActionManager(scene);
    wall3.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        
            wall3.isVisible = false;
            wall2.isVisible = false; 
            wall4.isVisible = false; 
        
               
    }));


    wall4.actionManager = new BABYLON.ActionManager(scene);
    wall4.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        
            wall4.isVisible = false;
            wall3.isVisible = false; 
            wall5.isVisible = false; 
        
               
    }));

    wall5.actionManager = new BABYLON.ActionManager(scene);
    wall5.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        
            wall5.isVisible = false;
            wall6.isVisible = false; 
            wall4.isVisible = false; 
        
               
    }));


 
    wall6.actionManager = new BABYLON.ActionManager(scene);
    wall6.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        
            wall6.isVisible = false;
            wall5.isVisible = false; 
            wall7.isVisible = false; 
        
               
    }));

    wall7.actionManager = new BABYLON.ActionManager(scene);
    wall7.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        
            wall7.isVisible = false;
            wall6.isVisible = false; 
            wall8.isVisible = false; 
        
               
    }));

    wall8.actionManager = new BABYLON.ActionManager(scene);
    wall8.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        
            wall8.isVisible = false;
            wall7.isVisible = false; 
            wall9.isVisible = false; 
        
               
    }));

    wall9.actionManager = new BABYLON.ActionManager(scene);
    wall9.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        
            wall9.isVisible = false;
            wall8.isVisible = false; 
            wall10.isVisible = false; 
        
               
    }));

    wall10.actionManager = new BABYLON.ActionManager(scene);
    wall10.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        
            wall10.isVisible = false;
            wall9.isVisible = false; 
            wall11.isVisible = false; 
        
               
    }));

    wall11.actionManager = new BABYLON.ActionManager(scene);
    wall11.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        
            wall11.isVisible = false;
            wall10.isVisible = false; 
            wall12.isVisible = false; 
        
               
    }));

    wall12.actionManager = new BABYLON.ActionManager(scene);
    wall12.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        
            wall12.isVisible = false;
            wall11.isVisible = false; 
            wall13.isVisible = false; 
        
               
    }));

    wall13.actionManager = new BABYLON.ActionManager(scene);
    wall13.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        
            wall13.isVisible = false;
            wall12.isVisible = false; 
            wall14.isVisible = false; 
        
               
    }));

    wall14.actionManager = new BABYLON.ActionManager(scene);
    wall14.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
       
            wall14.isVisible = false;
            wall1.isVisible = false; 
            wall13.isVisible = false; 
        
               
    }));

    

    /*camCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionExitTrigger,
        parameter: wall1,
    }, function () {
        
    }));*/


});