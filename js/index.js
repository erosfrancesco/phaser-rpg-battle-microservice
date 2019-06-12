import BatteScene from "./battle.js";
import Game from "../utils/index.js";

//import menuStore from "../js/uniquemenus/menus.js";
import FightMenuWrapper from "../js/menu/menus/fightMenuWrapper.js";


export default class BattleWrapper extends BatteScene {
	constructor(...args) {
		super(...args);
	}

	init(...args) {
		super.init(...args);


		const keyCallbacks = {
			"UP": () => {
				
				const menu = this.Menus.selectedMenu;
				if (!(menu && menu.moveSelectionUp)) {
					return;
				}
				menu.moveSelectionUp();
				/**/
			},
			"DOWN": () => {
				
				const menu = this.Menus.selectedMenu;
				if (!(menu && menu.moveSelectionDown)) {
					return;
				}

				menu.moveSelectionDown();
				/**/
			},
			"A": () => {
				
				const menu = this.Menus.selectedMenu;
				if (!(menu && menu.selectedItem)) {
					return;
				}
				menu.selectedItem.actionWhenActive();
				// SHOULD DISABLE THE A BUTTON
			},
			"S": () => {
				
				const menu = this.Menus.selectedMenu;
				if (!(menu && this.Menus.length > 1)) {
					return;
				}
				this.Menus.unload();
			},
			"P": () => {
				if (this.isPausingTransitionActive) {
					return;
				}
				this.isPausingTransitionActive = true;
				this.togglePause(() => {
					this.isPausingTransitionActive = false;
				});
			}
		};

		Game.scene.scenes[0].delegate = {keyCallbacks};
	}

	create(...args) {
		super.create(...args);
	}

	update() {
		super.update();
	}

	togglePause(callback) {
		setTimeout(callback, 1000);
		this.isPaused = !this.isPaused;
		this.isPaused ? this.pauseBattle() : this.resumeBattle()
	}

	pauseBattle() {
		this.pause();
	}

	resumeBattle() {
		this.resume();
	}

	buildDiv() {}

};