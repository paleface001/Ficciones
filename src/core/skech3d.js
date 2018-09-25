const THREE = require('three');

class Sketch3D {
    constructor(cfg) {
      this.container = cfg.container;
      this._init_();
    }

    _init_(){
      const self = this;
      const container = document.getElementById(self.container);
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
      renderer.setSize(width, height);
      renderer.setClearColor( 0x000000, 0.0 );
      container.appendChild( renderer.domElement );
      const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 5000 );
      camera.position.z = 500;
      //regist property
      self.sketchWidth = width;
      self.sketchHeight = height;
      self.scene = scene;
      self.renderer = renderer;
      self.defaultCamera = camera;
    }

    render(){
      this.renderer.render( this.scene, this.defaultCamera);
    }

};

module.exports = Sketch3D;