export default function PIWrapper(scene, x = 100, y = 100, w = 100, h = 100, ...childrens) {

    if (!scene) {
        console.error("HEY! Wrapper needs a scene!")
        return
    }

    const background = scene.rexUI.add.roundRectangle(x, y, w, h, 0, 0xffffff, 0)
    const wrapper = scene.add.container(x, y, childrens)
    wrapper.onPointerDown = () => {}
    wrapper.onDrag = () => {}
    wrapper.onDragEnd = () => {}


    background.setInteractive().setOrigin(0,0)
    background.drag = scene.rexDrag.add(background);
    wrapper.background = background


    background.on('pointerdown', (...args) => wrapper.onPointerDown(...args));
    background.on('drag', (...args) => {
        const [p, newX, newY] = args;
        wrapper.x = newX
        wrapper.y = newY
        wrapper.onDrag(...args)
    });
    background.on('dragend', (...args) =>  wrapper.onDragEnd(...args) );


    wrapper.getColor = () => background.fillColor
    wrapper.setColor = value => { background.fillColor = value }

    wrapper.getOpacity = () => background.alpha
    wrapper.setOpacity = value => { background.alpha = value }

    return wrapper
}