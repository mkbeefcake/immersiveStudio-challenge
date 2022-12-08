import * as THREE from 'three'

export class RainParticles {
    
    constructor(scene, rainCount) {

        this.rainCount = rainCount;
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
        scene.add(this.rain)  
    }

    render() {

        // adjust particle's y
        
        const positions = this.rainGeo.attributes.position.array;

        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] -= 0.5;
            if (positions[i+1] < 0) positions[i + 1] = 25;
        }

        this.rainGeo.attributes.position.needsUpdate = true;           
    }
    
}