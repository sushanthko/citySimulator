// JavaScript source code
var camera, scene, renderer, light, raycaster;
var geometry, material, mesh, controls, texture, materials, font;
var lightStartDefault = new THREE.Vector3(450, 600, -0);
var plotArr;
var MAX_HEIGHT = 15;
var scale = chroma.scale(['blue','green','red']).domain([0,MAX_HEIGHT]);
var selectedLandmark;
var selectedBuilding;
var foundations;

function init() {

    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.x = 1000;
    camera.position.y = 1000;
    camera.position.z = -1000;

    scene.add(camera);

    // background
    scene.background = new THREE.Color(0xffffee);

    // plane
    geometry = new THREE.BoxGeometry(900, 1, 1500);
    //material = new THREE.MeshLambertMaterial({color:0x676767, side: THREE.DoubleSide});
    //material = new THREE.MeshLambertMaterial({ color: 0xe8e8e8 });
    texture = new THREE.TextureLoader().load( "assets/textures/street.jpg" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 8, 8 );
    materials =
        [
            new THREE.MeshLambertMaterial({map: texture}), // RIGHT SIDE
            new THREE.MeshLambertMaterial({map: texture}), // LEFT SIDE
            new THREE.MeshLambertMaterial({map: texture }), // TOP SIDE
            new THREE.MeshLambertMaterial({map: texture }), // BOTTOM SIDE
            new THREE.MeshLambertMaterial({map: texture}), // FRONT SIDE
            new THREE.MeshLambertMaterial({map: texture}) // BACK SIDE
        ];
    mesh = new THREE.Mesh(geometry, materials);
    mesh.name = "ground";
    mesh.position.set(325, 0, 0);
    mesh.receiveShadow = true;
    scene.add(mesh);

    geometry = new THREE.BoxGeometry(200, 1, 100);
    //material = new THREE.MeshLambertMaterial({ color: 0xe8e8e8 });
    texture = new THREE.TextureLoader().load( "assets/textures/bridge.jpg" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 16, 16 );
    materials =
        [
            new THREE.MeshLambertMaterial({map: texture}), // RIGHT SIDE
            new THREE.MeshLambertMaterial({map: texture}), // LEFT SIDE
            new THREE.MeshLambertMaterial({map: texture }), // TOP SIDE
            new THREE.MeshLambertMaterial({map: texture }), // BOTTOM SIDE
            new THREE.MeshLambertMaterial({map: texture}), // FRONT SIDE
            new THREE.MeshLambertMaterial({map: texture}) // BACK SIDE
        ];
    mesh = new THREE.Mesh(geometry, materials);
    mesh.name = "bridge";
    mesh.position.set(-225, 0, 0);
    mesh.receiveShadow = true;
    scene.add(mesh);

    geometry = new THREE.BoxGeometry(400, 1, 1500);
    //material = new THREE.MeshLambertMaterial({ color: 0xe8e8e8 });
    texture = new THREE.TextureLoader().load( "assets/textures/tiles.jpg" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 8, 8 );
    materials =
        [
            new THREE.MeshLambertMaterial({map: texture}), // RIGHT SIDE
            new THREE.MeshLambertMaterial({map: texture}), // LEFT SIDE
            new THREE.MeshLambertMaterial({map: texture }), // TOP SIDE
            new THREE.MeshLambertMaterial({map: texture }), // BOTTOM SIDE
            new THREE.MeshLambertMaterial({map: texture}), // FRONT SIDE
            new THREE.MeshLambertMaterial({map: texture}) // BACK SIDE
        ];
    mesh = new THREE.Mesh(geometry, materials);
    mesh.name = "street";
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
            if (posx > 400 && posz < 400) {
                ht *= 1.5;
            }
            if (posx > 100 && posx < 300 && posz > 200 && posz < 500) {
                ht *= 2;
            }
            geometry = new THREE.BoxGeometry(75, ht, 75);
            //material = new THREE.MeshLambertMaterial({ color: 0xb5b5b5 });
           //material.map = new THREE.Texture(generateBuildingTexture());
            texture = new THREE.TextureLoader().load( "assets/textures/building.jpg" );
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set( 4, 4 );
            materials =
                [
                    new THREE.MeshLambertMaterial({map: texture}), // RIGHT SIDE
                    new THREE.MeshLambertMaterial({map: texture}), // LEFT SIDE
                    new THREE.MeshLambertMaterial({color: 0xb5b5b5 }), // TOP SIDE
                    new THREE.MeshLambertMaterial({color: 0xb5b5b5 }), // BOTTOM SIDE
                    new THREE.MeshLambertMaterial({map: texture}), // FRONT SIDE
                    new THREE.MeshLambertMaterial({map: texture}) // BACK SIDE
                ];
            mesh = new THREE.Mesh(geometry, materials);
            mesh.name = "building"+i+j;
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
    //material = new THREE.MeshLambertMaterial({ color: 0x00691c });
    texture = new THREE.TextureLoader().load( "assets/textures/grass.jpg" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1, 1 );
    materials =
        [
            new THREE.MeshLambertMaterial({map: texture}), // RIGHT SIDE
            new THREE.MeshLambertMaterial({map: texture}), // LEFT SIDE
            new THREE.MeshLambertMaterial({map: texture }), // TOP SIDE
            new THREE.MeshLambertMaterial({map: texture }), // BOTTOM SIDE
            new THREE.MeshLambertMaterial({map: texture}), // FRONT SIDE
            new THREE.MeshLambertMaterial({map: texture}) // BACK SIDE
        ];
    mesh = new THREE.Mesh(geometry, materials);
    mesh.name = "park";
    mesh.position.set(240, 1, -400);
    mesh.receiveShadow = true;
    scene.add(mesh);

    //landmark
    geometry = new THREE.CylinderGeometry(20, 20, 600, 32);
    //material = new THREE.MeshLambertMaterial({ color: 0xcccccc });
    texture = new THREE.TextureLoader().load( "assets/textures/pillar.jpg" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 4, 4 );
    materials =
        [
            new THREE.MeshLambertMaterial({map:texture}), // CURVED FACE
            new THREE.MeshLambertMaterial({color: 0xcccccc}), // TOP
            new THREE.MeshLambertMaterial({color: 0xcccccc }) // BOTTOM
        ];
    mesh = new THREE.Mesh(geometry, materials);
    mesh.name="landmark1";
    mesh.position.set(600, 300.5, -400);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);

    //landmark 2
    geometry = new THREE.CylinderGeometry(60, 60, 300, 32);
    geometry.name="landmark2";
    //material = new THREE.MeshLambertMaterial({ color: 0xcccccc });
    texture = new THREE.TextureLoader().load( "assets/textures/pillar2.jpg" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 4, 4 );
    materials =
        [
            new THREE.MeshLambertMaterial({map:texture}), // CURVED FACE
            new THREE.MeshLambertMaterial({color: 0xcccccc}), // TOP
            new THREE.MeshLambertMaterial({color: 0xcccccc }) // BOTTOM
        ];
    mesh = new THREE.Mesh(geometry, materials);
    mesh.name="landmark2";
    mesh.position.set(600, 150.5, -600);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);

    //stream
    geometry = new THREE.BoxGeometry(200, 1, 700);
    //material = new THREE.MeshLambertMaterial({ color: 0x003ee8 });
    texture = new THREE.TextureLoader().load( "assets/textures/water.jpg" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1, 1 );
    materials =
        [
            new THREE.MeshLambertMaterial({map: texture}), // RIGHT SIDE
            new THREE.MeshLambertMaterial({map: texture}), // LEFT SIDE
            new THREE.MeshLambertMaterial({map: texture }), // TOP SIDE
            new THREE.MeshLambertMaterial({map: texture }), // BOTTOM SIDE
            new THREE.MeshLambertMaterial({map: texture}), // FRONT SIDE
            new THREE.MeshLambertMaterial({map: texture}) // BACK SIDE
        ];
    mesh = new THREE.Mesh(geometry, materials);
    mesh.position.set(-225, 0, 400);
    mesh.receiveShadow = true;
    scene.add(mesh);

    geometry = new THREE.BoxGeometry(200, 1, 700);
    //material = new THREE.MeshLambertMaterial({ color: 0x003ee8 });
    mesh = new THREE.Mesh(geometry, materials);
    mesh.position.set(-225, 0, -400);
    mesh.receiveShadow = true;
    scene.add(mesh);

    //houses
    for (i = 0; i < 3; i++) {
        var ht = 300;
        var len = 450;
        geometry = new THREE.BoxGeometry(300, ht, len);
        //material = new THREE.MeshLambertMaterial({ color: 0xffebad });
        texture = new THREE.TextureLoader().load( "assets/textures/houses.jpg" );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 4, 4 );
        materials =
            [
                new THREE.MeshLambertMaterial({map: texture}), // RIGHT SIDE
                new THREE.MeshLambertMaterial({map: texture}), // LEFT SIDE
                new THREE.MeshLambertMaterial({color: 0xffebad }), // TOP SIDE
                new THREE.MeshLambertMaterial({color: 0xffebad }), // BOTTOM SIDE
                new THREE.MeshLambertMaterial({map: texture}), // FRONT SIDE
                new THREE.MeshLambertMaterial({map: texture}) // BACK SIDE
            ];
        mesh = new THREE.Mesh(geometry, materials);
        mesh.position.set(-550, (ht / 2) + 0.5, 500 - (500 * i));
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        scene.add(mesh);
    }



    // light
    scene.add(new THREE.AmbientLight(0x404040));

    light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(lightStartDefault);

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
        preserveDrawingBuffer: true,
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
        if(isShowIntensity) {
            TWEEN.update();
        }
        light.position.x -= 0.75;
    }

    controls.update();

    render();
}

