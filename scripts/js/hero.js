// Hero and Hero Animation
var hero;
var animating = false;
var heroCollider;
var camCollider;

camCollider = BABYLON.Mesh.CreateSphere("camMov", 10, 0.5, scene);
heroCollider = BABYLON.Mesh.CreateBox("boxHero", 3, scene); 
BABYLON.SceneLoader.ImportMesh("", "../../3d/hero/", "hero.glb", scene, function (newMeshes,
    particleSystems, skeletons, animationGroups) {
    hero = newMeshes[0];
    hero.position = new BABYLON.Vector3(0, -1.5, 0);// Change z value to 0 if applying physics
    hero.rotation.y = BABYLON.Tools.ToRadians(45);
    hero.scaling.scaleInPlace(3.5);
    var heroSpeed = 0.17;
    var heroSpeedBackwards = 0.05;
    var heroRotationSpeed = 0.03;
    heroCollider.checkCollisions = true;
    heroCollider.isVisible = false;
    camCollider.isVisible = true;
    //hero.ellipsoid = new BABYLON.Vector3(5, 1, 5);
    camCollider.checkCollisions = true;   
    heroCollider.position = new BABYLON.Vector3(0, 0, 0);
    camCollider.position = new BABYLON.Vector3(0, 0, 0);
    heroCollider.material = new BABYLON.StandardMaterial("light", scene);
    heroCollider.material.emissiveColor = new BABYLON.Color3(0, 1, 0);
  
    heroCollider.physicsImpostor = new BABYLON.PhysicsImpostor(heroCollider, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.1 }, scene);
    camCollider.parent = camera;
    

    // Key Controlls
    var inputMap = {};
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger,
        function (evt) {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger,
        function (evt) {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));


    // Animation Groups

    const idleAnim = scene.getAnimationGroupByName('01Idle');
    const walkAnim = scene.getAnimationGroupByName('04Walk');
    const back = scene.getAnimationGroupByName('03Back');

    // Key Functions
    scene.onBeforeRenderObservable.add(() => {
        var keydown = false;
        if (inputMap["w"] || inputMap["ArrowUp"]) {
            heroCollider.moveWithCollisions(heroCollider.forward.scaleInPlace(heroSpeed));
            keydown = true;
        }

        if (inputMap["s"] || inputMap["ArrowDown"]) {
            heroCollider.moveWithCollisions(heroCollider.forward.scaleInPlace(-heroSpeedBackwards));
            keydown = true;
        }

        if (inputMap["a"] || inputMap["ArrowLeft"]) {
            heroCollider.rotate(BABYLON.Vector3.Up(), -heroRotationSpeed);
            keydown = true;
        }

        if (inputMap["d"] || inputMap["ArrowRight"]) {
            heroCollider.rotate(BABYLON.Vector3.Up(), heroRotationSpeed);
            keydown = true;
        }


        //Manage animations to be played  
        if (keydown) {
            if (!animating) {
                animating = true;
                if (inputMap["s"]) {
                    //Walk backwards
                    back.start(true, 1.0, back.from, back.to, false);
                }
                else {
                    //Walk
                    walkAnim.start(true, 1.0, walkAnim.from, walkAnim.to, false);
                }
            }
        }
        else {

            if (animating) {
                //Default animation is idle when no key is down     
                idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false);

                //Stop all animations besides Idle Anim when no key is down
                walkAnim.stop();
                back.stop();

                //Ensure animation are played only once per rendering loop
                animating = false;
            }
        }

    });

  
    
    hero.parent = heroCollider;
    camera.parent = heroCollider;

    // Shadows 

    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator.addShadowCaster(hero);
    shadowGenerator.useExponentialShadowMap = true;

    var shadowGenerator2 = new BABYLON.ShadowGenerator(1024, light2);
    shadowGenerator2.addShadowCaster(hero);
    shadowGenerator2.usePoissonSampling = true;
});