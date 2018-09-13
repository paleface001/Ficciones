const THREE = require('three');

class RenderPass{
    constructor(cfg){
        this.scene;
        this.camera = cfg.camera;
        this.renderer = cfg.renderer;
        this.clearColor = cfg.clear.clearColor;
        this.clearAlpha = cfg.clear.clearAlpha;
        this._init(cfg);       
    }

    _init(cfg){
        this.scene = new THREE.Scene();
        const parameters = { minFilter: THREE.LinearFilter, 
                             magFilter: THREE.LinearFilter, 
                             format: THREE.RGBAFormat, 
                             stencilBuffer: false,
                             depthBuffer:false
                            };
        this.pass=new THREE.WebGLRenderTarget( cfg.size.width, cfg.size.height, parameters );
        this.originClearColor = this.renderer.getClearColor();
        this.originClearAlpha = this.renderer.getClearAlpha();
        this.texture=this.pass.texture;
    }

    add(mesh){
        this.scene.add(mesh);        
    }

    remove(name){
        this.scene.remove(name);
    }

    render(){
        this.renderer.setClearColor (this.clearColor, this.clearAlpha);
		this.renderer.render( this.scene, this.camera, this.pass, true);
        this.renderer.setClearColor (this.originClearColor, this.originAlpha);
    }
}

module.exports = RenderPass;