function render() {
    if (initAnim) {
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
var isShowIntensity = false;
var isSelectLandmark = false;
var isSelectBuilding = false;
var isSkyVisibility = false;

var Utilities = function () {
    this.start = function () {
        showIntensity();
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
            castParkRays();
        }
    };
    this.reset = function () {
        initPlotArray();
        initAnim = true;
        runAnim = false;
        isPlay = false;
        render();
        removeIntensity();
        resetSkyRayCast();
    };
    this.compVis = function () {
        if (!removeRC) {
            if(selectedLandmark === undefined){
                alert("Please select landmark!");
                return;
            }
            rayCast();
            //alert("Number of hits: " + hits);
            render();
        } else {
            document.location.reload();
        }
    };
    this.save = function () {
        var exporter = new THREE.GLTFExporter();
        var options = {};
        exporter.parse( scene, function ( gltf ) {
            var output = JSON.stringify( gltf, null, 2 );
            console.log( output );
            var link = document.createElement( 'a' );
            link.style.display = 'none';
            document.body.appendChild( link );
            link.href = URL.createObjectURL( new Blob( [ output ], { type: 'text/plain' } ));
            link.download = 'scene.gltf';
            link.click();
        }, options );
    };
    this.load = function () {
        var loader = new THREE.GLTFLoader().setPath('scenes/');
        loader.load('scene.gltf', function (gltf) {
            scene.add(gltf.scene);
            animate();
        });
    };
    this.showInt = false;
    this.selectLandmark = false;
    this.selectBuilding = false;
    this.deleteBuilding = function () {
        if (selectedBuilding !== undefined) {
            deleteBuilding();
        } else {
            alert("Please select building!");
            return;
        }
    };
    this.updateBuilding = function () {
        if (selectedBuilding !== undefined) {
            updateBuilding();
        } else {
            alert("Please select building!");
            return;
        }
    };
    this.addBuildings = function () {
        addBuildings();
    };
    this.skyVisibility = false;
};

window.onload = function () {
    var utilities = new Utilities();
    var gui = new dat.GUI();
    var startBtn = gui.add(utilities, 'start').name('Start');
    var resetBtn = gui.add(utilities, 'reset').name('Reset');
    var compVisBtn = gui.add(utilities, 'compVis').name('Compute Visibility');
    gui.add(utilities, 'save').name('Save');
    gui.add(utilities, 'load').name('Load');
    var showIntCheck = gui.add(utilities, 'showInt').name('Show Intensity');
    var selectLandmarkCheck = gui.add(utilities, 'selectLandmark').name('Select Landmark');
    var selectBuildingCheck = gui.add(utilities, 'selectBuilding').name('Select Building');
    var deleteBuildingBtn = gui.add(utilities, 'deleteBuilding').name('Delete Building');
    var updateBuildingBtn = gui.add(utilities, 'updateBuilding').name('Update Building');
    gui.add(utilities, 'addBuildings').name('Add Buildings');
    var skyVisibilityCheck = gui.add(utilities, 'skyVisibility').name('Sky Exposure');
    startBtn.onChange(function (value) {
        console.log("test: " + startBtn.__li.firstElementChild.firstElementChild.innerHTML);
        var value = startBtn.__li.firstElementChild.firstElementChild.innerHTML;
        // Fires on every change, drag, keypress, etc.
        if (value == 'Stop') {
            document.getElementById("myDiv").style.display = 'block';
            startBtn.name('Resume');
        } else {
            document.getElementById("myDiv").style.display = 'none';
            startBtn.name('Stop');
        }
    });
    resetBtn.onChange(function (value) {
        document.getElementById("myDiv").style.display = 'none';
        startBtn.name('Start');
    });
    compVisBtn.onChange(function (value) {
        var value = compVisBtn.__li.firstElementChild.firstElementChild.innerHTML;
        if (value === 'Compute Visibility' && selectedLandmark !== undefined) {
            compVisBtn.name('Remove Visibility');
        } else if(value === 'Remove Visibility') {
            compVisBtn.name('Compute Visibility');
            removeRC = true;
        }
    });
    showIntCheck.onChange(function (value) {
        isShowIntensity = !isShowIntensity;
        if(!isShowIntensity) {
            removeIntensity();
        }
    });
    selectLandmarkCheck.onChange(function (value) {
        isSelectLandmark = !isSelectLandmark;
        if(!isSelectLandmark) {
            selectedLandmark = undefined;
        }
    });
    selectBuildingCheck.onChange(function (value) {
        isSelectBuilding = !isSelectBuilding;
        if(!isSelectBuilding){
            selectedBuilding = undefined;
        }
    });
    skyVisibilityCheck.onChange(function (value) {
        isSkyVisibility = !isSkyVisibility;
    });
};

var radius = 1000, theta = 0;
function rayCast() {
    raycaster = new THREE.Raycaster();
    var x=selectedLandmark.position.x, y = selectedLandmark.position.y, z = selectedLandmark.position.z;
    //console.log(x+""+y+""+z)
    var direction = new THREE.Vector3(150, 0, 450);
    var startPoint = new THREE.Vector3(600, 300, -400);
    startPoint = new THREE.Vector3(x, y, z)
    var hitObjects = [];

    for (var j = y; j <= selectedLandmark.geometry.parameters.height; j += 100) {
        for (var i = 0; i < 360; i += 0.1) {
            direction.x = radius * Math.sin(THREE.MathUtils.degToRad(i));
            direction.z = radius * Math.cos(THREE.MathUtils.degToRad(i));
            direction.normalize();

            startPoint.y = j;

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

                //intersects[0].object.material.color.setHex(hex); // commented for textures
            }
        }
    }
    alert("Number of hits: " + hitObjects.length);
}
function rayCastGeneral(direction, startPoint) {
    raycaster = new THREE.Raycaster();
    direction.normalize();
    raycaster.set(startPoint, direction);
    return raycaster.intersectObjects(scene.children);
}

