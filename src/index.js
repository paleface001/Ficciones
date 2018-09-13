const THREE = require('three');
const RenderPass = require('./pass/renderpass.js');
const { basicVertex,basicFragment } = require('./shader');

class Collection {
    constructor(cfg) {
		this.container = cfg.container;
    }

    renderPassTest(){
		const self = this;
		const container = document.getElementById(self.container);
		const width = container.offsetWidth;
		const height = container.offsetHeight;
        const scene = new THREE.Scene();
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
        renderer.setSize(width, height);
		renderer.setClearColor( 0x000000, 0.0 );
		container.appendChild( renderer.domElement );
		const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
		camera.position.z = 5;

		const geometry = new THREE.BoxGeometry( 1, 1, 1 );
		const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		const cube = new THREE.Mesh( geometry, material );
		//scene.add( cube );

		//test renderPass
		const passSize={width:width,height:height};
		const passClear={color:0xffffff,alpha:0};
		const pass = new RenderPass({ camera:camera,
									  size:passSize,
									  clear:passClear,
									  renderer:renderer
		                             } );
        pass.pass.depthBuffer=true;
		pass.add(cube);

		//pass output
		//output
		const out_mat = new THREE.RawShaderMaterial({ vertexShader: basicVertex,
													  fragmentShader: basicFragment,
													  side: THREE.DoubleSide,
													  transparent: true
												    });
		out_mat.uniforms = { texture: { type:"t", value: pass.texture } };
		const out_plane = new THREE.PlaneBufferGeometry( width,height, 1, 1);
		const outOrthCam=new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
		outOrthCam.position.set( 0, 0, 100);
		const out = new THREE.Mesh( out_plane, out_mat );
		scene.add(out);
		


		const animate = function () {
			requestAnimationFrame( animate );
			cube.rotation.x += 0.01;
			cube.rotation.y += 0.01;
			pass.render();
			renderer.render( scene, outOrthCam);
		};
		animate();
    }
    

}

module.exports = Collection;
