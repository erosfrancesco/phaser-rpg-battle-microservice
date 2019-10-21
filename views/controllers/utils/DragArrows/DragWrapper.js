export default class DragWrapper extends Phaser.GameObjects.Container {
    constructor(scene, x = 100, y = 100, w = 100, h = 100, ...childrens) {

        if (!scene) {
            console.error("HEY! Wrapper needs a scene!")
            return
        }

        const background = scene.rexUI.add.roundRectangle(0, 0, w, h, 0, 0xffffff, 0)
        childrens.push(background)
        super(scene, x, y, childrens)
        scene.add.existing(this)

        this.onPointerDown = [() => {}]
        this.onDrag = [() => {}]
        this.onDragEnd = [() => {}]
        this.onDragStart = [() => {}]
        this.background = background
        this.initialPosition = {x, y};

        background.setInteractive().setOrigin(0, 0)
        background.drag = scene.rexDrag.add(background);

        background.on('drag', (...args) => {
            const [p, newX, newY] = args;
            this.x = this.initialPosition.x + newX
            this.y = this.initialPosition.y + newY
            background.x = 0
            background.y = 0
            this.onDrag.forEach(f => f(p, this.x, this.y))
        });
        background.on('dragend', (...args) => {
            const [p] = args;
            this.onDragEnd.forEach(f => f(p, this.x, this.y))
        });
        background.on('dragstart', (...args) => { 
            this.initialPosition = {x: this.x, y: this.y} 
            const [p] = args;
            this.onDragStart.forEach(f => f(p, this.x, this.y))
        });
    }


    get color() { return this.background.fillColor }
    set color(value) { this.background.fillColor = value }

    get opacity() { return this.background.fillAlpha }
    set opacity(value) { this.background.fillAlpha = value }

    get width() { return this.background.width }
    set width(va) { this.background.width = va }

    get height() { return this.background.height }
    set height(va) { this.background.height = va }
}