function initPlotArray() {
    plotArr = new Array(121).fill(0);
}
initPlotArray();
function castParkRays() {
    var y = 1.50000001;
    console.log(plotArr.length);
    var startDirection = new THREE.Vector3(lightStartDefault.x, lightStartDefault.y, lightStartDefault.z);
    console.log("test1: " + lightStartDefault.x);
    while (startDirection.x >= light.position.x) {
        var direction = new THREE.Vector3(startDirection.x, startDirection.y, startDirection.z);
        console.log("test1: " + direction.x);
        var i = 0;
        for (x = 515; x >= -35; x -= 55) {
            for (z = -75; z >= -725; z -= 65) {
                var startPoint = new THREE.Vector3(x, y, z);
                var intersects = rayCastGeneral(direction, startPoint);
                if (intersects[0]) {
                    plotArr[i] += 1;
                }
                i++;
            }
        }
        startDirection.x -= 0.75;
    }
    console.log(plotArr);
    heatMap();
}

function heatMap() {
    var points = [];
    for (i = 0; i < plotArr.length; i++) {
        points[i] = plotArr[i];
    }
    console.log(points);
    var shadowPoints = [];
    while (points.length) {
        shadowPoints.push(points.splice(0, 11));
    }
    var data = [
        {
            z: shadowPoints,
            x: [0, 27.5, 55, 82.5, 110, 137.5, 165, 192.5, 220, 247.5, 275, 302.5, 330, 357.5, 385, 412.5, 440, 467.5, 495, 522.5, 550],
            y: [0, 32.5, 65, 97.5, 130, 162.5, 195, 227.5, 260, 292.5, 325, 357.5, 390, 422.5, 455, 487.5, 520, 552.5, 585, 617.5, 650],
            type: 'heatmap',
            hoverongaps: false
        }
    ];

    Plotly.newPlot('myDiv', data);
}

