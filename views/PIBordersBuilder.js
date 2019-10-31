export default class PIBordersBuilder {
    constructor(item) {

        const size = 25
        const {x, y, displayWidth, displayHeight, scene} = item
        this.sizer = scene.rexUI.add.sizer(x, y, displayWidth, displayHeight, { orientation: 1 })
        this.sizer.setData("item", item)

        
        const up = this.buildRow(0, size)
        const middle = this.buildRow(size, displayHeight - size * 2)
        const bottom = this.buildRow(displayHeight - size, size)
        this.sizer.layout();


        const ul = this.buildCell(up, 0, size, (p, dragX, dragY) => {
            this.resizeXByDrag(dragX)
            this.resizeYByDrag(dragY)
            this.draw()
        })
        const uc = this.buildCell(up, size, displayWidth - size * 2, (p, dragX, dragY) => {
            this.resizeYByDrag(dragY)
            this.draw()  
        })
        const ur = this.buildCell(up, displayWidth - size, size, (p, dragX, dragY) => {
            this.resizeXByDrag(dragX)
            this.resizeYByDrag(dragY)
            this.draw()
        })
        
        const cl = this.buildCell(middle, 0, size, (p, dragX, dragY) => {
            this.resizeXByDrag(dragX)
            this.draw()  
        })
        const cc = this.buildCell(middle, size, displayWidth - size * 2, (p, dragX, dragY) => {
            this.position = {x: dragX, y: dragY}
            this.draw()
        });
        const cr = this.buildCell(middle, displayWidth - size, size, (p, dragX, dragY) => {
            this.resizeXByDrag(dragX)
            this.draw()  
        })

        const bl = this.buildCell(bottom, 0, size, (p, dragX, dragY) => {
            this.resizeXByDrag(dragX)
            this.resizeYByDrag(dragY)
            this.draw()  
        })
        const bc = this.buildCell(bottom, size, displayWidth - size * 2, (p, dragX, dragY) => {
            this.resizeYByDrag(dragY)
            this.draw()  
        })
        const br = this.buildCell(bottom, displayWidth - size, size, (p, dragX, dragY) => {
            this.resizeXByDrag(dragX)
            this.resizeYByDrag(dragY)
            this.draw()  
        })
        
        this.sizer.layout();
        this.sizer.graphics = scene.add.graphics()
        this.draw()

        return this.sizer;
    }

    //
    buildRow(y, height) {
        const row = this.sizer.scene.rexUI.add.sizer(0, y, this.sizer.width, height, { orientation: 0 })
        this.sizer.add(row)

        return row
    }
    buildCell(parent, x, width, interaction = false, expand = false) {
        const {displayHeight} = parent

        const cell = this.sizer.scene.rexUI.add.sizer(x, 0, width, displayHeight)
        parent.add(cell, undefined, undefined, undefined, expand)
        // cell.data = {}

        if (!interaction) {
            return cell
        }

        cell.dragPluginEnabled = this.sizer.scene.rexDrag.add(cell);
        cell.on('drag', interaction);

        return cell
    } 


    //
    resizeXByDrag(dragX) {
        this.width = Math.abs(dragX - this.sizer.x)
    }
    resizeYByDrag(dragY) {
        this.height = Math.abs(dragY - this.sizer.y)
    }
    draw() {
        this.sizer.graphics.clear()
        this.sizer.drawBounds(this.sizer.graphics, 0xaaaa55);
    }


    //
    get width() {
        return this.sizer.scaleX
    }
    set width(v) {
        this.sizer.scaleX = v / this.sizer.width * 2 
        this.sizer.getData("item").width = this.sizer.displayWidth
    }
    get height() {
        return this.sizer.scaleX
    }
    set height(v) {
        this.sizer.scaleY = v / this.sizer.height * 2 
        this.sizer.getData("item").height = this.sizer.displayHeight
    }
    set position({x, y}) {
        this.sizer.x = x
        this.sizer.getData("item").x = x
        this.sizer.y = y
        this.sizer.getData("item").y = y
    }
}