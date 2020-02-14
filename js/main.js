// JavaScript source code
var camera, scene, renderer, light, raycaster;
var geometry, material, mesh, meshFloor, controls;
var USE_WIREFRAME = false;

function init() {

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000)
    camera.position.x = 1000;
    camera.position.y = 1000;
    camera.position.z = -1000;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffee);

    // plane
    geometry = new THREE.BoxGeometry(900, 1, 1500);
    //material = new THREE.MeshLambertMaterial({color:0x676767, side: THREE.DoubleSide});
    material = new THREE.MeshLambertMaterial({ color: 0xe8e8e8 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(325, 0, 0);
    mesh.receiveShadow = true;
    scene.add(mesh);

    geometry = new THREE.BoxGeometry(200, 1, 100);
    material = new THREE.MeshLambertMaterial({ color: 0xe8e8e8 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-225, 0, 0);
    mesh.receiveShadow = true;
    scene.add(mesh);

    geometry = new THREE.BoxGeometry(400, 1, 1500);
    material = new THREE.MeshLambertMaterial({ color: 0xe8e8e8 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-525, 0, 0);
    mesh.receiveShadow = true;
    scene.add(mesh);

    // buildings
    var posx = 0;
    var i = 1;
    while (posx < 725) {
        console.log("posx" + posx);
        var posz = 0;
        var j = 1;
        while (posz < 725) {
            console.log("posz" + posz);    
            var ht = 300;
            if (posx > 400 && posz <400) {
                ht *= 1.5;
            }
            if (posx > 100 && posx < 300 && posz > 200 && posz < 500) {
                ht *= 2;
            }
            geometry = new THREE.BoxGeometry(75, ht, 75);
            material = new THREE.MeshLambertMaterial({ color: 0xb5b5b5 });
            mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(posx, (ht / 2) + 0.5, posz);
            mesh.receiveShadow = true;
            mesh.castShadow = true;
            scene.add(mesh);
            posz = j * 165;
            j++;
        }
        posx = i * 165;
        i++;
    }

    //park
    geometry = new THREE.BoxGeometry(550, 1, 650);
    material = new THREE.MeshLambertMaterial({ color: 0x00691c });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(240, 1, -400);
    mesh.receiveShadow = true;
    scene.add(mesh);

    //landmark
    geometry = new THREE.CylinderGeometry(20, 20, 600, 32);
    material = new THREE.MeshLambertMaterial({ color: 0xcccccc });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(600, 300.5, -400);
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
        mesh.position.set(-550, (ht/2)+0.5, 500 - (500 * i) );
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        scene.add(mesh);
    }



    // light
    scene.add(new THREE.AmbientLight(0x404040));

    light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(450, 600, -0);

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

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate() {
    //console.log(runAnim)
    //if (!isPlay) return;
    requestAnimationFrame(animate);
    if (isPlay && light.position.x > -450) {
        light.position.x -= 0.05;
    }

    controls.update();
    
    render();
}

function render() {
    if (!isPlay) {
        light.position.set(450, 600, -0);
    }
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();

var initAnim = true;
var runAnim = false;
var isPlay = false;
var removeRC = false;

var Utilities = function () {
    this.start = function () {
        if (initAnim) {
            initAnim = false;
            runAnim = true;
        }
        // Start and Pause 
        if (runAnim) {       
            runAnim = false;
            isPlay = true;
            animate();
        } else {
            runAnim = true;
            isPlay = false;
        }
    };
    this.reset = function () {
        initAnim = true;
        runAnim = false;
        isPlay = false;
        render();
    };
    this.compVis = function () {
        if (!removeRC) {
            rayCast();
            render();
        } else {
            document.location.reload();
        }
    };
};

window.onload = function () {
    var utilities = new Utilities();
    var gui = new dat.GUI();
    var startBtn = gui.add(utilities, 'start').name('Start');
    var resetBtn = gui.add(utilities, 'reset').name('Reset');
    var compVisBtn = gui.add(utilities, 'compVis').name('Compute Visibility');
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
    var hitObjects = [];

    for (i = 0; i < 360; i+=0.1) {
        direction.x = radius * Math.sin(THREE.MathUtils.degToRad(i));
        direction.z = radius * Math.cos(THREE.MathUtils.degToRad(i));
        direction.normalize();

        raycaster.set(startPoint, direction);
        var intersects = raycaster.intersectObjects(scene.children);

        if (intersects[0]) {
            var objectId = intersects[0].object.uuid;
            console.log(objectId);
            if (hitObjects.length > 0 && hitObjects.find(element => element == objectId)) {
                continue;
            }
            hitObjects.push(objectId);

            //arrow
            var hex = 0xff0000;
            var arrowHelper = new THREE.ArrowHelper(direction, startPoint, intersects[0].distance, hex);
            scene.add(arrowHelper);

            intersects[0].object.material.color.setHex(hex);
        }
    }
}