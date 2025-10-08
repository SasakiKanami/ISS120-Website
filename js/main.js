import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let object = null;
let controls = null;
let currentModel = 'mitochondria';

const loader = new GLTFLoader();
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

camera.position.x = 10;
camera.position.y = 10;
camera.position.z = 100;

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(600, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

function loadModel(modelName) {
  if (object) {
    scene.remove(object);
    if (controls) {
      controls.dispose();
      controls = null;
    }
  }
  
  currentModel = modelName;
  
  loader.load(
    `./models/${modelName}/scene.gltf`,
    function (gltf) {
      object = gltf.scene;
      
      if (modelName === "eye") {
        object.scale.set(1.5, 1.5, 1.5);
      } else if (modelName === "dino") {
        object.scale.set(50, 50, 50);
      } else {
        object.scale.set(100, 100, 100);
      }
      
      scene.add(object);
      
      if (modelName === "haru") {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
         camera.position.x = 162;
        camera.position.y = 12;
        camera.position.z = 326;
      }

      if (modelName === "lego-titanic") {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
         camera.position.x = 162;
        camera.position.y = 12;
        camera.position.z = 326;
     }

           if (modelName === "shork") {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
         camera.position.x = 162;
        camera.position.y = 12;
        camera.position.z = 326;
     }

      if (modelName === "goldship") {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
         camera.position.x = 2;
        camera.position.y = 15;
        camera.position.z = 15;
      }

      if (modelName === "mita") {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        camera.position.x = 162;
        camera.position.y = 12;
        camera.position.z = 326;

      }

        if (modelName === "dino") {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        camera.position.x = 787;
        camera.position.y = 110;
        camera.position.z = -500;

      }

        if (modelName === "mitochondria") {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        camera.position.x = 1100;
        camera.position.y = 2000;
        camera.position.z = 1500;

      }

      
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      console.error(error);
    }
  );
}

// Button event listeners
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.model-btn');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const modelName = this.getAttribute('data-model');
      buttons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      loadModel(modelName);
    });
  });
});

function animate() {
  requestAnimationFrame(animate);
  
  if (object && currentModel === "eye") {
    object.rotation.y = -3 + mouseX / window.innerWidth * 3;
    object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
  }
  
  if (controls) {
    controls.update();
  }
  
  renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

// Load initial model
loadModel('mitochondria');
animate();