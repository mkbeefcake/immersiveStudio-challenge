import * as THREE from 'three'

function loadFile(filename) {
    return new Promise((resolve, reject) => {
      const loader = new THREE.FileLoader();
  
      loader.load(filename, (data) => {
        resolve(data);
      });
    });
  }

export class Water {

    constructor(scene) {
      this.geometry = new THREE.PlaneGeometry( 50, 50);

      const shadersPromises = [
        loadFile('shaders/water/vertex.glsl'),
        loadFile('shaders/water/fragment.glsl')
      ];

      this.loaded = Promise.all(shadersPromises)
          .then(([vertexShader, fragmentShader]) => {
        this.material = new THREE.RawShaderMaterial({
          uniforms: {
          },
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotateX( - Math.PI / 2);
        this.mesh.position.y = 0.1;

        scene.add(this.mesh);
      });
    }

    draw(renderer, waterTexture, causticsTexture) {
      this.material.uniforms['water'].value = waterTexture;
      this.material.uniforms['causticTex'].value = causticsTexture;

      this.material.side = THREE.FrontSide;
      this.material.uniforms['underwater'].value = true;
      renderer.render(this.mesh, camera);

      this.material.side = THREE.BackSide;
      this.material.uniforms['underwater'].value = false;
      renderer.render(this.mesh, camera);
    }

  }