import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { BaseApp } from './components/base/BaseApp';
import { BaseGlbLoader } from './mainscene/loader/BaseGlbLoader';
import { RainParticles } from './mainscene/particles/RainParticle';
import { BasePlane } from './mainscene/plane/BasePlane';
import { WaterPlane } from './mainscene/plane/WaterPlane';


export class App extends BaseApp {

  constructor() {

    super();

    this.initScene();
    this.createSkybox();
    this.loadComponents();

    window.addEventListener( 'resize', () => {
      this.onWindowResize();
    });

    this.animate();
    console.log('App initialized');
  }

  initScene() {

    // create renderer
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    document.body.append(this.renderer.domElement);
    this.renderer.domElement.id = "WebGLApp";

    // create scene
    this.scene = new THREE.Scene();

    // create perspective camera
    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 300);
    this.camera.position.set(0, 15, 25);
    this.camera.lookAt(40, 1, 0);

    // create OrbitControls
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.addEventListener( 'change', () => {
      this.render();
    });

    this.controls.minDistance = 10;
    this.controls.maxDistance = 50;
    this.controls.enablePan = false;

    // create Directional light
    this.directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
    this.directionalLight.position.set( 5, 5, 0 );
    this.directionalLight.target.position.set(0, 0, 0);
    this.scene.add( this.directionalLight );    
  }

  createSkybox() {
  
    // load sky textures and attach it to the scene
    const urls = this.getTextureUrls('assets/TropicalSunnyDay_', '.jpg' );
    new THREE.CubeTextureLoader().load( urls, ( cubeTexture ) => {    
      
      cubeTexture.encoding = THREE.sRGBEncoding;
      this.scene.background = cubeTexture;
      this.render();

    } );    
  }

  loadComponents() {
    this.addComponent(new BasePlane(this.scene));
    this.addComponent(new WaterPlane(this.scene));
    this.addComponent(new BaseGlbLoader(this.scene, "assets/round_platform.glb", {x:0, y:0.3, z:0}));
    this.addComponent(new RainParticles(this.scene, 250));
  }

  onWindowResize() {

    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.render();
  }


  render() {
    super.render();
    this.renderer.render( this.scene, this.camera );
  }  

}