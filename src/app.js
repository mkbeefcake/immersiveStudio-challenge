import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { BaseGlbLoader } from './loader/BaseGlbLoader';
import { BasePlane } from './plane/BasePlane';

console.clear();

const API = {
  lightProbeIntensity: 1.0,
  directionalLightIntensity: 0.2,
  envMapIntensity: 1
};

export class App {

  constructor() {

    this.createScene();
    this.createCamera();
    this.createBackground();
    this.createPlane();
    this.createControl();
    
    this.load3dModel();

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
    this.directionalLight = new THREE.DirectionalLight( 0xffffff, API.directionalLightIntensity );
    this.directionalLight.position.set( 5, 5, 5 );
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
  }

  load3dModel() {
    this.model = new BaseGlbLoader(this.scene, "assets/round_platform.glb", {x:0, y:0.3, z:0})
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

  render() {
    this.model.render();
    
    this.renderer.render( this.scene, this.camera );
  }  

}