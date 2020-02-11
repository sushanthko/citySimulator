// JavaScript source code
var camera, scene, renderer, light, raycaster;
var geometry, material, mesh, meshFloor;
var USE_WIREFRAME = false;

function init() {
    /*if (scene != undefined) {
        console.log("scene.test: " + scene.children);
        while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
        }
        console.log("scene.test: " + scene);
    }*/

    /*camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(600, 300, 600);*/
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
    //camera.position.set(-200, 1200, 2400);
    camera.position.set(0, 2000, -2400);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffee);


    // plane
    geometry = new THREE.BoxGeometry(1500, 1, 1500);
    //material = new THREE.MeshLambertMaterial({color:0x676767, side: THREE.DoubleSide});
    material = new THREE.MeshLambertMaterial({ color: 0xe8e8e8 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    mesh.receiveShadow = true;
    scene.add(mesh);

    // building
    /*geometry = new THREE.BoxGeometry(50, 300, 50);
    material = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(125, 150, 0);
    mesh.rotation.y += 1;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);*/

    /*geometry = new THREE.BoxGeometry(50, 600, 50);
    material = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-125, 150, 0);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);

    geometry = new THREE.BoxGeometry(50, 600, 50);
    material = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-125, 150, 700);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);

    geometry = new THREE.BoxGeometry(50, 600, 50);
    material = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(725, 300, 700);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);*/

    // buildings
    var posx = 0;
    var i = 1;
    while (posx < 725) {
        console.log("posx" + posx);
        //for (i = 1; i < 725; i++) {
        var posz = 0;
        var j = 1;
        //for (j = 1; j < 725; j++) {
        while (posz < 725) {
            console.log("posz" + posz);
            //var ht = (Math.floor(Math.random() * 2) + 1) * 300;
            var ht = 300;
            /*if ((i + j) % 9 == 0) {
                ht *= 2;
            }*/
            if (posx > 400 && posz <400) {
                ht *= 1.5;
            }
            if (posx > 100 && posx < 300 && posz > 200 && posz < 500) {
                ht *= 2;
            }
            geometry = new THREE.BoxGeometry(75, ht, 75);
            material = new THREE.MeshLambertMaterial({ color: 0xb5b5b5, side: THREE.DoubleSide });
            mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(posx, ht / 2, posz);
            mesh.receiveShadow = true;
            mesh.castShadow = true;
            scene.add(mesh);
            posz = j * 150;
            j++;
        }
        posx = i * 150;
        i++;
    }

    //park
    geometry = new THREE.BoxGeometry(550, 1, 650);
    material = new THREE.MeshLambertMaterial({ color: 0x00691c });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(240, 0, -400);
    mesh.receiveShadow = true;
    scene.add(mesh);

    //landmark
    geometry = new THREE.CylinderGeometry(20, 20, 600, 32);
    material = new THREE.MeshLambertMaterial({ color: 0xcccccc });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(600, 300, -400);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);

    //stream
    geometry = new THREE.BoxGeometry(200, 1, 700);
    material = new THREE.MeshLambertMaterial({ color: 0x003ee8 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-225, 0, 400);
    mesh.receiveShadow = true;
    scene.add(mesh);

    geometry = new THREE.BoxGeometry(200, 1, 700);
    material = new THREE.MeshLambertMaterial({ color: 0x003ee8 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-225, 0, -400);
    mesh.receiveShadow = true;
    scene.add(mesh);

    //houses
    for (i = 0; i < 3; i++) {
        var ht = 300;
        var len = 450;
        geometry = new THREE.BoxGeometry(300, ht, len);
        material = new THREE.MeshLambertMaterial({ color: 0xffebad });
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(-550, ht/2, 500 - (500 * i) );
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        scene.add(mesh);
    }



    // light
    //let light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(new THREE.AmbientLight(0x404040));

    light = new THREE.DirectionalLight(0xffffff, 0.5);
    //light.position.set(50, 200, 100);
    //light.position.set(400, 100, 500);
    //light.position.set(0, 200, 800);
    light.position.set(450, 600, -0);
    //light.position.multiplyScalar(1.3);

    light.castShadow = true;

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    var d = 3000;

    light.shadow.camera.left = - d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = - d;

    light.shadow.camera.far = 1000;

    scene.add(light);


    /*meshFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20, 10, 10),
        new THREE.MeshPhongMaterial({ color: 0x000000, wireframe: USE_WIREFRAME })
    );
    meshFloor.rotation.x -= Math.PI / 2;
    meshFloor.receiveShadow = true;
    scene.add(meshFloor);*/

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

}

/*function animate() {

    requestAnimationFrame(animate);

    //mesh.rotation.x += 0.01;
    //mesh.rotation.y += 0.02;
    if (light.position.x < 450) {
        light.position.x += 0.05;
    }

    renderer.render(scene, camera);

}*/

function animate() {
    console.log(runAnim);
    if (!isPlay) return;
    requestAnimationFrame(animate);
    if (light.position.x > -450) {
        light.position.x -= 0.05;
    }
    render();
}

function render() {
    //mesh.rotation.y = theta;
    if (!isPlay) {
        light.position.set(450, 600, -0);
    }
    //rayCast();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
render();

var initAnim = true;
var runAnim = false;
var isPlay = false;
var removeRC = false;

var FizzyText = function () {
    /*this.message = 'dat.gui';
    this.speed = 0.8;
    this.displayOutline = false;*/
    this.start = function () {
        if (initAnim) {
            initAnim = false;
            runAnim = true;
            //theta = 0;
        }
        // Start and Pause 
        if (runAnim) {
            //startButton.innerHTML = 'Pause';
            runAnim = false;
            isPlay = true;
            animate();
        } else {
            //startButton.innerHTML = 'Restart';
            runAnim = true;
            isPlay = false;
        }
    };
    this.reset = function () {
        // Set StartButton to Start  
        //startButton.innerHTML = 'Start';

        // Boolean for Stop Animation
        initAnim = true;
        runAnim = false;
        //theta = 0;
        isPlay = false;
        render();
    };
    this.compVis = function () {
        if (!removeRC) {
            rayCast();
            render();
        } else {
            /*init();
            render();*/
            document.location.reload();
        }
    };
};

window.onload = function () {
    var text = new FizzyText();
    var gui = new dat.GUI();
    /*gui.add(text, 'message');
    gui.add(text, 'speed', -5, 5);
    gui.add(text, 'displayOutline');*/
    var startBtn = gui.add(text, 'start').name('Start');
    var resetBtn = gui.add(text, 'reset').name('Reset');
    var compVisBtn = gui.add(text, 'compVis').name('Compute Visibility');
    startBtn.onChange(function (value) {
        console.log("test: " + startBtn.__li.firstElementChild.firstElementChild.innerHTML);
        var value = startBtn.__li.firstElementChild.firstElementChild.innerHTML;
        // Fires on every change, drag, keypress, etc.
        if (value == 'Stop') {
            startBtn.name('Resume');
        } else {
            startBtn.name('Stop');
        }
    });
    resetBtn.onChange(function (value) {
        // Fires on every change, drag, keypress, etc.
        startBtn.name('Start');
    });
    compVisBtn.onChange(function (value) {
        var value = compVisBtn.__li.firstElementChild.firstElementChild.innerHTML;
        if (value == 'Compute Visibility') {
            compVisBtn.name('Remove Visibility');
        } else {
            compVisBtn.name('Compute Visibility');
            removeRC = true;
        }
    });
};

var radius = 1000, theta = 0;
function rayCast() {
    raycaster = new THREE.Raycaster();
    var direction = new THREE.Vector3(150, 0, 450);
    var startPoint = new THREE.Vector3(600, 300, -400);

    for (i = 0; i < 360; i+=0.1) {
        direction.x = radius * Math.sin(THREE.MathUtils.degToRad(i));
        direction.z = radius * Math.cos(THREE.MathUtils.degToRad(i));
        direction.normalize();

        raycaster.set(startPoint, direction);
        var intersects = raycaster.intersectObjects(scene.children);

        if (intersects[0]) {
            console.log(intersects[0]);

            //arrow
            var hex = 0xff0000;
            var arrowHelper = new THREE.ArrowHelper(direction, startPoint, intersects[0].distance, hex);
            scene.add(arrowHelper);

            intersects[0].object.material.color.setHex(hex);
        }
    }
    /*theta += 0.1;

    direction.x = radius * Math.sin(THREE.MathUtils.degToRad(theta));
    //camera.position.y = radius * Math.sin(THREE.MathUtils.degToRad(theta));
    direction.z = radius * Math.cos(THREE.MathUtils.degToRad(theta));
    direction.normalize();
    var startPoint = new THREE.Vector3(0, 300, -400);
    raycaster.set(startPoint, direction);
    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects[0]) {
        console.log(intersects[0]);
        intersects[0].object.material.color.setHex(0xff0000);
    }*/



    /*if (intersects.length > 0) {

        if (INTERSECTED != intersects[0].object) {

            if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex(0xff0000);

        }

    } else {

        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

        INTERSECTED = null;

    }*/
}