function showIntensity() {
    var vector = new THREE.Vector3();

    vector.set(-225, 1, 0); // bridge
    displayIntensityBar(vector, 1);
    //setIntensityText(vector, 1);

    vector.set(550, 1,  0); // building
    displayIntensityBar(vector, 2);
    //setIntensityText(vector, 2);
}

function removeIntensity() {
    var arrow = scene.getObjectByName("arrow1");
    console.log(arrow);
    if(arrow === undefined){
        return;
    }
    scene.remove(scene.getObjectByName("arrow1"));
    //removeMesh(scene.getObjectByName("intensity1"));
    scene.remove(scene.getObjectByName("intensity1"));

    scene.remove(scene.getObjectByName("arrow2"));
    //removeMesh(scene.getObjectByName("intensity2"));
    scene.remove(scene.getObjectByName("intensity2"));
}

function getIntensity(vector) {

// map to normalized device coordinate (NDC) space
    vector.project( camera );

// map to 2D screen space
    var x = Math.round( (   vector.x + 1 ) * renderer.domElement.width  / 2 );
    var y = Math.round( ( - vector.y + 1 ) * renderer.domElement.height / 2 );

    var offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = renderer.domElement.width;
    offscreenCanvas.height = renderer.domElement.height;
    var ctx = offscreenCanvas.getContext("2d");

    ctx.drawImage(renderer.domElement,0,0);
    var imageData = ctx.getImageData(x,y, 1, 1);
    var c = imageData.data;
    c = [c[0], c[1],c[2]];
    var intensity = (65536 * c[0] + 256 * c[1] + c[2])/16777216;

    return intensity;
}

