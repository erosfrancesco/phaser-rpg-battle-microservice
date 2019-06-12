function StatModifiersSystem(statKeys = []) {
	this.Pool = {};

	statKeys.forEach(stat => { this.Pool[stat] = {}; });	

	this.get = (id, stat) => { return this.Pool[stat][id]; };

	this.put = (id, stat, {percentage, value}) => {
		percentage = percentage || false;
		this.Pool[stat] = this.Pool[stat] || {};
		this.Pool[stat][id] = {percentage, value};
	};

	this.remove = (id, stat) => { delete this.Pool[stat][id]; };

	this.compute = (stat, statValue) => {
		let ret = 0;
		this.forEach(stat, id => {
			if (id === null) {
				return;
			}
			const {percentage, value} = this.Pool[stat][id];
			const bonus = percentage ? (statValue * value / 100) : value ;

			ret += (bonus || 0);
		});

		return ret;
	};

	this.forEach = (stat, iterator) => {
		if (!this.Pool[stat]) {
			return iterator(null);
		}
		Object.keys(this.Pool[stat]).forEach(iterator);
	};
};

export default StatModifiersSystem;