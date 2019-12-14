
import { PointerLockControls } from './assets/PointerLockControls.js';

//inisiasi variabel
var camera, scene, renderer, controls;
var maju = false;
var mundur = false;
var kiri = false;
var kanan = false;
var kecepatanGerak = 0.1;

//Tambah dan set posisi kamera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 0;
camera.position.y = 1;
camera.position.x = 3;

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
controls.enableDamping = true;
controls.dampingFactor = 0.25;

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
 
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('assets/');
mtlLoader.setPath('assets/');
mtlLoader.load('trail.mtl', function (materials) {
 
    materials.preload();
 
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('assets/');
    objLoader.load('trail.obj', function (object) {
 
        scene.add(object);
        object.position.y -= 0;
 
    });
 
});

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
    if(kanan){
        camera.position.x -= Math.sin(camera.rotation.y - Math.PI/2) * kecepatanGerak;
    }
    if(kiri){
        camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * kecepatanGerak;
    }
    if(maju){
        camera.position.z -= Math.cos(camera.rotation.y) * kecepatanGerak;
        camera.position.x -= Math.sin(camera.rotation.y) * kecepatanGerak;
    }
    if(mundur){
        camera.position.z += Math.cos(camera.rotation.y) * kecepatanGerak;
        camera.position.x += Math.sin(camera.rotation.y) * kecepatanGerak;
    }
}
var animate = function () {
    renderer.render(scene, camera);
    gerakPemain();
	requestAnimationFrame( animate );
	// controls.update();
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

};


animate();