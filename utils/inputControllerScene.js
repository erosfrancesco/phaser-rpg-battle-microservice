const SCENE_ID = "Game_Input_Controller";
const __keys = {};

export default class GameInputController extends Phaser.Scene {
    
    // phaser scene 
	constructor(...args) {
		super(...args);
        this.keySensibility = 4;
        this.counter = 0;
	}

    create() {
        this.keyboard = this.input.keyboard
        this.delegate = {};
        this.cursors = this.keyboard.createCursorKeys();
        Object.keys(this.cursors).forEach(key => {
            __keys[key] = this.cursors[key];
        });
    }



    static get key() {
        return SCENE_ID
    }

    // delegate
    get delegate() {
        return this._Delegate;
    }

    set delegate({keyCallbacks, allDownCallback}) {
        keyCallbacks = keyCallbacks || {};
        allDownCallback = allDownCallback || function() {}

        Object.keys(keyCallbacks).forEach(key => {
            if (!__keys[key]) {
                const phaserKeyCode = Phaser.Input.Keyboard.KeyCodes[key];
                const phaserKeyObj = this.keyboard.addKey(phaserKeyCode);
                __keys[key] = phaserKeyObj;
                __keys[key].active = true;
            }
        });
        
        this._Delegate = {
            keyCallbacks, 
            allDownCallback
        };
    }

    toggleKey(key, bool) {
        __keys[key].active = (bool === undefined) ? !__keys[key].active : bool;
    }


    // 
    update() { 
        this.counter++;
        this.counter %= this.keySensibility;
        if (!this.counter) {
            this.updateKeys();
        }
    }

    updateKeys() {
        let allAreDown = true;
        const delegate = this.delegate;
        Object.keys(delegate.keyCallbacks).forEach(key => {
            const keyObj = __keys[key];
            if (!(keyObj.active && keyObj.isDown)) { return; }
            
            delegate.keyCallbacks[key]();
            allAreDown = false;
            return;
        });

        if (allAreDown) {
            delegate.allDownCallback();
        }
    }
}
