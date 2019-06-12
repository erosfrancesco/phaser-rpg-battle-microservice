import MenuFight from "./fightMenuWrapper.js";
import MenuTarget from "./targetMenuWrapper.js";
import MenuMagic from "./magicMenuWrapper.js";

export default {
	"Fight":   (...args) => { return new MenuFight(...args); },
	"Targets": (...args) => { return new MenuTarget(...args); },
	"Magic":   (...args) => { return new MenuMagic(...args); }
};