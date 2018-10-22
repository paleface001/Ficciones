const THREE = require('three');
const Sketch3D = require('../../core/skech3d');
const RenderPass = require('../../core/pass/renderpass');
const vertexShader = require('../../shader/water/sine-wave-vertex-realistic.glsl');
const fragmentShader = require('../../shader/water/basic-fragment.glsl');
const Moon = require('../../sketches/moon-and-water/moon');

class Water extends Sketch3D {

    _init_(){
        const self = this;
        super._init_();
        //set default camera
        self.defaultCamera.position.set(0,100,200);
        self.defaultCamera.lookAt(0,0,0);
        self.defaultCamera.updateProjectionMatrix();
        //set reflection camera
        const mirrorCamera = self.defaultCamera.clone();
        mirrorCamera.position.set(0,-100,200);
        mirrorCamera.lookAt(0,0,0);
        mirrorCamera.up.set(0,-1,0);
        mirrorCamera.updateProjectionMatrix();
        mirrorCamera.updateMatrixWorld();
        this.mirrorCamera = mirrorCamera;
        //initialize time
        this.startTime = Date.now();
    }

    render(){
        const self = this;
        //add moon
        const moon = new Moon({
          color:new THREE.Vector3(224/255,170/225,82/255),
          clipped:false
        });
        moon.setPosition(0,0,-300);
        self.scene.add( moon.mesh );
        //water passes
        //reflection pass
        const passSize={width:self.sketchWidth,height:self.sketchHeight};
        const passClear={color:0xffffff,alpha:0};
        const pass1 = new RenderPass({ camera:self.mirrorCamera,
									  size:passSize,
									  clear:passClear,
                    renderer:self.renderer
                  });
        const clippingPlane1 = new THREE.Vector4(0,1,0,-0);
        const moon2 = new Moon({
          color:new THREE.Vector3(224/255,170/225,82/255),
          clipped:true,
          clippingPlane:clippingPlane1
        });
        moon2.setPosition(0,0,-300);
        pass1.add(moon2.mesh);
        pass1.render();
        //refraction pass
        const pass2 = new RenderPass({ camera:self.defaultCamera,
									  size:passSize,
									  clear:passClear,
                    renderer:self.renderer
                  });
        const clippingPlane2 = new THREE.Vector4(0,-1,0,0);
        const moon3 = new Moon({
          color:new THREE.Vector3(224/255,170/225,82/255),
          clipped:true,
          clippingPlane:clippingPlane2
        });
        moon3.setPosition(0,0,-300);
        pass2.add(moon3.mesh);
        pass2.render();
        //add sea
        const sea_geo = new THREE.PlaneBufferGeometry( 1000, 1000, 500 );
        const sea_mat = new THREE.RawShaderMaterial({ 
            vertexShader: vertexShader.default,
            fragmentShader: fragmentShader.default,
            side: THREE.DoubleSide,
            transparent: true
          });
        sea_mat.uniforms={ reflectionTexture:{type:"t",value:pass1.texture},
                           refractionTexture:{type:"t",value:pass2.texture},
                           cameraPos:{type:'v3',value:self.defaultCamera.position},
                           near:{type:'f',value:self.defaultCamera.near},
                           far:{type:'f',value:self.defaultCamera.far},
                           _WaveLength:{type:'f',value:0.5},
                           _Amp:{type:'f',value:0.5},
                           _Speed:{type:'f',value:0.2},
                           _Dir:{type:'v4',value:[1.0,0.0,0.0,0.0]},
                           _Sharpness:{type:'f',value:1.0},
                           time:{type:'f',value:0.0}
                         };
        const sea = new THREE.Mesh( sea_geo, sea_mat );
        sea.rotation.x = -Math.PI * 0.5;
        self.scene.add( sea );
        self.seaPlane = sea;
        //render
        function rendering(){
          requestAnimationFrame( rendering );
          //self.seaPlane.material.uniforms.time.value = .005 * ( Date.now() - self.startTime );
          self.seaPlane.material.uniforms.time.value += 1.0 / 60.0;
          self.renderer.render( self.scene, self.defaultCamera);
        }

        rendering();
    }
}

module.exports = Water;