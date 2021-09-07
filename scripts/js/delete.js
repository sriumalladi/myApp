var createScene = function () {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    scene.clearColor = new BABYLON.Color3(0.31, 0.48, 0.64);

    //add an arcRotateCamera to the scene
    var camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(125), BABYLON.Tools.ToRadians(70), 25, new BABYLON.Vector3(0, 3, 0), scene);
    camera.lowerRadiusLimit = 10;
    //camera.upperRadiusLimit = 40;

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    //enable physics in the scene
    scene.enablePhysics(new BABYLON.Vector3(0,-9.8,0), new BABYLON.AmmoJSPlugin());

    var light3 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light3.intensity = 0.4;
    light3.specular = BABYLON.Color3.Black();
    light3.position = new BABYLON.Vector3(0, 10, 40);
    //array for holding the cannon and "paired" animation group
    var cannonAnimationPairings = {};

    //array for holding readyToPlay status for the cannons
    var cannonReadyToPlay = {};

    var secondBox =[];

    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/sriumalladi/myApp/master/", "box3.glb", scene, function (box2Meshes, particleSystems, skeletons, animationGroups) {
        //box2 = box2Meshes[0];

        var cannon = box2Meshes[0];
        cannon.setParent(null);
        //box2[0].dispose();
        //box2Meshes[0].dispose();

        var importedAnimGroups = animationGroups;

        var animations = [];
        for (var i = 0; i < importedAnimGroups.length; i++) {
            importedAnimGroups[i].stop();
            animations.push(importedAnimGroups[i].targetedAnimations[1].animation);
           //importedAnimGroups[i].dispose();
        }

         var cannonAnimGroup = new BABYLON.AnimationGroup("cannonAnimGroup");
        cannonAnimGroup.addTargetedAnimation(animations[0], cannon.getChildMeshes()[1]);
        cannonAnimGroup.addTargetedAnimation(animations[2], cannon.getChildMeshes()[1]);
        cannonAnimGroup.addTargetedAnimation(animations[2], cannon.getChildMeshes()[1]);

        console.log(animations[1].name);

        

       


        var boxPlaces = [];
        boxPlaces.push([1, Math.PI / 2.2, -40, 57 ]);
        boxPlaces.push([2, Math.PI / 2, 28, 26 ]);
        boxPlaces.push([3, 15 * Math.PI / 15, 5, -18 ]);
        boxPlaces.push([1, -Math.PI / 1.8, 28, 30 ]);
        boxPlaces.push([2, -Math.PI / 2, 10, -4 ]);
        boxPlaces.push([3, -Math.PI / 2, -24, 35 ]);
        boxPlaces.push([1, 15 * Math.PI / 15, -10, -18 ]);
        boxPlaces.push([2, 15 * Math.PI / 15, -22, -18 ]);
        boxPlaces.push([3, 15 * Math.PI / 16, -34, 20 ]);
        boxPlaces.push([1, -Math.PI / 12, -10, -18 ]);
        boxPlaces.push([2, 3, -19, 80 ]);
        boxPlaces.push([3, -Math.PI / 12, -27, 80 ]);
        boxPlaces.push([1, Math.PI / 2.2, -24, 40 ]);
        boxPlaces.push([2, 3, 32, 78 ]);
        boxPlaces.push([3, -Math.PI / 20, 3, 98]);



        for (let i = 0; i < boxPlaces.length; i++) {
             if(boxPlaces[i][0] === 2){
                secondBox[i] = cannon.clone("cannonClone" + i);
                secondBox[i].rotation = new BABYLON.Vector3(0, boxPlaces[i][1], 0 );
                secondBox[i].rotation.y = boxPlaces[i][1]; 
                secondBox[i].position.x = boxPlaces[i][2];             
                secondBox[i].position.z = boxPlaces[i][3];
                secondBox[i].checkCollisions = true;

                var cannonAnimGroupClone = new BABYLON.AnimationGroup("cannonAnimGroupClone" + i);
                //cannonAnimGroupClone.addTargetedAnimation(cannonAnimGroup.targetedAnimations[0].animation, secondBox);
                cannonAnimGroupClone.addTargetedAnimation(cannonAnimGroup.targetedAnimations[2].animation, secondBox[i].getChildMeshes()[1]);
                cannonAnimGroupClone.addTargetedAnimation(cannonAnimGroup.targetedAnimations[1].animation, secondBox[i].getChildMeshes()[1]);
                
                cannonAnimationPairings[secondBox[i].name] = cannonAnimGroupClone.name;

                //store key/value pair for the cannon name and it's readyToPlay status as 1;
                cannonReadyToPlay[secondBox[i].name] = 1;
             }  
        }

        cannon.dispose();
        cannonAnimGroup.dispose();

         var box = scene.getAnimationGroupByName('Box');
        var boxOpen = scene.getAnimationGroupByName('Open');
        var boxClose = scene.getAnimationGroupByName('Close');

        scene.onPointerDown = function (evt, pickResult) {
                if (pickResult.pickedMesh){

                var topParent = pickResult.pickedMesh.parent;
                if (topParent.parent) {
                    topParent = topParent.parent;
                }

                var animationToPlay = cannonAnimationPairings[topParent.name];


                for(var i = 0; i < scene.animationGroups.length; i++){
                    
                         if (scene.animationGroups[i].name === animationToPlay) {

                             scene.animationGroups[i].play();                       

                         }
                }
                

            }

        }

        







    });



    return scene;

};