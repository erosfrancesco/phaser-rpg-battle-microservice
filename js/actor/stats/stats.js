const StatSystem = (stats = {}) => {
	this.Stats = {};
	this.StatModifiers = {};

	Object.keys(stats).forEach(stat => {
		this.Stats[stat] = Number( stats[stat] );
		this.StatModifiers[stat] = {};
	});	

	this.checkStat = name => {
		if (!name) {
			// console debug
			console.log("Gimme a stat!")
			return null;
		}

		const stat = this.Stats[name];
		if ( (!stat) && (stat !== 0)) {
			// console debug
			console.log("Could not find the stat: ", name);
			return null;
		}
		return stat;
	}

	this.getStat = stat => {
		let statValue = this.checkStat(stat);
		if (statValue === null) {
			console.log("Could not find the stat: ", stat);
			return null;
		}

		Object.keys(this.StatModifiers[stat]).forEach(id => {
			const {percentage, value} = this.StatModifiers[stat][id];
			const bonus = percentage ? (statValue * value / 100) : value ;

			statValue += (bonus || 0);
		});
		return (statValue < 0) ? 0 : statValue;
	}


	this.getStatModifier = (id, stat) => {
		const check = this.checkStat(stat);
		if ((!check) && (check !== 0)) {
			// console debug
			console.log("Could not get stat modifier: ", id);
			return;
		}
		return this.StatModifiers[stat][id];
	}

	this.putStatModifier = (id, stat, {percentage, value}) => {
		const check = this.checkStat(stat);
		if ((!check) && (check !== 0)) {
			// console debug
			console.log("Could not put stat modifier: ", id);
			return;
		}
		this.StatModifiers[stat] = this.StatModifiers[stat] || {};
		this.StatModifiers[stat][id] = value;
	}

	this.removeStatModifier = (id, stat) => {
		delete this.StatModifiers[stat][id];
	}
};


/*
export default class StatSystem {
	constructor(stats = {}) {

		this.Stats = {};
		this.StatModifiers = {};

		Object.keys(stats).forEach(stat => {
			this.Stats[stat] = Number( stats[stat] );
			this.StatModifiers[stat] = {};
		});
	}

	checkStat(name = false) {
		if (!name) {
			// console debug
			console.log("Gimme a stat!")
			return false;
		}

		const stat = this.Stats[name];
		if ( (!stat) && (stat !== 0)) {
			// console debug
			console.log("Could not find the stat: ", name);
			return false;
		}
		return stat;
	}

	getStat(stat) {
		let statValue = this.checkStat(stat);

		Object.keys(this.StatModifiers[stat]).forEach(id => {
			const {percentage, value} = this.StatModifiers[stat][id];
			const bonus = percentage ? (statValue * value / 100) : value ;

			statValue += (bonus || 0);
		});
		return (statValue < 0) ? 0 : statValue;
	}


	getStatModifier(id, stat) {
		const check = this.checkStat(stat);
		if ((!check) && (check !== 0)) {
			// console debug
			console.log("Could not get stat modifier: ", id);
			return;
		}
		return this.StatModifiers[stat][id];
	}

	putStatModifier(id, stat, {percentage, value}) {
		const check = this.checkStat(stat);
		if ((!check) && (check !== 0)) {
			// console debug
			console.log("Could not put stat modifier: ", id);
			return;
		}
		this.StatModifiers[stat] = this.StatModifiers[stat] || {};
		this.StatModifiers[stat][id] = value;
	}

	removeStatModifier(id, stat) {
		delete this.StatModifiers[stat][id];
	}
}
/**/