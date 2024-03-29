var totalQuestions = 5;
var myXPositions = [0, 0, 0];
var myZPositions = [10, 20, 30];
var box1;
var box2;
var box3;
var totalBoxes = [box1,box2,box3];
var boxCollider;
var box = scene.getAnimationGroupByName('Box');
var boxOpen = scene.getAnimationGroupByName('Open');
var boxClose = scene.getAnimationGroupByName('Close');
var a;

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


var firstBox=[];
var secondBox=[];
var secondBoxanimations = [];
var thirdBox=[];
var box2AnimationPairings = {};


boxCollider = BABYLON.Mesh.CreateBox("boxesColli", 5 , scene);
boxCollider.position.y = -2.8;
boxCollider.isVisible = false;
boxCollider.checkCollisions = false;
var newBoxes = [];
for (var index = 0; index < boxPlaces.length; index++) {
    newBoxes[index] = boxCollider.createInstance("keyBox" + index);
    //newBoxes[index].position.x = boxPlaces[2] * index;

    newBoxes[index].rotation = new BABYLON.Vector3(boxPlaces[index][1], 0 , 0 );
    newBoxes[index].position.z = boxPlaces[index][3];
    newBoxes[index].position.x = boxPlaces[index][2];
    newBoxes[index].isVisible = false; 
    newBoxes[index].checkCollisions =true; 
}




var keyBox1 = scene.getMeshByName('keyBox1');
keyBox1.position.y = 4;

BABYLON.SceneLoader.ImportMesh("", "../../3d/boxes/", "box1.glb", scene, function (box1Meshes, particleSystems, skeletons, animationGroups) {
    //box1 = BABYLON.Mesh.MergeMeshes(box1Meshes.filter(m => m.getTotalVertices() > 0), true, true);
    box1 = box1Meshes[0];
    box1.scaling.scaleInPlace(0.5);
    box1.position.z = -100;
    box1.position.y = -2.5;    
    for (let i = 0; i < boxPlaces.length; i++) {
        if(boxPlaces[i][0] === 1){
            firstBox[i] = box1.clone("a" + i);
            firstBox[i].rotation = new BABYLON.Vector3(0, boxPlaces[i][1], 0 );
            firstBox[i].rotation.y = boxPlaces[i][1]; 
            firstBox[i].position.x = boxPlaces[i][2];             
            firstBox[i].position.z = boxPlaces[i][3];
            firstBox[i].checkCollisions = true;                
        }        
    } 

    box1.dispose();
});

BABYLON.SceneLoader.ImportMesh("", "../../3d/boxes/", "box3.glb", scene, function (box2Meshes, particleSystems, skeletons, animationGroups) {
    box2 = box2Meshes[0];
    var x = animationGroups;   
    box2.position.z = -100;
    box2.position.y = -1.5;  
    box2.scaling.scaleInPlace(2);    
    box2.rotation = new BABYLON.Vector3(0, 0, 0);

    box = scene.getAnimationGroupByName('Box');
    boxOpen = scene.getAnimationGroupByName('Open');
    boxClose = scene.getAnimationGroupByName('Close');

    for (let i = 0; i < boxPlaces.length; i++) {
        if(boxPlaces[i][0] === 2){
            secondBox[i] = box2.clone("secondBox" + i);
           // secondBox[i] = box2.animation.clone('zzz');
            secondBox[i].rotation = new BABYLON.Vector3(0, boxPlaces[i][1], 0 );
            secondBox[i].position.z = boxPlaces[i][3];
            secondBox[i].position.x = boxPlaces[i][2];
            secondBox[i].checkCollisions = true;
            secondBox[i].applyGravity = true;
            
            var box2AnimGroupClone = new BABYLON.AnimationGroup('box2AnimGroupClone' + i);
            //box2AnimGroupClone.addTargetedAnimation(box2AnimGroup.targetedAnimations[i].animation,secondBox[i]);
            //box2AnimGroupClone.addTargetedAnimation(box2AnimGroup.targetedAnimations[1].animation,secondBox[i]);
           // box2AnimGroupClone.addTargetedAnimation(box2AnimGroup.targetedAnimations[2].animation,secondBox[i]);

           // box2AnimationPairings[secondBox.name] = box2AnimGroupClone.name;

            //box2ReadyToPlay[secondBox.name] = 1;

            //console.log(box2AnimGroupClone.length);    

        }        
    }

    box2.dispose();


    a = scene.getMeshByName('secondBox1');
    a.position.y = -1;
   

   //console.log(a[4].getChildMeshes().length);
    var x = scene.getMeshByName('secondBox1.Cover_Low.Box')
    //secondBox[1].position.y = -1;
    //a.boxOpen = a.boxOpen.clone('sssss');

    heroCollider.actionManager = new BABYLON.ActionManager(scene);
    heroCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:a,
    }, function () {

        //a.animationGroups[1].play();

        boxOpen.start(true, 1.0, boxOpen.from, boxOpen.to, false);
        x.play(boxOpen);
       
        //var topParent = pickResult.pickedMesh.parent;
        //scene.beginDirectAnimation(secondBox[1], boxOpen.start(true, 1.0, boxOpen.from, boxOpen.to, false));
       
        console.log(x);
        
    }));

   /* heroCollider.actionManager = new BABYLON.ActionManager(scene);
    heroCollider.actionManager.registerAction(new BABYLON.SetValueAction(
        { trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: a }
        , a, "animation", boxOpen.start(true, 1.0, boxOpen.from, boxOpen.to, false)));*/
    
});

BABYLON.SceneLoader.ImportMesh("", "../../3d/boxes/", "box2.glb", scene, function (box3Meshes, particleSystems, skeletons, animationGroups) {
    box3 = box3Meshes[0];    
    box3.position.z = -100;
    box3.position.y = -1.5;  
    box3.scaling.scaleInPlace(2);
    for (let i = 0; i < boxPlaces.length; i++) {
        if(boxPlaces[i][0] === 3){
            thirdBox[i] = box3.clone("c"+i);
            thirdBox[i].rotation = new BABYLON.Vector3(0, boxPlaces[i][1], 0 );
            thirdBox[i].position.z = boxPlaces[i][3];
            thirdBox[i].position.x = boxPlaces[i][2];                 
        }        
    }

    box3.dispose();
});



    
    //secondBox[1].position.y = 4;

    /*heroCollider.actionManager = new BABYLON.ActionManager(scene);
    heroCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:a,
    }, function () {
        boxOpen.start(true, 1.0, boxOpen.from, boxOpen.to, false);
        console.log("This is Box 1");    
    }));*/









