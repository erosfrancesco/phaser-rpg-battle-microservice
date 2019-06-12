import FiniteStateStack from "./finiteStateStack.js";


function StackRegistry() {
	
	this.stack = new FiniteStateStack();
	this.elements = {};
	this.labelId = "registry-";


	this.add    = item => this.stack.add(item);
	this.update = () => this.stack.update();


	this.unregister = id => delete this.elements[id];
	this.register = item => {
		item.id = item.id || (this.labelId + this.size());
		this.elements[item.id] = item;
	};
	

	this.forEach = iteration => {
		Object.keys(this.elements).forEach((id, i) => {
			if (!this.elements[id]) {
				return;
			}
			iteration(this.elements[id], i, id) 
		});
	}
	this.find = filters => {
		let results = false;
		this.forEach((item, i, id) => filters(item, i, id) ? results = item : null );
		return results;
	}
	this.random = () => {
		const index = Phaser.Math.Between(0, this.size() - 1);
		const id = Object.keys(this.elements)[index];
		return this.elements[id];
	}
	this.size = () => Object.keys(this.elements).length;
}


export default StackRegistry;