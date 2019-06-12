import Queue from "./queue.js";

function FiniteStateStack() {
	this.data = new Queue();

	this.events = {
		onStart   : (a, c) => { console.log("start item");   c(); return a; }, 
		onResolve : (a, c) => { console.log("resolve item"); c(); return a; }, 
		onRemove  : (a, c) => { console.log("remove item");  c(); return a; }
	};

	// METHODS
	this.add = ( item, 
		onStart   = this.events.onStart, 
		onResolve = this.events.onResolve, 
		onRemove  = this.events.onRemove
	) => {
		//console.log("added", item)
		this.data.add({
		item,
		state: 0, 
		onStart,
		onResolve,
		onRemove
	});
	}

	this.update = () => {
		const current = this.current();

		if (!current) {
			return;
		}

		const {
			item, 
			state, 
			onStart,
			onResolve,
			onRemove
		} = current;


		if (!state) {
			if (!item) {
				this.updateItemState(current);
				return;
			}
			current.item = onStart(item, () => this.updateItemState(current));
			return;
		}

		if (state === 1) {
			if (!item) {
				this.updateItemState(current);
				this.updateItemState(current);
				return;
			}
			this.updateItemState(current);
			current.item = onResolve(item, () => this.updateItemState(current) );
			return;
		}

		if (state === 2) {
			return;
		}

		if (!item) {
			this.remove();
			return;
		}

		current.item = onRemove(item, this.remove);
	}

	this.current = () => this.data.last();


	// HELPERS
	this.updateItemState = item => {
		if (!item) {
			return;
		}
		item.state++;
	};

	this.remove = () => this.data.remove();
	this.size = () => this.data.size();

	//
	this.findIndex = filter => this.data.findIndex(filter);
}


export default FiniteStateStack;