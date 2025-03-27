// Three.js Animation Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf2efe7); // Original background color
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#heroCanvas"),
  alpha: true,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 5;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3),
);

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.005,
  color: "#111111", // Original particle color
  transparent: true,
  opacity: 0.5,
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Camera position
camera.position.z = 2;

// Animation
function animate() {
  requestAnimationFrame(animate);

  particlesMesh.rotation.y += 0.0005;
  particlesMesh.rotation.x += 0.0005;

  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();

// GSAP Animation for text
gsap.from(".hero-title", {
  duration: 1,
  y: 50,
  opacity: 0,
  ease: "power3.out",
  delay: 0.5,
});

gsap.from(".hero-title span", {
  duration: 1,
  y: 30,
  opacity: 0,
  ease: "power3.out",
  delay: 1,
});

gsap.from(".heroSection .btn", {
  duration: 1,
  y: 30,
  opacity: 0,
  ease: "power3.out",
  delay: 1.5,
});

gsap.from(".heroSection .right img", {
  duration: 1.5,
  scale: 0.8,
  opacity: 0,
  ease: "power3.out",
  delay: 0.5,
});
