
import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';

const t1 = gsap.timeline({ defaults: { duration: 1 } })
const t2 = gsap.timeline({ defaults: { duration: 0.5 } })
const t3 = gsap.timeline({ defaults: { duration: 3 } })
t1.fromTo("h2", { x: "20%" }, { x: "0%" })
t1.fromTo("p", { opacity: 0}, { opacity: 1 })
t1.fromTo(".explore", { opacity: 0}, { opacity: 100 })

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const section = document.querySelector("section")
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth /
    window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
section.appendChild(renderer.domElement);

const loader = new THREE.TextureLoader()

var geometry = new THREE.PlaneGeometry(19, 10, 5, 5);
var material = new THREE.MeshBasicMaterial({
    map: loader.load("./images/coverimg4.jpeg")
});
var flag = new THREE.Mesh(geometry, material);
scene.add(flag);
flag.rotation.set(-0.1, 0, 0)

camera.position.z = 5;
const clock = new THREE.Clock()

//resize // #
window.addEventListener("resize", () => {
    //Update size according to new screen size
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    //update camera
    camera.updateProjectionMatrix()
    camera.aspect = sizes.width / sizes.height
    renderer.setSize(sizes.width, sizes.height)
})

function animate() {

    const t= clock.getElapsedTime()


    flag.geometry.vertices.map(v => {
        const waveX1 = 0.5 * Math.sin(v.x * 2)
        const waveX2=0.25*Math.sin(v.x*3 + t*2)
        const waveY1 = 0.1*Math.sin(v.y*5 + t*0.5)

        v.z = waveX1 +waveX2+waveY1
    }
    )

    flag.geometry.verticesNeedUpdate = true
    requestAnimationFrame(animate);
    renderer.render(scene, camera)
}
renderer.render(scene, camera);
animate();

//only for pc code
window.addEventListener("load", function() {
    if (screen.width < 768) {
      document.getElementById("warnmsg").style.display = "block";
      document.getElementById("warnmsg").style.paddingLeft = "0.5rem";
      document.getElementById("warnmsg").style.textAlign = "left";
      document.getElementById("warnmsg").style.fontSize = "0.5rem";
      document.getElementById("warnmsg").style.width = '100vw';
      document.getElementById("warnmsg").style.whiteSpace = 'normal';
      document.getElementById("warnmsg").style.overflowWrap = 'break-word';
      document.getElementById("warnmsg").style.overflowX = 'hidden';
      document.getElementById("warnmsg").style.fontWeight = '400';
        
      
    //   document.getElementById("warnmsg").style.padding = "2rem";


      document.getElementById("home").style.display = "none";
     
      console.log(screen.width)
    }
  });
  