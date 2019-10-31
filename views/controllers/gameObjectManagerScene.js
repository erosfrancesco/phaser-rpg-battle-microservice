const __scene_key = "EditObjectScene";


export default class GameObjectsScene extends Phaser.Scene {
    constructor() {
        super({ key: __scene_key })
        this.objects = [];
        this.selectedObject = null
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'views/controllers/plugins/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });

        this.load.scenePlugin({
            key: 'rexdragplugin',
            url: 'views/controllers/plugins/dragplugin.min.js',
            sceneKey: 'rexDrag'
        });
    }


    // Object Manager
    getByIndex(i) {
        return this.objects[i]
    }
    getById(id) {
        return this.objects.find(item => item.id === id)
    }
    getItem(itemExp) {
        return this.objects.find(itemFoo => itemExp(itemFoo))
    }
    addGameObject(item, parent = null, name = "Game Obj. " + this.objects.length) {
        this.objects.push({id: name, item, parent});
        item.id = name  
    }
    remove(i) {
        this.objects.splice(i, 1)
    }
    rename(i, newName) {
        this.objects[i].id = newName
    }
    forEachGameObject(i = (item, index) => {}) { this.objects.forEach((item, index) => i(item, index)) }
}