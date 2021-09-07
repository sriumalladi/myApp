var totalQuestions = 5;
var box1;
var box2;
var box3;
var boxCollider;
var boxAnimationPairs = {};
var keyRotate;
var key;

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
boxPlaces.push([2, 0, -19, 77 ]); //4
boxPlaces.push([3, -Math.PI / 12, -27, 80 ]);
boxPlaces.push([1, Math.PI / 2.2, -24, 40 ]);
boxPlaces.push([2, 0, 32, 77 ]); //5
boxPlaces.push([3, -Math.PI / 20, 3, 98]);


//Key and loader
BABYLON.SceneLoader.ImportMesh("", "../../3d/key/", "key.glb", scene, function (meshes) {
    //scene.createDefaultEnvironment();       
    key = meshes[0];
    key.setParent(null);
    key.position.y = 2;
    key.position.x = -100;
});




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
var keyBox7 = scene.getMeshByName('keyBox7');
var keyBox10 = scene.getMeshByName('keyBox10');
var keyBox13 = scene.getMeshByName('keyBox13');



// Glow particles 

var glowEffect = BABYLON.Mesh.CreateBox("glowEffect", 1, scene);
glowEffect.position.y = -2;

var glowParticles = new BABYLON.ParticleSystem("glowParticles", 2000, scene);

glowParticles.particleTexture = new BABYLON.Texture("../../3d/textures/flare.png", scene);
glowParticles.emitter = glowEffect;
glowParticles.minEmitBox = new BABYLON.Vector3(-1, 0, -1.5);
glowParticles.maxEmitBox = new BABYLON.Vector3(1, 0, 1.5);
glowParticles.color1 = new BABYLON.Color4(0.7, 0.8, 1, 1);
glowParticles.color2 = new BABYLON.Color4(0.2, 0.5, 1, 1);
glowParticles.clorDead = new BABYLON.Color4(0, 0, 0.2, 0);
glowParticles.minSize = 0.2;
glowParticles.maxSize = 0.5;

glowParticles.emitRate = 1500;
glowParticles.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE; // Blending with bg
glowParticles.gravity = new BABYLON.Vector3(0, -9.81, 0);

glowParticles.direction1 = new BABYLON.Vector3(0, 4, 0);
glowParticles.direction2 = new BABYLON.Vector3(0, 3, 0);

glowParticles.minAngularSpeed = 0;
glowParticles.maxAngularSpeed = Math.PI;

glowParticles.minEmitPower = 1;
glowParticles.maxEmitPower = 3;
glowParticles.updateSpeed = 0.005;

//glowParticles.isLocal = true;
glowEffect.isVisible = false;
//glowParticles.start();




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
    var lockedBox7 = scene.getMeshByName('secondBox7.Box');
    var lockedBox10 = scene.getMeshByName('secondBox10.Box');
    var lockedBox13 = scene.getMeshByName('secondBox13.Box');
 
    heroCollider.actionManager = new BABYLON.ActionManager(scene);

    

    heroCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:keyBox1,
    }, function () {
        a = lockedBox1;
        glowParticles.stop();       
        var topParent = a.parent;
        if (topParent.parent) {
            topParent = topParent.parent;
        }
        var animationToPlay = boxAnimationPairs[topParent.name];
        for(var i = 0; i < scene.animationGroups.length; i++){    
            if (scene.animationGroups[i].name === animationToPlay) {
                scene.animationGroups[i].play();
               

                showQuestions();
                          
            }
        }
       

    }));

    heroCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:keyBox4,
    }, function () {    
        glowParticles.stop();   
        a = lockedBox4;       
        var topParent = a.parent;
        if (topParent.parent) {
            topParent = topParent.parent;
        }
        var animationToPlay = boxAnimationPairs[topParent.name];
        for(var i = 0; i < scene.animationGroups.length; i++){    
            if (scene.animationGroups[i].name === animationToPlay) {
                scene.animationGroups[i].play();
                glowEffect.rotation.y = 0;
                glowEffect.position.x = 8;
                glowEffect.position.z = -2;
                glowParticles.start(500);
                setTimeout(function(){key.position.x = 8; key.position.z = -2; }, 2000);
            }
        }
    }));
    heroCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:keyBox7,
    }, function () {
        glowParticles.stop();       
        a = lockedBox7;       
        var topParent = a.parent;
        if (topParent.parent) {
            topParent = topParent.parent;
        }
        var animationToPlay = boxAnimationPairs[topParent.name];
        for(var i = 0; i < scene.animationGroups.length; i++){    
            if (scene.animationGroups[i].name === animationToPlay) {
                scene.animationGroups[i].play();
                glowEffect.rotation.y = 1.6;
                glowEffect.position.x = -22;
                glowEffect.position.z = -17;
                glowParticles.start(500); 
                setTimeout(function(){key.position.x = -22; key.position.z = -17; }, 2000);               
            }
        }
    }));
    heroCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:keyBox10,
    }, function () {
        glowParticles.stop();       
        a = lockedBox10;       
        var topParent = a.parent;
        if (topParent.parent) {
            topParent = topParent.parent;
        }
        var animationToPlay = boxAnimationPairs[topParent.name];
        for(var i = 0; i < scene.animationGroups.length; i++){    
            if (scene.animationGroups[i].name === animationToPlay) {
                scene.animationGroups[i].play();
                glowEffect.rotation.y = 1.6;
                glowEffect.position.x = -19;
                glowEffect.position.z = 77;
                glowParticles.start(500);
                setTimeout(function(){key.position.x = -19; key.position.z = 77; }, 2000);
            }
        }

       
    }));
    heroCollider.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter:keyBox13,
    }, function () {
        glowParticles.stop();
        a = lockedBox13;       
        var topParent = a.parent;
        if (topParent.parent) {
            topParent = topParent.parent;
        }
        var animationToPlay = boxAnimationPairs[topParent.name];
        for(var i = 0; i < scene.animationGroups.length; i++){    
            if (scene.animationGroups[i].name === animationToPlay) {
                scene.animationGroups[i].play();
                glowEffect.rotation.y = 1.6;
                glowEffect.position.x = 32;
                glowEffect.position.z = 77;
                glowParticles.start(500);
                setTimeout(function(){key.position.x = 32; key.position.z = 77; }, 2000);
            }
        }
       
    }));
});

/*Key and loader 


BABYLON.SceneLoader.Append("../../3d/key/", "key.glb", scene, function (meshes) {});*/







