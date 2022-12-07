import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { LightProbeGenerator } from "three/examples/jsm/lights/LightProbeGenerator"


console.clear();

const API = {
  lightProbeIntensity: 1.0,
  directionalLightIntensity: 0.2,
  envMapIntensity: 1
};

export class App {

  constructor() {

    this.createRender();
    this.createScene();
    this.createCamera();
    this.createControl();
    this.createBackground();

    window.addEventListener( 'resize', () => {
      this.onWindowResize();
    });

    this.render();
    console.log('App initialized');
  }

  createRender() {
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    document.body.append(this.renderer.domElement);
    this.renderer.domElement.id = "WebGLApp";
  }

  createScene() {
    this.scene = new THREE.Scene();
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(0, 0, 30);    
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
    this.directionalLight.position.set( 10, 10, 10 );
    this.scene.add( this.directionalLight );    
  }

  createBackground() {
  
    const urls = this.getTextureUrls('assets/TropicalSunnyDay_', '.jpg' );
    new THREE.CubeTextureLoader().load( urls, ( cubeTexture ) => {    
      cubeTexture.encoding = THREE.sRGBEncoding;

      this.scene.background = cubeTexture;

      this.lightProbe.copy( LightProbeGenerator.fromCubeTexture( cubeTexture ) );

      // const geometry = new THREE.SphereGeometry( 5, 64, 32 );
      // const material = new THREE.MeshStandardMaterial( {
      //   color: 0xffffff,
      //   metalness: 0,
      //   roughness: 0,
      //   envMap: cubeTexture,
      //   envMapIntensity: API.envMapIntensity,
      // } );

      // // mesh
      // var mesh = new THREE.Mesh( geometry, material );
      // this.scene.add( mesh );

      this.render();

    } );    
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

  render() {
    this.renderer.render( this.scene, this.camera );
  }  

}