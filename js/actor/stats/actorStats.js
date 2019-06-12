import Modifiers from "./modifiers.js";

function StatSystem(stats = {}) {
	const statKeys = Object.keys(stats);

	this.Stats = {};
	this.Modifiers = new Modifiers(statKeys);

	statKeys.forEach(stat => {
		this.Stats[stat] = Number( stats[stat] );
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

		statValue += this.Modifiers.compute(stat, statValue);

		return (statValue < 0) ? 0 : statValue;
	}

};

export default StatSystem;