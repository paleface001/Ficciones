const THREE = require('three');
const Water = require('./sketches/moon-and-water/realistic-water')

class Collection {
    constructor(cfg) {
		this.container = cfg.container;
    }

    waterTest(){
		const water = new Water({container:this.container});
		water.render();
	}
    

}

module.exports = Collection;
