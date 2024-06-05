import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: '#00ff83'
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

const light = new THREE.PointLight(0xffffff, 100, 100);
light.position.set(0, 10, 10);
scene.add(light)

const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 100);
camera.position.z = 20
scene.add(camera);

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(2)
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true
controls.autoRotate = true

window.addEventListener('resize', () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  renderer.setSize(size.width, size.height);
  camera.updateProjectionMatrix()
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop)
}
loop();


let mouseDown = false;
let rgb = [];
window.addEventListener('mousedown', () => (mouseDown = true));
window.addEventListener('mouseup', () => (mouseDown = false));

window.addEventListener('mousemove', (e) => {
  if(mouseDown){
    rgb = [
      Math.round((e.pageX / size.width) * 255),
      Math.round((e.pageY / size.width) * 255),
      150
    ]
    let newColor = new THREE.Color(`rgb(${rgb.join(',')})`)
    mesh.material.color = newColor
  }
})
