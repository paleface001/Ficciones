const THREE = require('three');
const vertexShader = require('../../shader/moon/basic-vertex.glsl');
const fragmentShader = require('../../shader/moon/basic-fragment.glsl');

class Moon {
    constructor(cfg) {
        this.color= cfg.color;
        this.clipped = cfg.clipped;
        this.clippingPlane = cfg.clippingPlane?cfg.clippingPlane:new THREE.Vector4(0,1,0,0);
        this._init_();
      }

    _init_(){
        const self = this;
        self.geometry = new THREE.SphereBufferGeometry( 100, 50, 50 );
        self.material = new THREE.RawShaderMaterial({ 
            vertexShader: vertexShader.default,
            fragmentShader: fragmentShader.default,
            side: THREE.DoubleSide,
            transparent: true
        });
        self.material.uniforms = {
            clippingPlane:{type:'v4',value:self.clippingPlane},
            clipped:{type:'bool',value:self.clipped},
            color:{type:'v3',value:this.color}
        };
        self.mesh = new THREE.Mesh( self.geometry, self.material);
    }

    setPosition(x,y,z){
        this.mesh.position.set(x,y,z);
    }
    
}

module.exports = Moon;