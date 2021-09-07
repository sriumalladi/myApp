var library;
var k = 1;
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
        if(k == 1){
            wall1.isVisible = true;
            wall2.isVisible = true; 
            wall3.isVisible = true;
            wall4.isVisible = true;
            wall5.isVisible = true; 
            wall6.isVisible = true;
            wall7.isVisible = true;
            wall8.isVisible = true; 
            wall9.isVisible = true;
            wall10.isVisible = true;
            wall11.isVisible = true; 
            wall12.isVisible = true;
            wall13.isVisible = true; 
            wall14.isVisible = true;
            k = 0; 
        }
    }));

    
    /*camCollider.actionManager = new BABYLON.ActionManager(scene);
    camCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionExitTrigger,
        parameter:wallCollider,
    }, function () {        
        for(var i = 0; i < allWalls.length; i++){
            allWalls[i].isVisible = true;
        }
        console.log("exit");
    }));*/

    wall1.actionManager = new BABYLON.ActionManager(scene);
    wall1.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
            if(wall1.isVisible === false){
                wall1.isVisible = true;
                wall2.isVisible = true; 
                wall14.isVisible = true;
                k=0; 
            }else{
                wall1.isVisible = false;
                wall2.isVisible = false; 
                wall14.isVisible = false;
                k=1; 
            }
    }));

    wall2.actionManager = new BABYLON.ActionManager(scene);
    wall2.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        if(wall2.isVisible === false){
            wall1.isVisible = true;
            wall2.isVisible = true; 
            wall3.isVisible = true; 
            k=0;
        }else{
            wall1.isVisible = false;
            wall2.isVisible = false; 
            wall3.isVisible = false; 
            k=1;
        }    
    }));

    
    wall3.actionManager = new BABYLON.ActionManager(scene);
    wall3.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        if(wall3.isVisible === false){
            wall2.isVisible = true;
            wall3.isVisible = true; 
            wall4.isVisible = true; 
        }else{
            wall2.isVisible = false;
            wall3.isVisible = false; 
            wall4.isVisible = false;
            k=1; 
        }
               
    }));


    wall4.actionManager = new BABYLON.ActionManager(scene);
    wall4.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        
        if(wall4.isVisible === false){
            wall3.isVisible = true;
            wall4.isVisible = true; 
            wall5.isVisible = true; 
            k=0;
        }else{
            wall3.isVisible = false;
            wall4.isVisible = false; 
            wall5.isVisible = false;
            k=1; 
        }       
               
    }));

    wall5.actionManager = new BABYLON.ActionManager(scene);
    wall5.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        
        if(wall5.isVisible === false){
            wall4.isVisible = true;
            wall5.isVisible = true; 
            wall6.isVisible = true; 
            k=0;
        }else{
            wall4.isVisible = false;
            wall5.isVisible = false; 
            wall6.isVisible = false;
            k=1; 
        }
               
    }));


 
    wall6.actionManager = new BABYLON.ActionManager(scene);
    wall6.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        
        if(wall6.isVisible === false){
            wall5.isVisible = true;
            wall6.isVisible = true; 
            wall7.isVisible = true; 
            k=0;
        }else{
            wall5.isVisible = false;
            wall6.isVisible = false; 
            wall7.isVisible = false;
            k=1;
        }
               
    }));

    wall7.actionManager = new BABYLON.ActionManager(scene);
    wall7.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        
        if(wall7.isVisible === false){
            wall6.isVisible = true;
            wall7.isVisible = true; 
            wall8.isVisible = true;
            k=0; 
        }else{
            wall6.isVisible = false;
            wall7.isVisible = false; 
            wall8.isVisible = false; 
            k=1;
        }                
    }));

    wall8.actionManager = new BABYLON.ActionManager(scene);
    wall8.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        
        if(wall8.isVisible === false){
            wall7.isVisible = true;
            wall8.isVisible = true; 
            wall9.isVisible = true;
            k=0; 
        }else{
            wall7.isVisible = false;
            wall8.isVisible = false; 
            wall9.isVisible = false;
            k=1; 
        } 
               
    }));

    wall9.actionManager = new BABYLON.ActionManager(scene);
    wall9.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        
        if(wall9.isVisible === false){
            wall8.isVisible = true;
            wall9.isVisible = true; 
            wall10.isVisible = true; 
            k=0;
        }else{
            wall8.isVisible = false;
            wall9.isVisible = false; 
            wall10.isVisible = false;
            k=1; 
        }
               
    }));

    wall10.actionManager = new BABYLON.ActionManager(scene);
    wall10.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        
        if(wall10.isVisible === false){
            wall9.isVisible = true;
            wall10.isVisible = true; 
            wall11.isVisible = true; 
            k=0;
        }else{
            wall9.isVisible = false;
            wall10.isVisible = false; 
            wall11.isVisible = false; 
            k=1;
        } 
 
               
    }));

    wall11.actionManager = new BABYLON.ActionManager(scene);
    wall11.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        
        if(wall11.isVisible === false){
            wall10.isVisible = true;
            wall11.isVisible = true; 
            wall12.isVisible = true;
            k=0; 
        }else{
            wall10.isVisible = false;
            wall11.isVisible = false; 
            wall12.isVisible = false; 
            k=1;
        }
               
    }));

    wall12.actionManager = new BABYLON.ActionManager(scene);
    wall12.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {           
        if(wall12.isVisible === false){
            wall11.isVisible = true;
            wall12.isVisible = true; 
            wall13.isVisible = true; 
            k=0;
        }else{
            wall11.isVisible = false;
            wall12.isVisible = false; 
            wall13.isVisible = false;
            k=1;
        }
               
    }));

    wall13.actionManager = new BABYLON.ActionManager(scene);
    wall13.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
        
        if(wall13.isVisible === false){
            wall12.isVisible = true;
            wall13.isVisible = true; 
            wall14.isVisible = true; 
            k=0;
        }else{
            wall12.isVisible = false;
            wall13.isVisible = false; 
            wall14.isVisible = false;
            k=1;
        }
               
    }));

    wall14.actionManager = new BABYLON.ActionManager(scene);
    wall14.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:camCollider
    }, function () {    
       
        if(wall14.isVisible === false){
            wall13.isVisible = true;
            wall14.isVisible = true; 
            wall1.isVisible = true;
            k=0; 
        }else{
            wall13.isVisible = false;
            wall14.isVisible = false; 
            wall1.isVisible = false;
            k=1; 
        } 
    }));

    

    /*camCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionExitTrigger,
        parameter: wall1,
    }, function () {
        
    }));*/


});