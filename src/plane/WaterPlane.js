import * as THREE from 'three'
import { Water } from '../components/Water'

export class WaterPlane {
    
    constructor(scene) {
        this.water = new Water(scene);
    }
}