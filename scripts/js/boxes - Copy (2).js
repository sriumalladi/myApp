var totalQuestions = 5;
var box1;
var box2;
var box3;
var boxCollider;
var boxAnimationPairs = {};

var boxPlaces = [];
boxPlaces.push([1, Math.PI / 2.2, -40, 57 ]);
boxPlaces.push([2, Math.PI / 2, 27, 26 ]);// 1
boxPlaces.push([3, 15 * Math.PI / 15, 5, -18 ]);
boxPlaces.push([1, -Math.PI / 1.8, 28, 30 ]);
boxPlaces.push([2,  Math.PI / 2, 8, -2 ]); //2
boxPlaces.push([3, -Math.PI / 2, -24, 35 ]);
boxPlaces.push([1, 15 * Math.PI / 15, -10, -18 ]);
boxPlaces.push([2, 15 * Math.PI / 15, -22, -17 ]); //3
boxPlaces.push([3, 15 * Math.PI / 16, -34, 20 ]);
boxPlaces.push([1, -Math.PI / 12, -10, -18 ]);
boxPlaces.push([2, 0, -19, 79 ]); //4
boxPlaces.push([3, -Math.PI / 12, -27, 80 ]);
boxPlaces.push([1, Math.PI / 2.2, -24, 40 ]);
boxPlaces.push([2, 0, 32, 77 ]); //5
boxPlaces.push([3, -Math.PI / 20, 3, 98]);






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
var keyBox4 = scene.getMeshByName('keyBox4');



BABYLON.SceneLoader.ImportMesh("", "../../3d/boxes/", "box3.glb", scene, function (box2Meshes, particleSystems, skeletons, animationGroups) {
    var box2 = box2Meshes[0];
    box2.setParent(null);
    box2.position.y = -1.5;  
    box2.scaling.scaleInPlace(2);

    var box2importedAnimGroups = animationGroups;
    var secondBox = [];

    var animations = [];
    for (var i = 0; i < box2importedAnimGroups.length; i++) {
        box2importedAnimGroups[i].stop();
        animations.push(box2importedAnimGroups[i].targetedAnimations[1].animation);
        box2importedAnimGroups[i].dispose();
    }

    var box2AnimGroup = new BABYLON.AnimationGroup("box2AnimGroup");
    box2AnimGroup.addTargetedAnimation(animations[0], box2.getChildMeshes()[1]);
    box2AnimGroup.addTargetedAnimation(animations[1], box2.getChildMeshes()[1]);
    box2AnimGroup.addTargetedAnimation(animations[2], box2.getChildMeshes()[1]);

    for (let i = 0; i < boxPlaces.length; i++) {
        if(boxPlaces[i][0] === 2){
           secondBox[i] = box2.clone("secondBox" + i);
           secondBox[i].rotation = new BABYLON.Vector3(0, boxPlaces[i][1], 0 );
           secondBox[i].rotation.y = boxPlaces[i][1]; 
           secondBox[i].position.x = boxPlaces[i][2];             
           secondBox[i].position.z = boxPlaces[i][3];
           secondBox[i].checkCollisions = true;
           var box2AnimGroupClone = new BABYLON.AnimationGroup("box2AnimGroupClone" + i);
           box2AnimGroupClone.addTargetedAnimation(box2AnimGroup.targetedAnimations[2].animation, secondBox[i].getChildMeshes()[1]);
          // box2AnimGroupClone.addTargetedAnimation(box2AnimGroup.targetedAnimations[1].animation, secondBox[i].getChildMeshes()[1]);

           boxAnimationPairs[secondBox[i].name] = box2AnimGroupClone.name;
        }
    }

    box2.dispose();
    box2AnimGroup.dispose();



    var a;
    var lockedBox1 = scene.getMeshByName('secondBox1.Box');
    var lockedBox4 = scene.getMeshByName('secondBox4.Box');
 
    heroCollider.actionManager = new BABYLON.ActionManager(scene);
    
    heroCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:keyBox1,
    }, function () {
        a = lockedBox1;       
        var topParent = a.parent;
        if (topParent.parent) {
            topParent = topParent.parent;
        }
        var animationToPlay = boxAnimationPairs[topParent.name];
        for(var i = 0; i < scene.animationGroups.length; i++){    
            if (scene.animationGroups[i].name === animationToPlay) {
                scene.animationGroups[i].play();
            }
        }
    }));

    heroCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:keyBox4,
    }, function () {
        a = lockedBox4;       
        var topParent = a.parent;
        if (topParent.parent) {
            topParent = topParent.parent;
        }
        var animationToPlay = boxAnimationPairs[topParent.name];
        for(var i = 0; i < scene.animationGroups.length; i++){    
            if (scene.animationGroups[i].name === animationToPlay) {
                scene.animationGroups[i].play();
            }
        }
    }));

    
});









