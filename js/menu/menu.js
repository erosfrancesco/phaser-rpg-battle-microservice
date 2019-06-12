export default class Menu extends Phaser.GameObjects.Container {

    constructor(x, y, width, height, scene) {
        super(scene);
        scene.add.existing(this);

        //
        this.menuItems = [];
        this.menuItemIndex = 0;

        //
        this.x = x;
        this.y = y;
        this.depth = 100001;
        this.width = width;
        this.height = height;
    }


    get selectedItem() {
        return this.menuItems[this.menuItemIndex];
    }

    set menuItemIndex(v) {

        v = (v < 0) ? this.menuItems.length - 1 : v;
        v = (v >= this.menuItems.length) ? 0 : v;

        this._menuItemIndex = v;
    }

    get menuItemIndex() {
        return this._menuItemIndex;
    }


    addMenuItem(menuItemGen = {}) {
        
        menuItemGen.active = !menuItemGen.inactive;
        menuItemGen.text = menuItemGen.label;

        const menuItem = this.scene.stores.BattleObjects.create("ActivableMenuItem", menuItemGen);

        menuItem.data.item.data.item.data.text.depth = 100001;

        this.computeItemPosition(menuItem);
        
        this.menuItems.push(menuItem);
        this.add(menuItem.data.item.data.item.data.text);

        menuItem.deselect();
        /*
        menuItem.onDrag = (isGoingDown, isGoingLeft) => {
            if(isGoingDown) {
                this.moveSelectionUp();
            } else {
                this.moveSelectionDown();
            }
        }
        /**/

        return menuItem;
    }

    computeItemPosition(menuItem) {
        this.foooMenuItemPositionY = 0;
        this.menuItems.forEach(i => { 
            this.foooMenuItemPositionY += i.data.item.data.item.data.text.height; 
        });
        menuItem.setOrigin(0.5);
        let {x, y} = menuItem.getPosition();
        x += (this.width) / 2;
        y += this.foooMenuItemPositionY + (32 + 8 + 8) / 2;
        menuItem.setPosition({x, y});
    }


    moveSelectionUp() {
        this.selectedItem.deselect();
        this.menuItemIndex--;
        
        while (!this.selectedItem.itemIsActive) {
            this.menuItemIndex--;
        }

        this.selectedItem.select();
    }

    moveSelectionDown() {
        this.selectedItem.deselect();
        this.menuItemIndex++;

        while (!this.selectedItem.itemIsActive) {
            this.menuItemIndex++;
        }

        this.selectedItem.select();
    }

    clear() {
        this.menuItems.forEach(menuItem => menuItem.destroy());
        this.menuItems = [];
        this.menuItemIndex = 0;
    }

    remap(menuItems) {
        this.clear();
        menuItems.forEach(menuItem => this.addMenuItem(menuItem));
    }
}