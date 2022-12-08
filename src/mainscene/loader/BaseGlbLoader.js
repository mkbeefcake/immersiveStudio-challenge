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

            this._model = SkeletonUtils.clone( gltf.scene );
            this._model.position.x = position.x;
            this._model.position.y = position.y;
            this._model.position.z = position.z;

            scene.add( this._model);
        } );        
    }

    render() {
        if (this._model)
            this._model.rotation.y -= SPEED * 2;
    }
}