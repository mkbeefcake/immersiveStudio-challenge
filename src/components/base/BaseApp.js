import * as THREE from 'three'

console.clear();

export class BaseApp {

    components = [];

    constructor() {

    }

    animate = () => {
        requestAnimationFrame(this.animate);
        this.render();
    }

    addComponent(newComp) {
        this.components.push(newComp);
    }

    render() {

        this.components.forEach(element => {
            element.render();
        });
    }

    getTextureUrls( prefix, postfix ) {

        return [
          prefix + 'px' + postfix, prefix + 'nx' + postfix,
          prefix + 'py' + postfix, prefix + 'ny' + postfix,
          prefix + 'pz' + postfix, prefix + 'nz' + postfix
        ];
    
    };
    
}