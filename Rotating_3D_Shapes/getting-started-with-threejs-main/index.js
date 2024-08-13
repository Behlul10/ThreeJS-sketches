import * as THREE from "three";
import {OrbitControls } from 'jsm/controls/OrbitControls.js';
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
const scene = new THREE.Scene();


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 
controls.dampingFactor = 0.03; 

// Wireframe material
const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});


// Icosahedron
const icosahedronGeo = new THREE.IcosahedronGeometry(1.0, 2);
const icosahedronMat = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true });
const icosahedronMesh = new THREE.Mesh(icosahedronGeo, icosahedronMat);
scene.add(icosahedronMesh);
icosahedronMesh.position.x = -2;  // Position to the left

const icosahedronWire = new THREE.Mesh(icosahedronGeo, wireMat);
icosahedronWire.scale.setScalar(1.001);
icosahedronMesh.add(icosahedronWire);

// Sphere
const sphereGeo = new THREE.SphereGeometry(1.0, 22, 22);
const sphereMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
scene.add(sphereMesh);
sphereMesh.position.x = 0;  // Position in the center
sphereMesh.position.y = 2;  

const sphereWire = new THREE.Mesh(sphereGeo, wireMat);
sphereWire.scale.setScalar(1.001);
sphereMesh.add(sphereWire);

// Cube
const cubeGeo = new THREE.BoxGeometry(1.0, 1.0, 1.0, 5, 5, 5);
const cubeMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
scene.add(cubeMesh);
cubeMesh.position.x = 1.5;  // Position to the right

const cubeWire = new THREE.Mesh(cubeGeo, wireMat);
cubeWire.scale.setScalar(1.001);
cubeMesh.add(cubeWire);

const hemiLight  =  new THREE.HemisphereLight(0x0099ff, 0xaa5500)
scene.add(hemiLight);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update;

    icosahedronMesh.rotation.y += 0.0035;
    icosahedronMesh.rotation.x += 0.0009;

    sphereMesh.rotation.y -= 0.0035;
    sphereMesh.rotation.x += 0.0009;

    cubeMesh.rotation.y += 0.0035;
    cubeMesh.rotation.x -= 0.0009;

}
animate();