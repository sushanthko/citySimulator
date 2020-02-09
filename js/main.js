// JavaScript source code
var camera, scene, renderer;
var geometry, material, mesh, meshFloor;
var USE_WIREFRAME = false;

function init() {

    /*camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(600, 300, 600);*/
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
    //camera.position.set(-200, 1200, 2400);
    camera.position.set(0, 2000, 2400);
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
            var ht = 600;
            if ((i + j) % 3 == 0) {
                ht /= 2;
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
    geometry = new THREE.BoxGeometry(600, 1, 600);
    material = new THREE.MeshLambertMaterial({ color: 0x00691c });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(400, 0, -400);
    mesh.receiveShadow = true;
    scene.add(mesh);

    //landmark
    geometry = new THREE.CylinderGeometry(30, 30, 600, 32);
    material = new THREE.MeshLambertMaterial({ color: 0xcccccc });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 300, -400);
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

    var light = new THREE.DirectionalLight(0xffffff, 0.5);
    //light.position.set(50, 200, 100);
    //light.position.set(400, 100, 500);
    //light.position.set(0, 200, 800);
    light.position.set(300, 600, -0);
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

function animate() {

    requestAnimationFrame(animate);

    //mesh.rotation.x += 0.01;
    //mesh.rotation.y += 0.02;

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
