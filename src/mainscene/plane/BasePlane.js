import * as THREE from 'three'
import { BaseComponent } from '../../components/base/BaseComponent';

export class BasePlane extends BaseComponent {

    constructor(scene) {
      super();

      const geometry = new THREE.PlaneGeometry( 50, 50);
      const floorMat = new THREE.MeshPhongMaterial( {
        roughness: 0.7,
        color: 0xffffff,
        bumpScale: 0.002,
        metalness: 0.02,
        shininess: 100,
      });
  
      const texture = new THREE.TextureLoader().load( "assets/floor.png");
      texture.wrapS = THREE.RepeatWrapping; 
      texture.wrapT = THREE.RepeatWrapping;
      texture.anisotropy = 4;
      texture.encoding = THREE.sRGBEncoding;
      texture.repeat.set( 2, 2 ); 
      floorMat.map = texture;

      const textureBump = new THREE.TextureLoader().load( "assets/floor_bump.png");
      textureBump.wrapS = THREE.RepeatWrapping; 
      textureBump.wrapT = THREE.RepeatWrapping;
      textureBump.anisotropy = 4;
      textureBump.encoding = THREE.sRGBEncoding;
      textureBump.repeat.set( 4, 4 ); 
      floorMat.bumpMap = textureBump;

  
      const plane = new THREE.Mesh( geometry, floorMat );
      plane.rotateX( - Math.PI / 2);
      scene.add( plane );            
    }
}