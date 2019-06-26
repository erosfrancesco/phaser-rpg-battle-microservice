import Queue from "./utils/queue.js"


function MenuController(scene) {
	this.menus = new Queue()
	console.log("loaded menu store")

	this.selectedMenu = () => this.menus.first()
	this.length       = () => this.menus.length();
	this.load         = menu => this.menus.add(menu);
	this.unload       = () => this.menus.remove();
}

export default MenuController



// export default class MenuManager {
// 	constructor(scene) {
// 		this.scene = scene;
// 		this.menus = [];
// 		console.log("loaded menu store")
// 	}

// 	get selectedMenu() {
// 		return this.menus[this.length];
// 	}

// 	get length() {
// 		return this.menus.length - 1;
// 	}

// 	// TO REDO
// 	// build(type, ...args) {
// 	// 	return MenuBuilder[type](this.scene, ...args);
// 	// }

// 	load(menu) {
// 		this.menus.push(menu);
// 	}

// 	unload() {
// 		this.selectedMenu.destroy();
// 		this.menus.splice(this.length, 1);
// 	}

// 	forEach(iter = function() {}) {
// 		this.menus.forEach((m, i) => iter(m, i));
// 	}
// }