function getScaledIntensity(intensity) {
    return 600 + intensity * 600;
}

function displayIntensityBar(vector, number) {
    var position = new THREE.Vector3(vector.x, vector.y, vector.z);
    var arrow = scene.getObjectByName('arrow' + number);
    if (arrow !== undefined) {
        scene.remove(arrow);
    }
    var from = new THREE.Vector3(position.x, position.y, position.z);
    var to = new THREE.Vector3(position.x, position.y, position.z);
    var direction = to.clone().sub(from);
    var length = direction.length();
    var arrowHelper = new THREE.ArrowHelper(direction.normalize(), from, getScaledIntensity(getScaledIntensity(position)), 0x00ff00);
    arrowHelper.name = 'arrow' + number;
    scene.add(arrowHelper);
}

function setIntensityText(vector, number) { // Unused
    var position = new THREE.Vector3(vector.x, vector.y, vector.z);
    var intensity = getIntensity(vector);
    mesh = scene.getObjectByName("intensity"+number);
    if(mesh !== undefined){
        scene.remove(mesh);
    }
    var loader = new THREE.FontLoader();
    loader.load( 'assets/fonts/helvetiker_regular.typeface.json', function ( font ) {
        geometry = new THREE.TextGeometry( intensity.toPrecision(2), {
            font: font,
            size: 100,
            height: 0.5,
            curveSegments: 4,
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.05,
            bevelSegments: 3,
            color: 0x00ff00
        } );
        geometry.center();
        material = new THREE.MeshBasicMaterial({color : 0x00ff00});
        mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(position.x ,getScaledIntensity(intensity)+50, position.z);
        mesh.lookAt(camera.position);
        mesh.name = "intensity"+number;
        scene.add( mesh );
    } );

}

