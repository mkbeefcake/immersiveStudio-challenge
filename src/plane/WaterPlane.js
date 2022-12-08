import * as THREE from 'three'
import { Water } from 'three/examples/jsm/objects/Water';

export class WaterPlane {
    
    constructor(scene) {
        this.waterGeometry = new THREE.PlaneGeometry( 30, 30);
        this.waterGeometry.rotateX( - Math.PI / 2);
        this.waterGeometry.position.y = 0.1
        this.water = new Water(
            this.waterGeometry,
            {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: new THREE.TextureLoader().load( 'assets/waternormals.jpg', function ( texture ) {

                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

                } ),
                // sunDirection: new THREE.Vector3(),
                // sunColor: 0xffffff,
                waterColor: 0x001e0f,
                distortionScale: 3.7,
                fog: scene.fog !== undefined
            }
        );
        scene.add(this.water);
    }
}