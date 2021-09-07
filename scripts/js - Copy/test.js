var animateAction = (message) => {

    var container = document.getElementById('animateActionContainer');

    var i = 0;

    document.getElementById('animateActionMessage').innerText = message;

    var animateAction_id = setInterval(animateAction_frame, 10);

    function animateAction_frame() {
        //console.log(i);

        if (i == 0) {
            container.style.display = 'block';
        }
        i++;
        if (i < 60) {
            container.style.opacity = (i / 60);

        } else {
            container.style.opacity = 1.6 - (i / 60);
        }

        if (i == 120) {
            clearInterval(animateAction_id);
            container.style.display = 'none';
        }

    }

}

var toggleContainer = () => {

    var container = document.getElementById("messageContainer");

    if (container.style.display == 'block') {
        container.style.display = 'none'
    } else {
        container.style.display = 'block'
    }

}

var setMessage = (name) => {
    document.getElementById("message").innerText = name;
}



var showRay = false;
var scene = false;


window.addEventListener('DOMContentLoaded', function () {

    var canvas = document.getElementById('renderCanvas');
    var engine = new BABYLON.Engine(canvas, true);

    var createScene = function () {

        scene = new BABYLON.Scene(engine);

        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

        light.intensity = .9;


        //create space
        var mat0 = new BABYLON.StandardMaterial("mat0", scene);
        var mat1 = new BABYLON.StandardMaterial("mat1", scene);
        var mat2 = new BABYLON.StandardMaterial("mat1", scene);

        mat0.diffuseColor.copyFromFloats(0.8, 0.2, 0.2);
        mat0.backFaceCulling = false;

        mat1.diffuseColor.copyFromFloats(0.5, 0, 0.5);
        mat1.backFaceCulling = false;

        mat2.diffuseColor.copyFromFloats(0, 0, 0.8);
        mat2.backFaceCulling = false;

        var box1 = BABYLON.MeshBuilder.CreateBox("wall", {
            height: 9,
            width: 10
        }, scene);
        box1.position.x = 0;
        box1.position.z = 5;
        box1.material = mat1;

        var box2 = BABYLON.MeshBuilder.CreateBox("wall", {
            height: 5,
            width: 10,
            depth: 5
        }, scene);
        box2.position.x = -5;
        box2.position.z = 0;
        box2.rotation.y = Math.PI / 2;
        box2.material = mat1;

        var box3 = BABYLON.MeshBuilder.CreateBox("wall", {
            height: 5,
            width: 10,
            depth: 5
        }, scene);
        box3.position.x = 5;
        box3.position.z = 0;
        box3.rotation.y = Math.PI / 2;
        box3.material = mat1;

        var box4 = BABYLON.MeshBuilder.CreateBox("wall", {
            height: 10,
            width: 10,
            depth: 1
        }, scene);
        box4.position.x = 0;
        box4.position.z = 10;
        box4.position.y = 4;
        box4.rotation.x = Math.PI / 2;
        box4.material = mat1;


        //box5 will move up and down
        var box5 = BABYLON.MeshBuilder.CreateBox("wall-movingPlatform", {
            height: 10,
            width: 10,
            depth: 1
        }, scene);
        box5.position.x = -11;
        box5.position.z = 10;
        box5.position.y = 8;
        box5.rotation.x = Math.PI / 2;
        box5.material = mat1;
        box5.direction = "up";
        box5.active = false;

        box5.update = () => {
            if (box5.active) {

                var y = box5.position.y;
                if (Math.round(y) == 2) {
                    box5.direction = "up";
                }
                if (Math.round(y) == 20) {
                    box5.direction = "down";
                }
                if ((y >= 2 && y <= 21) && (box5.direction == "up")) {
                    box5.position.y += .1;
                }
                if ((y >= 2 && y <= 20) && (box5.direction == "down")) {
                    box5.position.y -= .1;
                }

            }

        }


        var box6 = BABYLON.MeshBuilder.CreateBox("wall", {
            height: 10,
            width: 10,
            depth: 1
        }, scene);
        box6.position.x = 0;
        box6.position.z = 10;
        box6.position.y = 12;
        box6.rotation.x = Math.PI / 2;
        box6.material = mat1;


        var box7 = BABYLON.MeshBuilder.CreateBox("wall-movingPlatform", {
            height: 10,
            width: 10,
            depth: 1
        }, scene);
        box7.position.x = 11;
        box7.position.z = 10;
        box7.position.y = 8;
        box7.rotation.x = Math.PI / 2;
        box7.material = mat1;

        box7.direction = "north";
        box7.active = true;

        box7.update = () => {
            if (box7.active) {

                var z = box7.position.z;
                if (Math.round(z) == 2) {
                    box7.direction = "north";
                }
                if (Math.round(z) == 20) {
                    box7.direction = "south";
                }

                if ((z >= 2 && z <= 21) && (box7.direction == "north")) {
                    box7.position.z += .1;
                }
                if ((z >= 2 && z <= 21) && (box7.direction == "south")) {
                    box7.position.z -= .1;
                }


            }

        }

        var box8 = BABYLON.MeshBuilder.CreateBox("wall-movingPlatform", {
            height: 10,
            width: 10,
            depth: 1
        }, scene);
        box8.position.x = -10;
        box8.position.z = 25;
        box8.position.y = 8;
        box8.rotation.x = Math.PI / 2;
        box8.material = mat1;

        box8.direction = "east";
        box8.active = true;

        box8.update = () => {
            if (box8.active) {

                var x = box8.position.x;

                if (Math.round(x) == -20) {
                    box8.direction = "east";
                }
                if (Math.round(x) == 0) {
                    box8.direction = "west";
                }

                if ((x >= -20 && x <= 0) && (box8.direction == "east")) {
                    box8.position.x += .1;
                }

                if ((x >= -20 && x <= 0) && (box8.direction == "west")) {
                    box8.position.x -= .1;
                }


            }

        }

        box1.checkCollisions = true;
        box2.checkCollisions = true;
        box3.checkCollisions = true;
        box4.checkCollisions = true;
        box5.checkCollisions = true;
        box6.checkCollisions = true;
        box7.checkCollisions = true;
        box1.isPickable = true;
        box2.isPickable = true;
        box3.isPickable = true;
        box4.isPickable = true;
        box5.isPickable = true;
        box6.isPickable = true;
        box7.isPickable = true;

        //create slopes 
        /*
          N
          |
        W - E
          |
          S
          s->n
          n->s
          w->e
          e->w
        */

        var slope1 = BABYLON.MeshBuilder.CreateBox("wall-slope", {
            height: 10,
            width: 10,
            depth: 1
        }, scene);
        slope1.position.x = -20;
        slope1.position.z = -8.5;
        slope1.position.y = .63;
        slope1.rotation.x = Math.PI / 4; //90 
        slope1.material = mat1;
        slope1.direction = 'sn';

        var slope2 = BABYLON.MeshBuilder.CreateBox("wall-slope", {
            height: 10,
            width: 10,
            depth: 1
        }, scene);
        slope2.position.x = -28.25;
        slope2.position.z = 0;
        slope2.position.y = .63;
        slope2.rotation.x = Math.PI / 4; //90 
        slope2.rotation.y = Math.PI / 2; //90 
        slope2.material = mat1;
        slope2.direction = 'ew';


        var slope3 = BABYLON.MeshBuilder.CreateBox("wall-slope", {
            height: 10,
            width: 10,
            depth: 1
        }, scene);
        slope3.position.x = -11.7;
        slope3.position.z = 0;
        slope3.position.y = .63;
        slope3.rotation.x = Math.PI / 4; //90 
        slope3.rotation.y = -Math.PI / 2; //90 
        slope3.material = mat1;
        slope3.direction = '45-north';
        slope3.direction = 'we';

        var slope4 = BABYLON.MeshBuilder.CreateBox("wall-slope", {
            height: 10,
            width: 10,
            depth: 1
        }, scene);
        slope4.position.x = -20;
        slope4.position.z = 8.5;
        slope4.position.y = .63;
        slope4.rotation.x = -Math.PI / 4; //90 
        //slope1.rotation.z = Math.PI / 4; //45
        slope4.material = mat1;
        slope4.direction = 'ns';


        var matTop = new BABYLON.StandardMaterial("matTop", scene);

        matTop.diffuseColor.copyFromFloats(0.5, 0.5, 0.5);
        matTop.backFaceCulling = false;

        var top = BABYLON.MeshBuilder.CreateBox("wall", {
            height: 10.1,
            width: 10.1,
            depth: 1
        }, scene);
        top.position.x = -20;
        top.position.z = 0;
        top.position.y = 4;
        top.rotation.x = Math.PI / 2;
        top.material = matTop;


        slope1.checkCollisions = true;
        slope1.isPickable = true;
        slope2.checkCollisions = true;
        slope2.isPickable = true;
        slope3.checkCollisions = true;
        slope3.isPickable = true;
        top.checkCollisions = true;
        top.isPickable = true;



        var ground = BABYLON.Mesh.CreateGround("ground1", 120, 120, 2, scene);
        ground.material = mat2;
        ground.checkCollisions = true;
        ground.isPickable = true;



        //create player
        var playerhitbox = BABYLON.MeshBuilder.CreateCylinder("playerhitbox", {
            diameter: 1,
            height: 2
        }, scene);

        playerhitbox.material = mat0;

        playerhitbox.position.y = 1;
        playerhitbox.isPickable = false;

        //create player sensor Ray 

        var playerSensorRay = new BABYLON.Ray();
        var playerSensorRayHelper = new BABYLON.RayHelper(playerSensorRay);
        playerSensorRayHelper.attachToMesh(playerhitbox, new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, 0, 0), 2);
        // playerSensorRayHelper.show(scene);

        var currentObject = false;


        //create interactive objects 

        var gameObjectMat1 = new BABYLON.StandardMaterial("gameObjectMat1", scene);
        gameObjectMat1.diffuseColor.copyFromFloats(.52, 1, .49);
        gameObjectMat1.backFaceCulling = true;

        var gameObjectMat2 = new BABYLON.StandardMaterial("gameObjectMat2", scene);
        gameObjectMat2.diffuseColor.copyFromFloats(1, 1, .49);
        gameObjectMat2.backFaceCulling = true;

        var gameObjectMat3 = new BABYLON.StandardMaterial("gameObjectMat3", scene);
        gameObjectMat3.diffuseColor.copyFromFloats(1, .2, .49);
        gameObjectMat3.backFaceCulling = true;

        var gameObjectMat4 = new BABYLON.StandardMaterial("gameObjectMat4", scene);
        gameObjectMat4.diffuseColor.copyFromFloats(1, .8, 0);
        gameObjectMat4.backFaceCulling = true;

        var gameObject1 = BABYLON.MeshBuilder.CreateBox("gameObject1", {
            height: 3,
            width: 2,
            depth: 1
        }, scene);
        gameObject1.position = new BABYLON.Vector3(-5, 4, -3);
        gameObject1.material = gameObjectMat1;
        gameObject1.action = (mesh) => {
            console.log('doing action!');
            animateAction('gameObject one action!!!');
        }


        var spheres = 0;
        var gameObject2 = BABYLON.MeshBuilder.CreateBox("gameObject2", {
            height: 3,
            width: 2,
            depth: 1
        }, scene);
        gameObject2.position = new BABYLON.Vector3(5, 4, -3);
        gameObject2.material = gameObjectMat2;
        gameObject2.action = (mesh) => {
            spheres += 2;
            var sphereObj = BABYLON.MeshBuilder.CreateSphere("sphereObj", {
                diameter: 1
            }, scene);
            sphereObj.position = new BABYLON.Vector3(0, 4 + (spheres), 0);
            sphereObj.material = gameObjectMat3;
            sphereObj.isPickable = false;
        }


        var dups = 0;
        var gameObject3 = BABYLON.MeshBuilder.CreateBox("gameObject3", {
            height: 3,
            width: 2,
            depth: 1
        }, scene);
        gameObject3.position = new BABYLON.Vector3(0, 2, -6);
        gameObject3.material = gameObjectMat3;
        gameObject3.dups = 0;
        var gO3Clone = gameObject3.clone("gameObject3Clone");
        gO3Clone.position = new BABYLON.Vector3(0, 15, 6);
        gO3Clone.dups = 0;
        var go3Action = (mesh) => {
            mesh.dups++;
            var wallDupe = BABYLON.MeshBuilder.CreateBox("wall", {
                height: 3,
                width: 2,
                depth: 1
            }, scene);
            wallDupe.position = new BABYLON.Vector3(mesh.position.x, mesh.position.y, mesh.position.z - mesh.dups);
            wallDupe.material = gameObjectMat3;
            console.log('oing action!');
        }

        gameObject3.action = go3Action;
        gO3Clone.action = go3Action;



        var gameObject4 = BABYLON.MeshBuilder.CreateBox("gameObject4", {
            height: 3,
            width: 2,
            depth: 1
        }, scene);
        gameObject4.position = new BABYLON.Vector3(0, 6, 6);
        gameObject4.material = gameObjectMat4;
        gameObject4.active = false;

        var gameObject4ActiveMat = new BABYLON.StandardMaterial("gameObject4ActiveMat", scene);
        gameObject4ActiveMat.diffuseColor.copyFromFloats(0, 0, 1);
        gameObject4ActiveMat.backFaceCulling = true;

        gameObject4.action = () => {

            if (gameObject4.active) {
                gameObject4.active = false;
                box5.active = false;
                gameObject4.material = gameObjectMat4;
            } else {
                gameObject4.active = true;
                box5.active = true;
                gameObject4.material = gameObject4ActiveMat;
            }
        }
        console.log('hello!');

        //create pick up orb
        var orbMat = new BABYLON.StandardMaterial("orbMat", scene);;
        orbMat.diffuseColor.copyFromFloats(0, 1, 0);
        orbMat.backFaceCulling = true;
        var orbMat2 = new BABYLON.StandardMaterial("orbMat2", scene);;
        orbMat2.diffuseColor.copyFromFloats(0, 0, .5);
        orbMat2.backFaceCulling = true;
        var orbMat3 = new BABYLON.StandardMaterial("orbMat3", scene);;
        orbMat3.diffuseColor.copyFromFloats(.5, 0, 0);
        orbMat3.backFaceCulling = true;

        var orbs = new Array();

        var createOrb = (position, speedFactor, maxFollow, material) => {


            var orb = BABYLON.MeshBuilder.CreateSphere("orb", {
                diameter: .5
            }, scene);
            orb.position = position;
            orb.material = material;
            orb.isPickable = false;

            var rayOrbFront = new BABYLON.Ray();
            var rayOrbFrontHelper = new BABYLON.RayHelper(rayOrbFront);
            rayOrbFrontHelper.attachToMesh(orb, new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, 0, .5), .3);

            var rayOrbBack = new BABYLON.Ray();
            var rayOrbBackHelper = new BABYLON.RayHelper(rayOrbBack);
            rayOrbBackHelper.attachToMesh(orb, new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, 0, -.1), .3);

            var rayOrbLeft = new BABYLON.Ray();
            var rayOrbLeftHelper = new BABYLON.RayHelper(rayOrbLeft);
            rayOrbLeftHelper.attachToMesh(orb, new BABYLON.Vector3(1, 0, 0), new BABYLON.Vector3(.2, 0, 0), .3);

            var rayOrbRight = new BABYLON.Ray();
            var rayOrbRightHelper = new BABYLON.RayHelper(rayOrbRight);
            rayOrbRightHelper.attachToMesh(orb, new BABYLON.Vector3(-1, 0, 0), new BABYLON.Vector3(-.2, 0, -0), .3);

            var rayOrbUp = new BABYLON.Ray();
            var rayOrbUpHelper = new BABYLON.RayHelper(rayOrbUp);
            rayOrbUpHelper.attachToMesh(orb, new BABYLON.Vector3(0, 1, 0), new BABYLON.Vector3(0, .5, 0), .3);

            var rayOrbDown = new BABYLON.Ray();
            var rayOrbDownHelper = new BABYLON.RayHelper(rayOrbDown);
            rayOrbDownHelper.attachToMesh(orb, new BABYLON.Vector3(0, 1, 0), new BABYLON.Vector3(0, -.5, 0), .3);

            /*
            rayOrbFrontHelper.show(scene);
            rayOrbBackHelper.show(scene);
            rayOrbLeftHelper.show(scene);
            rayOrbRightHelper.show(scene);
            rayOrbDownHelper.show(scene);
            rayOrbUpHelper.show(scene);
            */

            orb.update = () => {
                //console.log(orb.position);
                orb.setEnabled(true);
                var distance = BABYLON.Vector3.Distance(orb.getAbsolutePosition(), playerhitbox.getAbsolutePosition());
                var dir = orb.getAbsolutePosition().subtract(playerhitbox.getAbsolutePosition()).normalize().negate();

                var orbFrontPick = scene.pickWithRay(rayOrbFront);
                var orbFrontHit = false;
                if (orbFrontPick) orbFrontHit = orbFrontPick.hit;

                var orbBackPick = scene.pickWithRay(rayOrbBack);
                var orbBackHit = false;
                if (orbBackPick) orbBackHit = orbBackPick.hit;

                var orbLeftPick = scene.pickWithRay(rayOrbLeft);
                var orbLeftHit = false;
                if (orbLeftPick) orbLeftHit = orbLeftPick.hit;

                var orbRightPick = scene.pickWithRay(rayOrbRight);
                var orbRightHit = false;
                if (orbRightPick) orbRightHit = orbRightPick.hit;

                var orbUpPick = scene.pickWithRay(rayOrbUp);
                var orbUpHit = false;
                if (orbUpPick) orbUpHit = orbUpPick.hit;

                var orbDownPick = scene.pickWithRay(rayOrbDown);
                var orbDownHit = false;
                if (orbDownPick) orbDownHit = orbDownPick.hit;

                if (distance <= 0 || distance >= maxFollow) {
                    //orb.setEnabled(false);
                } else {
                    // orb.setEnabled(true);
                    var factor = speedFactor;
                    dir._x = dir._x / factor;
                    dir._y = dir._y / factor;
                    dir._z = dir._z / factor;
                    if (orbBackHit && dir._z < 0) {
                        dir._z = 0;
                    }
                    if (orbFrontHit && dir._z > 0) {
                        dir._z = 0;
                    }
                    if (orbLeftHit && dir._x > 0) {
                        dir._x = 0;
                    }
                    if (orbRightHit && dir._x < 0) {
                        dir._x = 0;
                    }
                    if (orbUpHit && dir._y > 0) {
                        dir._y = 0;
                    }
                    if (orbDownHit && dir._y < 0) {
                        dir._y = 0;
                    }
                    orb.position.addInPlace(dir);
                    //    orb.rotation.addInPlace(dir);


                }

            }

            return orb;


        }

        orbs.push(createOrb(new BABYLON.Vector3(0, .5, -10), 12, 12, orbMat));
        orbs.push(createOrb(new BABYLON.Vector3(-10, .5, -10), 10, 8, orbMat2));
        orbs.push(createOrb(new BABYLON.Vector3(-20, .5, -15), 16, 10, orbMat3));
        orbs.push(createOrb(new BABYLON.Vector3(-10, .5, -20), 13, 9, orbMat2));
        //console.log(orbs);

        //set up camera
        var cameraRoot = new BABYLON.TransformNode("cameraRoot");
        cameraRoot.position = new BABYLON.Vector3(0, 0, 0);
        cameraRoot.rotation = new BABYLON.Vector3(0, 0, 0);

        var camYAxis = new BABYLON.TransformNode("camYAxis");
        camYAxis.rotation = new BABYLON.Vector3(.8, 0, 0);
        camYAxis.parent = cameraRoot;

        var camera = new BABYLON.UniversalCamera("playercamera", new BABYLON.Vector3(0, 0, 0), scene);
        camera.fov = 0.6;
        camera.parent = camYAxis;

        scene.activeCamera = camera;


        var actionKeyDown = false;
        var doingAction = false;
        //set up input map
        var inputMap = {};
        scene.actionManager = new BABYLON.ActionManager(scene);
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
            if (evt.sourceEvent.type == "keydown" && (evt.sourceEvent.key == "z")) {
                jumpKeyDown = true;
            }
            if (evt.sourceEvent.type == "keydown" && (evt.sourceEvent.key == "x")) {
                actionKeyDown = true;
            }
        }));
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
            if (evt.sourceEvent.type == "keyup" && (evt.sourceEvent.key == "z")) {
                jumpKeyDown = false;
            }
            if (evt.sourceEvent.type == "keyup" && (evt.sourceEvent.key == "x")) {
                actionKeyDown = false;
                doingAction = false;
            }
        }));









        //Create ray cast, check for collisions 
        var onObject = true;
        var jumpKeyDown = false;
        var jumpingEnabled = true;
        var touchingWall = false;

        /*
        
         ____
        |    |
        |____|
        
            N
          \ | /
        W - - - E
          / | \
            S
        */
        var playerFacing = 'S';


        var velocity = new BABYLON.Vector3();


        //right
        var rayEast = new BABYLON.Ray();
        var rayHelperEast = new BABYLON.RayHelper(rayEast);
        rayHelperEast.attachToMesh(playerhitbox, new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(.5, 0, -.1), .5);

        //left
        var rayWest = new BABYLON.Ray();
        var rayHelperWest = new BABYLON.RayHelper(rayWest);
        rayHelperWest.attachToMesh(playerhitbox, new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(-.5, 0, -.1), .5);

        //back
        var rayNorth = new BABYLON.Ray();
        var rayHelperNorth = new BABYLON.RayHelper(rayNorth);
        rayHelperNorth.attachToMesh(playerhitbox, new BABYLON.Vector3(-1, 0, 0), new BABYLON.Vector3(.7, 0, 0), .8);

        //front
        var raySouth = new BABYLON.Ray();
        var rayHelperSouth = new BABYLON.RayHelper(raySouth);
        rayHelperSouth.attachToMesh(playerhitbox, new BABYLON.Vector3(-1, 0, 0), new BABYLON.Vector3(.1, 0, 0), .8);

        //back
        var rayFront = new BABYLON.Ray();
        var rayHelperFront = new BABYLON.RayHelper(rayFront);
        rayHelperFront.attachToMesh(playerhitbox, new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, 0, -.3), .3);

        //front
        var rayBack = new BABYLON.Ray();
        var rayHelperBack = new BABYLON.RayHelper(rayBack);
        rayHelperBack.attachToMesh(playerhitbox, new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, 0, 1), .8);

        //foot
        var rayFoot = new BABYLON.Ray();
        var rayHelperFoot = new BABYLON.RayHelper(rayFoot);
        rayHelperFoot.attachToMesh(playerhitbox, new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, -.8, 0), .6);

        //head
        var rayHead = new BABYLON.Ray();
        var rayHelperHead = new BABYLON.RayHelper(rayHead);
        rayHelperHead.attachToMesh(playerhitbox, new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, .9, 0), .6);


        var pHitNorth = false;
        var pHitSouth = false;
        var pHitBack = false;
        var pHitFront = false;
        var pHitEast = false;
        var pHitWest = false;

        rayHelperEast.show(scene);
        rayHelperWest.show(scene);
        rayHelperNorth.show(scene);
        rayHelperSouth.show(scene);
        rayHelperFront.show(scene);
        rayHelperBack.show(scene);
        rayHelperFoot.show(scene);
        rayHelperHead.show(scene);

        var rayDown1 = new BABYLON.Ray();
        var rayHelperDown1 = new BABYLON.RayHelper(rayDown1);
        rayHelperDown1.attachToMesh(playerhitbox, new BABYLON.Vector3(0, -0.5, 0), new BABYLON.Vector3(0, -1, -.4), 1);

        var rayDown2 = new BABYLON.Ray();
        var rayHelperDown2 = new BABYLON.RayHelper(rayDown2);
        rayHelperDown2.attachToMesh(playerhitbox, new BABYLON.Vector3(0, -0.5, 0), new BABYLON.Vector3(0, -1, .4), 1);

        var rayDown3 = new BABYLON.Ray();
        var rayHelperDown3 = new BABYLON.RayHelper(rayDown3);
        rayHelperDown3.attachToMesh(playerhitbox, new BABYLON.Vector3(0, -0.5, 0), new BABYLON.Vector3(-.4, -1, 0), 1);

        var rayDown4 = new BABYLON.Ray();
        var rayHelperDown4 = new BABYLON.RayHelper(rayDown4);
        rayHelperDown4.attachToMesh(playerhitbox, new BABYLON.Vector3(0, -0.5, 0), new BABYLON.Vector3(.4, -1, 0), 1);


        rayHelperDown1.show(scene);
        rayHelperDown2.show(scene);
        //rayHelperDown3.show(scene);
        rayHelperDown4.show(scene);

        scene.registerBeforeRender(() => {

            if (playerhitbox) {

                orbs.forEach((item, value) => {
                    item.update();
                })



                box5.update();
                box7.update();
                box8.update();
                var delta = scene.getEngine().getDeltaTime();




                var playerSensorRayPick = scene.pickWithRay(playerSensorRay);
                var playerSensorRayHit = false;

                if (playerSensorRayPick) playerSensorRayHit = playerSensorRayPick.hit;
                if (playerSensorRayHit) {
                    var name = playerSensorRayPick.pickedMesh.name;
                    if (!name.includes('wall')) {

                        if (name != currentObject) {
                            currentObject = name;
                            setMessage(currentObject);
                            toggleContainer();
                        } else {

                            if (actionKeyDown && !doingAction) {
                                doingAction = true;
                                setMessage("Action key down: " + currentObject);
                                playerSensorRayPick.pickedMesh.action(playerSensorRayPick.pickedMesh);
                            } else {
                                if (!doingAction) {
                                    setMessage(currentObject);
                                }
                            }


                        }

                    }
                } else {
                    if (currentObject) {
                        toggleContainer();
                        currentObject = false;
                    }
                }




                var pick1 = scene.pickWithRay(rayEast);
                var hit1 = false;
                if (pick1) hit1 = pick1.hit;

                var pick2 = scene.pickWithRay(rayWest);
                var hit2 = false;
                if (pick2) hit2 = pick2.hit;

                var pick3 = scene.pickWithRay(rayNorth);
                var hit3 = false;
                if (pick3) hit3 = pick3.hit;

                var pick4 = scene.pickWithRay(raySouth);
                var hit4 = false;
                if (pick4) hit4 = pick4.hit;

                var pick5 = scene.pickWithRay(rayFront);
                var hit5 = false;
                if (pick5) hit5 = pick5.hit;

                var pick6 = scene.pickWithRay(rayBack);
                var hit6 = false;
                if (pick6) hit6 = pick6.hit;

                var pick7 = scene.pickWithRay(rayFoot);
                var hit7 = false;
                if (pick7) hit7 = pick7.hit;

                var pick8 = scene.pickWithRay(rayHead);
                var hit8 = false;
                if (pick8) hit8 = pick8.hit;

                //console.log(pick5);
                if (hit1 || hit2 || hit3 || hit4 || hit7 || hit8) {
                    touchingWall = true;
                    // console.log(playerFacing);

                    pHitEast = hit1;
                    pHitWest = hit2;
                    pHitNorth = hit3;
                    pHitSouth = hit4;
                    pHitBack = hit6;
                    if (hit5 || hit7 || hit8) {
                        pHitFront = true;
                    } else {
                        pHitFront = false;
                    }


                    // console.log(`East ${hit1} West ${hit2} North ${hit3} South ${hit4} Front ${hit5} Back ${hit6}`);
                } else {
                    touchingWall = false;
                }
                //check for floor
                if (velocity.y <= 0) {

                    var dHit1 = false;
                    var dHit2 = false;
                    var dHit3 = false;
                    var dHit4 = false;

                    var pick1 = scene.pickWithRay(rayDown1);
                    if (pick1) dHit1 = pick1.hit;
                    var pick2 = scene.pickWithRay(rayDown2);
                    if (pick2) dHit2 = pick2.hit;
                    var pick3 = scene.pickWithRay(rayDown3);
                    if (pick3) dHit3 = pick3.hit;
                    var pick4 = scene.pickWithRay(rayDown4);
                    if (pick4) dHit4 = pick4.hit;

                    if (dHit1 || dHit2 || dHit3 || dHit4) {
                        onObject = true;
                    } else {
                        onObject = false;
                    }

                }




                velocity.y -= delta / 3000;
                if (onObject) {
                    velocity.y = Math.max(0, velocity.y)
                };

                var dpick = false;
                if (pick1 && pick1.pickedMesh != null) {
                    dpick = pick1;
                } else
                if (pick2 && pick2.pickedMesh != null) {
                    dpick = pick2;
                } else
                if (pick3 && pick3.pickedMesh != null) {
                    dpick = pick3;
                } else
                if (pick4 && pick4.pickedMesh != null) {
                    dpick = pick4;
                }

                if (pick7 && pick7.pickedMesh != null) {
                    var footPick = pick7;

                }


                //console.log(dpick);


                if (dpick) {

                    if (dpick.pickedMesh.name.includes('movingPlatform')) {
                        var dir = dpick.pickedMesh.direction;
                        //  console.log(dir);
                        if (dir == 'up') {
                            playerhitbox.position = new BABYLON.Vector3.Lerp(playerhitbox.position, new BABYLON.Vector3(playerhitbox.position.x, dpick.pickedMesh.position.y + 2.1, playerhitbox.position.z), 0.4);

                        } else if (dir == 'down') {
                            playerhitbox.position = new BABYLON.Vector3.Lerp(playerhitbox.position, new BABYLON.Vector3(playerhitbox.position.x, dpick.pickedMesh.position.y + 1.75, playerhitbox.position.z), 0.4);

                        } else if (dir == 'south') {
                            velocity.z = -.1;
                        } else if (dir == 'north') {
                            velocity.z = .1;
                        } else if (dir == 'east') {
                            velocity.x = .1;
                        } else if (dir == 'west') {
                            velocity.x = -.1;
                        }


                    }



                    if (dpick.pickedMesh.name.includes('slope')) {
                        console.log('%c SLOPE ', 'background: red; color: white;');
                        var dir = dpick.pickedMesh.direction;
                        //console.log(dir);
                        console.log(playerFacing);
                        if (playerMoving) {

                            if (dir == "ew") {
                                if (playerFacing == 'W') {
                                    velocity.y = -.06;
                                } else {
                                    velocity.y = 0;
                                }

                            }
                            if (dir == "we") {
                                if (playerFacing == 'E') {
                                    velocity.y = -.06;
                                } else {
                                    velocity.y = 0;
                                }
                            }
                            if (dir == "sn") {
                                if (playerFacing == 'S') {
                                    velocity.y = -.06;
                                } else {
                                    velocity.y = 0;
                                }

                            }
                            if (dir == "ns") {
                                if (playerFacing == 'N') {

                                    velocity.y = -.06;
                                    //console.log('GOING DOWN!');
                                    console.log('%c Going Down ', 'background: red; color: white;');
                                } else {
                                    velocity.y = 0;
                                    console.log('%c what? ', 'background: green; color: white;');
                                }

                            }
                        } else {
                            //velocity.y = 0;
                        }

                    }


                } else {
                    velocity.x = 0;
                    velocity.z = 0;
                }

                if (footPick) {
                    //console.log(footPick.pickedMesh.name);

                    if (footPick.pickedMesh.name.includes('slope')) {
                        velocity.y = 0;

                        var dir = footPick.pickedMesh.direction;

                        if (playerMoving) {
                            if (dir == "ew") {
                                playerhitbox.position = new BABYLON.Vector3.Lerp(playerhitbox.position, new BABYLON.Vector3(playerhitbox.position.x + .3, playerhitbox.position.y + .3, playerhitbox.position.z), 0.3);

                            }
                            if (dir == "we") {
                                playerhitbox.position = new BABYLON.Vector3.Lerp(playerhitbox.position, new BABYLON.Vector3(playerhitbox.position.x - .3, playerhitbox.position.y + .3, playerhitbox.position.z), 0.3);
                            }
                            if (dir == "sn") {
                                playerhitbox.position = new BABYLON.Vector3.Lerp(playerhitbox.position, new BABYLON.Vector3(playerhitbox.position.x, playerhitbox.position.y + .3, playerhitbox.position.z + .3), 0.3);

                            }
                            if (dir == "ns") {
                                playerhitbox.position = new BABYLON.Vector3.Lerp(playerhitbox.position, new BABYLON.Vector3(playerhitbox.position.x, playerhitbox.position.y + .3, playerhitbox.position.z - .3), 0.3);
                            }
                        }

                    }


                }



                if (jumpingEnabled) {
                    if (jumpKeyDown && onObject) {
                        velocity.y = 0.25;
                        onObject = false;
                    }
                }
                // console.log(velocity.y);
                playerhitbox.moveWithCollisions(velocity);
            }

        });



        //Player control 
        var keydown = false;
        var speed = .03;
        var playerMoving = true;
        scene.onBeforeRenderObservable.add(() => {


            if (playerhitbox) {

                if (inputMap["w"] || inputMap["ArrowUp"]) {
                    playerMoving = true;
                    if (!touchingWall) {
                        playerhitbox.position.z += 0.1 + speed;
                    } else {
                        var canMove = false;
                        if (playerFacing == "W") {
                            if (!pHitSouth) {
                                canMove = true;
                            }
                        }
                        if (playerFacing == "N") {
                            if (!pHitFront && (!pHitEast) && (!pHitWest)) {
                                canMove = true;
                            }
                        }

                        if (canMove) {

                            playerhitbox.position.z += 0.1 + speed;
                        }
                    }
                    playerhitbox.rotation.y = 2 * Math.PI / 2;
                    keydown = true;
                    playerFacing = 'N';

                } else
                if (inputMap["a"] || inputMap["ArrowLeft"]) {
                    playerMoving = true;
                    if (!touchingWall) {
                        playerhitbox.position.x -= 0.1 + speed;
                    } else {
                        var canMove = false;
                        if (playerFacing == "W") {
                            if (!pHitFront && (!pHitEast) && (!pHitWest)) {
                                canMove = true;
                            }
                        }
                        if (playerFacing == "E") {
                            if (!pHitBack) {
                                canMove = true;
                            }
                        }
                        if (playerFacing == "N") {
                            if (!pHitNorth) {
                                canMove = true;
                            }
                        }


                        if (canMove) {

                            playerhitbox.position.x -= 0.1 + speed;
                        }
                    }
                    playerhitbox.rotation.y = Math.PI / 2;
                    keydown = true;

                    playerFacing = 'W';

                } else
                if (inputMap["s"] || inputMap["ArrowDown"]) {
                    playerMoving = true;
                    if (!touchingWall) {
                        playerhitbox.position.z -= 0.1 + speed;
                    } else {
                        var canMove = false;
                        if (playerFacing == "S") {
                            if (!pHitFront && (!pHitEast) && (!pHitWest)) {
                                canMove = true;
                            }
                            if (pHitSouth && pHitWest && !pHitFront) {
                                canMove = true;
                            }
                            if (pHitNorth && pHitEast && !pHitFront) {
                                canMove = true;
                            }

                        }
                        if (playerFacing == "W") {
                            if (!pHitNorth) {
                                canMove = true;
                            }
                        }
                        if (playerFacing == "N") {
                            if (!pHitBack) {
                                canMove = true;
                            }
                        }


                        if (canMove) {

                            playerhitbox.position.z -= 0.1 + speed;
                        }
                    }
                    playerhitbox.rotation.y = 0;
                    playerFacing = 'S';

                } else
                if (inputMap["d"] || inputMap["ArrowRight"]) {
                    playerMoving = true;
                    if (!touchingWall) {

                        playerhitbox.position.x += 0.1 + speed;
                    } else {
                        var canMove = false;
                        if (playerFacing == "E") {
                            if (!pHitFront && (!pHitEast) && (!pHitWest)) {
                                canMove = true;
                            }
                        }
                        if (playerFacing == "N") {
                            if (!pHitSouth) {
                                canMove = true;
                            }
                        }

                        if (canMove) {

                            playerhitbox.position.x += 0.1 + speed;
                        }
                    }
                    playerhitbox.rotation.y = 3 * Math.PI / 2;


                    playerFacing = 'E';
                } else {
                    playerMoving = false;
                }




                cameraRoot.position = new BABYLON.Vector3.Lerp(cameraRoot.position, new BABYLON.Vector3(playerhitbox.position.x, playerhitbox.position.y + 17, playerhitbox.position.z - 15), 0.4);


            }

        });






        return scene;

    };


    scene = createScene();

    engine.runRenderLoop(function () {
        scene.render();

    });

    window.addEventListener('resize', function () {
        engine.resize();
    });
});