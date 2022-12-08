import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { BaseGlbLoader } from './loader/BaseGlbLoader';
import { BasePlane } from './plane/BasePlane';
import { WaterPlane } from './plane/WaterPlane';

console.clear();

export class App {

  constructor() {

    this.createScene();
    this.createCamera();
    this.createBackground();
    this.createPlane();
    this.createControl();
    this.load3dModel();
    this.createRainParticles();

    window.addEventListener( 'resize', () => {
      this.onWindowResize();
    });

    this.animate();
    console.log('App initialized');
  }

  createScene() {
    // create renderer
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    document.body.append(this.renderer.domElement);
    this.renderer.domElement.id = "WebGLApp";

    // create scene
    this.scene = new THREE.Scene();
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 300);
    this.camera.position.set(0, 15, 25);
    this.camera.lookAt(40, 1, 0);
  }

  createControl() {
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.addEventListener( 'change', () => {
      this.render();
    });

    this.controls.minDistance = 10;
    this.controls.maxDistance = 50;
    this.controls.enablePan = false;

    // probe
    this.lightProbe = new THREE.LightProbe();
    this.scene.add( this.lightProbe );

    // light
    this.directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
    this.directionalLight.position.set( 5, 5, 0 );
    this.directionalLight.target.position.set(0, 0, 0);
    this.scene.add( this.directionalLight );    
  }

  createBackground() {
  
    const urls = this.getTextureUrls('assets/TropicalSunnyDay_', '.jpg' );
    new THREE.CubeTextureLoader().load( urls, ( cubeTexture ) => {    
      
      cubeTexture.encoding = THREE.sRGBEncoding;
      this.scene.background = cubeTexture;
      this.render();

    } );    
  }

  createPlane() {
    this.plane = new BasePlane(this.scene);
    this.waterPlane = new WaterPlane(this.scene);
  }

  load3dModel() {
    this.model = new BaseGlbLoader(this.scene, "assets/round_platform.glb", {x:0, y:0.3, z:0})
  }

  createRainParticles() {
    this.rainCount=250;
    const points = [];
    for(let i=0; i<this.rainCount; i++) {
      var rainDrop = new THREE.Vector3(
        Math.random()*40-20,
        Math.random()*25,
        -Math.random()*40 + 10
      )
      points.push(rainDrop);
    }
    
    this.rainGeo = new THREE.BufferGeometry(50, 50, 50).setFromPoints(points);
    this.rainMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.2,
      opacity: 0.4,
      transparent: true,
    })
    
    this.rain = new THREE.Points(this.rainGeo, this.rainMaterial);
    this.scene.add(this.rain)  
  }

  getTextureUrls( prefix, postfix ) {

    return [
      prefix + 'px' + postfix, prefix + 'nx' + postfix,
      prefix + 'py' + postfix, prefix + 'ny' + postfix,
      prefix + 'pz' + postfix, prefix + 'nz' + postfix
    ];

  };

  onWindowResize() {

    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.render();
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.render();
  }

  renderRainDrop() {
    const positions = this.rainGeo.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.5;
        if (positions[i+1] < 0) positions[i + 1] = 25;
    }

    this.rainGeo.attributes.position.needsUpdate = true;
  }  

  render() {
    this.waterPlane.render();
    this.model.render();
    this.renderRainDrop();
    this.renderer.render( this.scene, this.camera );
  }  

}