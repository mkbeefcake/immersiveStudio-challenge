import * as THREE from 'three'
import { Water } from 'three/examples/jsm/objects/Water';
import { Sky } from 'three/examples/jsm/objects/Sky';
import { BaseComponent } from '../../components/base/BaseComponent';

export class WaterPlane extends BaseComponent {
    
    constructor(scene) {
        super();

        this.waterGeometry = new THREE.PlaneGeometry( 20, 20);
        this.waterGeometry.rotateX( - Math.PI / 2);

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
            }
        );
        this.water.position.set(0, 0.1, 0);
        scene.add(this.water);
    }
    
}