var buildUp = function () {
    var vector = new THREE.Vector3();
    showIntensity();
    return new TWEEN.Tween({
        scale: 1
    }).to({
        scale: 3
    }, 2000).onUpdate(function () {
        vector.set(-225, 1, 0); // bridge
        scene.getObjectByName("arrow1").setLength(getScaledIntensity(getIntensity(vector)));
        //setIntensityText(vector, 1);

        vector.set(550, 1, 0); // building
        scene.getObjectByName("arrow2").setLength(getScaledIntensity(getIntensity(vector)));
        //setIntensityText(vector, 2);
    }).onComplete(function () {
        buildDown().start();
    });
};
var buildDown = function () {
    var vector = new THREE.Vector3();
    return new TWEEN.Tween({
        scale: 3
    }).to({
        scale: 1
    }, 2000).onUpdate(function () {
        //arrowHelper.setLength(100);
        vector.set(-225, 1, 0); // bridge
        scene.getObjectByName("arrow1").setLength(getScaledIntensity(getIntensity(vector)));
        //setIntensityText(vector, 1);

        vector.set(550, 1, 0); // building
        scene.getObjectByName("arrow2").setLength(getScaledIntensity(getIntensity(vector)));
        //setIntensityText(vector, 2);
    }).onComplete(function () {
        buildUp().start();
    });
};

buildUp().start();

renderer.domElement.addEventListener("click", onclick, true);

var selectedObject;

function onclick(event) {
    var mouse = new THREE.Vector2();
    var rect = renderer.domElement.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children); //array
    if (intersects.length > 0) {
        selectedObject = intersects[0];
        console.log(selectedObject.object.name);
        if (selectedObject.object.name.includes("landmark") && isSelectLandmark) {
            console.log(selectedObject.object.geometry.parameters.height);
            selectedLandmark = selectedObject.object;
        } else if (selectedObject.object.name.includes("building") && isSelectBuilding) {
            console.log(selectedBuilding);
            selectedBuilding = selectedObject.object;
        } else if (isSkyVisibility && (selectedObject.object.name.includes("park") || selectedObject.object.name.includes("ground")
            || selectedObject.object.name.includes("ground") || selectedObject.object.name.includes("street")
            || selectedObject.object.name.includes("bridge"))) {
            console.log(selectedObject.point);
            skyRayCast();
        }
    }
}

function removeMesh(o) {
    if (o.geometry) {
        o.geometry.dispose();
    }
    if (o.material) {
        if (o.material.length) {
            for (let i = 0; i < o.material.length; ++i) {
                o.material[i].dispose();
            }
        } else {
            o.material.dispose();
        }
    }
    scene.remove(o);
}

function deleteBuilding() {
    var building = selectedBuilding;
    console.log(building);
    var foundation = building.clone();
    selectedBuilding = undefined;
    removeMesh(building);
    geometry = new THREE.BoxGeometry(75, 1, 75);
    material = new THREE.MeshLambertMaterial({color: 0xff0000});
    foundation.geometry = geometry;
    foundation.material = material;
    foundation.position.y = 0.5;
    scene.add(foundation);
    if (foundations === undefined) {
        foundations = new Set();
    }
    foundations.add(foundation);
}

