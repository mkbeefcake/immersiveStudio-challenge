import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import * as SkeletonUtils  from 'three/examples/jsm/utils/SkeletonUtils'

var SPEED = 0.01;

export class BaseGlbLoader {

    constructor(scene, model, position) {
        
        this.loader = new GLTFLoader();
        this.loader.load( model, ( gltf ) => {

            gltf.scene.traverse( function ( object ) {

                if ( object.isMesh ) object.castShadow = true;

            } );

            this.model1 = SkeletonUtils.clone( gltf.scene );
            this.model1.position.x = position.x;
            this.model1.position.y = position.y;
            this.model1.position.z = position.z;

            scene.add( this.model1);
        } );        
    }

    render() {
        if (this.model1)
            this.model1.rotation.y -= SPEED * 2;
    }
}