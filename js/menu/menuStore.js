import MenuBuilder from "./menus/index.js";

export default class MenuManager {
	constructor(scene) {
		this.scene = scene;
		this.menus = [];
		console.log("loaded menu store")
	}

	get selectedMenu() {
		return this.menus[this.length];
	}

	get length() {
		return this.menus.length - 1;
	}

	build(type, ...args) {
		return MenuBuilder[type](this.scene, ...args);
	}

	load(menu) {
		this.menus.push(menu);
	}

	unload() {
		console.log("unloding", this.length);
		this.selectedMenu.destroy();
		this.menus.splice(this.length, 1);
	}

	forEach(iter = function() {}) {
		this.menus.forEach((m, i) => iter(m, i));
	}
}