function updateBuilding() {
    var building = selectedBuilding;
    console.log(building);
    var newBuilding = building;
    removeMesh(building);
    var height = newBuilding.geometry.parameters.height;
    if (height >= 600) {
        height = 300;
    } else {
        height += 150;
    }
    geometry = new THREE.BoxGeometry(75, height, 75);
    newBuilding.geometry = geometry;
    newBuilding.position.y = height / 2 + 0.5;
    scene.add(newBuilding);
}

function addBuildings() {
    if (foundations !== undefined) {
        foundations.forEach(foundation => {
            addBuilding(foundation);
        });

    }
}

function addBuilding(foundation) {
    var height = 300;
    geometry = new THREE.BoxGeometry(75, height, 75);
    texture = new THREE.TextureLoader().load("assets/textures/building.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    materials =
        [
            new THREE.MeshLambertMaterial({map: texture}), // RIGHT SIDE
            new THREE.MeshLambertMaterial({map: texture}), // LEFT SIDE
            new THREE.MeshLambertMaterial({color: 0xb5b5b5}), // TOP SIDE
            new THREE.MeshLambertMaterial({color: 0xb5b5b5}), // BOTTOM SIDE
            new THREE.MeshLambertMaterial({map: texture}), // FRONT SIDE
            new THREE.MeshLambertMaterial({map: texture}) // BACK SIDE
        ];
    mesh = new THREE.Mesh(geometry, materials);
    mesh.name = foundation.name;
    mesh.position.set(foundation.position.x, (height / 2) + 0.5, foundation.position.z);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    removeMesh(foundation);
    scene.add(mesh);
}

function skyRayCast() {
    raycaster = new THREE.Raycaster();
    var x = selectedObject.point.x, y = selectedObject.point.y, z = selectedObject.point.z;
    if(y<0){
        return;
    }
    //console.log(x+""+y+""+z)
    var direction = new THREE.Vector3(150, 0, 450);
    var startPoint = new THREE.Vector3(x, y+1.1, z);
    var rayStartPoint = new THREE.Vector3(x, y, z);
    var hitObjects = [];
    var hits = 0;

    resetSkyRayCast();
    var arrowGroup = new THREE.Group();
    arrowGroup.name = "arrowGroup";
    var total = 0;

    for (var i = 0; i < 360; i += 5) {
        for (var j = 0; j < 180; j += 1) {
            direction.x = radius * Math.sin(THREE.MathUtils.degToRad(i)) * Math.sin(THREE.MathUtils.degToRad(j));
            direction.z = radius * Math.cos(THREE.MathUtils.degToRad(i)) * Math.sin(THREE.MathUtils.degToRad(j));
            direction.y = radius * Math.cos(THREE.MathUtils.degToRad(j));
            direction.normalize();

            raycaster.set(startPoint, direction);
            total++;

            var intersects = raycaster.intersectObjects(scene.children);

            if (intersects[0]) {
                hits++;
                var objectId = intersects[0].object.uuid;
                if (hitObjects.length > 0 && hitObjects.find(element => element == objectId)) {
                    continue;
                }
                hitObjects.push(objectId);

                //arrow
                var hex = 0xff0000;
                var arrowHelper = new THREE.ArrowHelper(direction, rayStartPoint, intersects[0].distance, hex);
                arrowGroup.add(arrowHelper)
            }
        }
    }
    scene.add(arrowGroup);
    console.log("total: " + total + " hits: " + hits);

    alert("Sky Exposure: " + ((total - hits) / total) * 100 + "%");
}

create3DTerrain(500, 300, 3, 3, MAX_HEIGHT);

function create3DTerrain(width, depth, spacingX, spacingZ, height) {

    var date = new Date();
    noise.seed(date.getMilliseconds());


    // first create all the individual vertices
    geometry = new THREE.Geometry();
    for (var z = 0; z < depth; z++) {
        for (var x = 0; x < width; x++) {
            var yValue = Math.abs(noise.perlin2(x / 100, z / 600) * height * 2);
            var vertex = new THREE.Vector3(x * spacingX, yValue, z * spacingZ);
            geometry.vertices.push(vertex);
        }
    }

    // next we need to define the faces. Which are triangles
    // we create a rectangle between four vertices, and we do
    // that as two triangles.
    for (var z = 0; z < depth - 1; z++) {
        for (var x = 0; x < width - 1; x++) {
            // we need to point to the position in the array
            // a - - b
            // |  x  |
            // c - - d
            var a = x + z * width;
            var b = (x + 1) + (z * width);
            var c = x + ((z + 1) * width);
            var d = (x + 1) + ((z + 1) * width);

            // define the uvs for the vertices we just created.
            var uva = new THREE.Vector2(x / (width - 1), 1 - z / (depth - 1));
            var uvb = new THREE.Vector2((x + 1) / (width - 1), 1 - z / (depth - 1));
            var uvc = new THREE.Vector2(x / (width - 1), 1 - (z + 1) / (depth - 1));
            var uvd = new THREE.Vector2((x + 1) / (width - 1), 1 - (z + 1) / (depth - 1));

            var face1 = new THREE.Face3(b, a, c);
            var face2 = new THREE.Face3(c, d, b);

            face1.color = new THREE.Color(scale(getHighPoint(geometry, face1)).hex());
            face2.color = new THREE.Color(scale(getHighPoint(geometry, face2)).hex())

            geometry.faces.push(face1);
            geometry.faces.push(face2);

            geometry.faceVertexUvs[0].push([uvb, uva, uvc]);
            geometry.faceVertexUvs[0].push([uvc, uvd, uvb]);
        }
    }


    // compute the normals
    geometry.computeVertexNormals(true);
    geometry.computeFaceNormals();

    // setup the material
    texture = new THREE.TextureLoader().load("assets/textures/wood.png");
    material = new THREE.MeshPhongMaterial({map: texture});

    // create the mesh
    mesh = new THREE.Mesh(geometry, material);
    mesh.translateX(-width / 1.5);
    mesh.translateZ(-depth / 4);
    mesh.translateY(50);
    mesh.name = 'terrain';
    mesh.position.set(-725, 0, 750);

    scene.add(mesh);
}

function getHighPoint(geometry, face) {

    var v1 = geometry.vertices[face.a].y;
    var v2 = geometry.vertices[face.b].y;
    var v3 = geometry.vertices[face.c].y;

    return Math.max(v1, v2, v3);
}

function resetSkyRayCast() {
    var arrowGroup = scene.getObjectByName("arrowGroup");
    console.log("arrowGroup: " + arrowGroup);
    if (arrowGroup !== undefined) {
        scene.remove(arrowGroup);
    }
}

window.mobileAndTabletCheck = function () {
    let check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

renderer.domElement.addEventListener("touchstart", ontouchstart, true);

function ontouchstart(event) {
    var mouse = new THREE.Vector2();
    var rect = renderer.domElement.getBoundingClientRect();

    mouse.x = +(event.targetTouches[0].pageX / rect.width) * 2 + -1;
    mouse.y = -(event.targetTouches[0].pageY / rect.height) * 2 + 1;

    raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children); //array
    if (intersects.length > 0) {
        selectedObject = intersects[0];
        console.log(selectedObject.object.name);
        if (selectedObject.object.name.includes("landmark") && isSelectLandmark) {
            console.log(selectedObject.object.geometry.parameters.height);
            selectedLandmark = selectedObject.object;
        } else if (selectedObject.object.name.includes("building") && isSelectBuilding) {
            console.log(selectedBuilding);
            selectedBuilding = selectedObject.object;
        } else if (isSkyVisibility && (selectedObject.object.name.includes("park") || selectedObject.object.name.includes("ground")
            || selectedObject.object.name.includes("ground") || selectedObject.object.name.includes("street")
            || selectedObject.object.name.includes("bridge"))) {
            console.log(selectedObject.point);
            skyRayCast();
        }
    }
}