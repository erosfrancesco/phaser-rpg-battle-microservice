import Queue from "./queue.js";


function DelayedQueue() {

	this.queue = new Queue();
	this.current = false;

	this.update = (before, after) => {
		if (!this.queue.size()) {
			return;
		}

		if (this.current) { 
			this.queueIsWaitingFor(this.current, () => this.processQueue(before, after) );
			return;
		}

		this.current = this.queue.last();
	};

	this.add = item => this.queue.add(item);

	this.remove = () => {
		this.queue.remove();
		this.current = false;
	};


	// HELPERS
	this.processQueue = (checks = a => a, after = (a, c) => c()) => 
		checks(this.current) ? this.successful(after) : this.remove();

	this.successful = after => after(this.current, () => this.remove());

	this.queueIsWaitingFor = (item, callback) => { callback(); }

}



export default DelayedQueue;

