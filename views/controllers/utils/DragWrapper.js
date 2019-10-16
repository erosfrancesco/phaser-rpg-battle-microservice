export default function DragWrapper(scene, x = 100, y = 100, w = 100, h = 100, ...childrens) {

    if (!scene) {
        console.error("HEY! Wrapper needs a scene!")
        return
    }

    const background = scene.rexUI.add.roundRectangle(0, 0, w, h, 0, 0xffffff, 0)
    childrens.push(background)
    const wrapper = scene.add.container(x, y, childrens)
    wrapper.onPointerDown = [() => {}]
    wrapper.onDrag = [() => {}]
    wrapper.onDragEnd = [() => {}]
    wrapper.onDragStart = [() => {}]


    background.setInteractive().setOrigin(0, 0)
    background.drag = scene.rexDrag.add(background);
    wrapper.background = background
    wrapper.initialPosition = {x, y};


    background.on('pointerdown', (...args) => wrapper.onPointerDown.forEach(f => f(...args)));
    
    background.on('drag', (...args) => {
        const [p, newX, newY] = args;
        wrapper.x = wrapper.initialPosition.x + newX
        wrapper.y = wrapper.initialPosition.y + newY
        background.x = 0
        background.y = 0
        wrapper.onDrag.forEach(f => f(p, wrapper.x, wrapper.y))
    });
    background.on('dragend', (...args) => {
        const [p] = args;
        wrapper.onDragEnd.forEach(f => f(p, wrapper.x, wrapper.y))
    });
    background.on('dragstart', (...args) => { 
        wrapper.initialPosition = {x: wrapper.x, y: wrapper.y} 
        const [p] = args;
        wrapper.onDragStart.forEach(f => f(p, wrapper.x, wrapper.y))
    });


    wrapper.getColor = () => background.fillColor
    wrapper.setColor = value => { background.fillColor = value }

    wrapper.getOpacity = () => background.fillAlpha
    wrapper.setOpacity = value => { background.fillAlpha = value }

    return wrapper
}