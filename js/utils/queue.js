function Queue() {
	this.data = [];
	this.add    = el => this.data.unshift(el);
	this.remove = () => this.data.pop();
	this.first  = () => this.data[0] || false;
	this.last   = () => this.data[this.data.length - 1] || false;
	this.size   = () => this.data.length;

	//
	this.findIndex = filter => this.data.findIndex(filter);
}


export default Queue;