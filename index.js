
import { PointerLockControls } from './assets/PointerLockControls.js';
// import { MTLLoader } from './assets/MTLLoader.js';


//inisiasi variabel
var camera, scene, renderer, controls;
var maju = false;
var mundur = false;
var kiri = false;
var kanan = false;
var kecepatanGerak = new THREE.Vector3();
var arahGerak = new THREE.Vector3();
var prevTime = performance.now();

//Tambah dan set posisi kamera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 4;
camera.position.y = 1;
camera.position.x = 0;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor ( 0xefefef );
document.body.appendChild( renderer.domElement );

// var mouseEffect = new ParallaxBarrierEffect(renderer);
// mouseEffect.setSize(window.innerWidth, window.innerHeight);



// var geometry = new THREE.BoxGeometry( 4, 4, 4 );
// const loader = new THREE.TextureLoader();
// var material = new THREE.MeshBasicMaterial( { color: 0x999999, map: loader.load('images/flakes.png')});
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );



var controls = new PointerLockControls(camera, renderer.domElement);
document.addEventListener('click', function(){
    controls.lock(), false});

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);
 
var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);
 
var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

//Tambah scene
var scene = new THREE.Scene();
scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);
 
var onProgress = function ( xhr ) {
    if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
    }
};

var onError = function () { };

const gltfLoader = new THREE.GLTFLoader();
  gltfLoader.load('assets/fp grafkom warna.gltf', function (gltf) {
	  if ( gltf.isMesh ) {
		gltf.material.envMap = envMap;
	}
    scene.add(gltf.scene);
}, onProgress, onError);

// var mtlLoader = new THREE.MTLLoader();
// // mtlLoader.setTexturePath('assets/');
// // mtlLoader.setPath('assets/');
// mtlLoader.load('assets/fp grafkom (3).mtl', function (materials) {
 
//     materials.preload();
 
//     var objLoader = new THREE.OBJLoader();
//     objLoader.setMaterials(materials);
//     // objLoader.setPath('assets/');
//     objLoader.load('assets/fp grafkom (3).obj', function (object) {
//         object.position.y -= 0;
//         scene.add(object);
 
//     }, onProgress, onError);
 
// });

var onKeyDown = function(event){
    switch(event.keyCode){
        case 87:
            maju = true;
            break;
        case 65:
            kiri = true;
            break;
        case 83:
            mundur = true;
            break;
        case 68:
            kanan = true;
            break;        
    }
};

var onKeyUp = function(event){
    switch(event.keyCode){
        case 87:
            maju = false;
            break;
        case 65:
            kiri = false;
            break;
        case 83:
            mundur = false;
            break;
        case 68:
            kanan = false;
            break;        
    }
}

document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);

// -----------------------------------------FUNCTION-----------------------------//

// function render(){
//     camera.position.x += (mouseX - camera.position.x) * .05;
//     camera.position.y += (-mouseY - camera.position.y) * .05;
//     camera.lookAt(scene.position);
//     renderer.render(scene, camera);
    
    
// }

function gerakPemain(){
    if(controls.isLocked == true){
        var time = performance.now();
        var delta = (time - prevTime) / 1000;

        kecepatanGerak.x -= kecepatanGerak.x * 10.0 * delta;
        kecepatanGerak.z -= kecepatanGerak.z * 10.0 *delta;
        
        //set gravitasi
        kecepatanGerak.y -= 9.8 * 100.0 * delta;

        arahGerak.z = Number(maju) - Number(mundur);
        arahGerak.x = Number(kanan) - Number(kiri);
        arahGerak.normalize();

        if(maju || mundur){
            kecepatanGerak.z -= arahGerak.z * 50.0 * delta;
        }
        if(kanan || kiri){
            kecepatanGerak.x -= arahGerak.x * 50.0 * delta;
        }
        controls.moveRight(-kecepatanGerak.x * delta);
        controls.moveForward(-kecepatanGerak.z * delta);

        prevTime = time;

    }
    // if(kanan){
    //     camera.position.z -= Math.cos(camera.rotation.x - Math.PI/2) * kecepatanGerak;
    //     camera.position.x -= Math.sin(camera.rotation.y - Math.PI/2) * kecepatanGerak;
        
    // }
    // if(kiri){
    //     camera.position.z += Math.cos(camera.rotation.x - Math.PI/2) * kecepatanGerak;
    //     camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * kecepatanGerak;
        
    // }
    // if(maju){
    //     camera.position.z -= Math.cos(camera.rotation.y) * kecepatanGerak;
    //     camera.position.x -= Math.sin(camera.rotation.y) * kecepatanGerak;
    // }
    // if(mundur){
    //     camera.position.z += Math.cos(camera.rotation.y) * kecepatanGerak;
    //     camera.position.x += Math.sin(camera.rotation.y) * kecepatanGerak;
    // }
}
var animate = function () {
    
    requestAnimationFrame( animate );
    gerakPemain();
    renderer.render(scene, camera);
    
    
    
	// controls.update();
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

};


animate();
