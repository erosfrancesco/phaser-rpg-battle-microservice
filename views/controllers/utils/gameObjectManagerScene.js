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
    getItem(item) {
        return this.objects.find(itemFoo => itemFoo === item)
    }
    add(item, name = "Game Obj. " + this.objects.length, parent = null) {
        this.objects.push({id: name, item, parent});
        
        item.drag = this.rexDrag.add(item);
        item.on('pointerdown', item.drag.dragend, () => {
            item.drag();
            this.dragging(item)
        });
        item.on('dragend', () => this.releaseObject(item) );
        item.on('pointerdown', (...args) => {
            this.selectedObject = item
            item.onClick(...args)
        })
    }
    remove(i) {
        this.objects.splice(i, 1)
    }
    rename(i, newName) {
        this.objects[i].id = newName
    }

    // Drag Manager
    dragging(object) {

    }
    releaseObject(object) {
        // check if object overlaps with another
        // and add to a parent if necessary
    }
}