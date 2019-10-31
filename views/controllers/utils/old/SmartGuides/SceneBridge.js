import SmartLineHor from "./SmartLineHor.js"
import SmartLineVer from "./SmartLineVer.js"

export default function setSmartGuidesTo(scene) {

    scene.smartGuidesX = false
    scene.smartGuidesY = false
    scene.smartGuidesW = false
    scene.smartGuidesH = false

    
    scene.setSmartGuidesX = PIitem => {
        setXEventsOn(PIitem)
        setWidthEventsOn(PIitem)
    }

    scene.setSmartGuidesY = PIitem => {
        setYEventsOn(PIitem)
        setHeightEventsOn(PIitem)
    }
}
    

function setXEventsOn(PIitem) {
    const {scene} = PIitem

    PIitem.addChangeEventOn("x", () => {
        if (scene.smartGuidesX && scene.smartGuidesX.line) {
            scene.smartGuidesX.line.destroy()
        }
        scene.smartGuidesX = false

        scene.forEachGameObject((gameObj => {
            if (gameObj.item.id === PIitem.id) {
                return
            }

            const couple = PIitem.smartGuides.checkXWith(gameObj.item, gameObj.item.smartGuides.points)
            if (couple) {
                const [p1, p2] = couple
                const line = new SmartLineVer(scene, gameObj.item.x + gameObj.item.width * p2.x)
                const orientation = p2.x - p1.x
                scene.smartGuidesX = { line, orientation }
            }
        }))
    })

    PIitem.events.onDragEnd.push(() => {
        if (scene.smartGuidesX && scene.smartGuidesX.line) {
            const {line, orientation} = scene.smartGuidesX
            PIitem.x = line.x - (orientation < 0 ? PIitem.width : 0)
        }
    })
}


function setYEventsOn(PIitem) {
    const {scene} = PIitem

    PIitem.addChangeEventOn("y", () => {
        if (scene.smartGuidesY && scene.smartGuidesY.line) {
            scene.smartGuidesY.line.destroy()
        }
        scene.smartGuidesY = false

        scene.forEachGameObject((gameObj => {
            if (gameObj.item.id === PIitem.id) {
                return
            }

            const couple = PIitem.smartGuides.checkYWith(gameObj.item, gameObj.item.smartGuides.points)
            if (couple) {
                const [p1, p2] = couple
                const line = new SmartLineHor(scene, gameObj.item.y + gameObj.item.height * p2.y)
                const orientation = p2.y - p1.y
                scene.smartGuidesY = { line, orientation }
            }
        }))
    })

    PIitem.events.onDragEnd.push(() => {
        if (scene.smartGuidesY && scene.smartGuidesY.line) {
            const {line, orientation} = scene.smartGuidesY
            PIitem.y = line.y - (orientation < 0 ? PIitem.height : 0)
        }
    })
}


function setWidthEventsOn(PIitem) {
    const {scene} = PIitem

    PIitem.addChangeEventOn("width", () => {
        if (scene.smartGuidesW && scene.smartGuidesW.line) {
            scene.smartGuidesW.line.destroy()
        }
        scene.smartGuidesW = false

        scene.forEachGameObject((gameObj => {
            if (gameObj.item.id === PIitem.id) {
                return
            }

            const couple = PIitem.smartGuides.checkWWith(gameObj.item, gameObj.item.smartGuides.points)
            if (couple) {
                const [p1, p2] = couple
                const line = new SmartLineVer(scene, gameObj.item.x + gameObj.item.width * p2.x)
                const orientation = p2.x - p1.x
                scene.smartGuidesW = { line, orientation }

                const width = Math.abs(PIitem.x - line.x)
                PIitem.width = width
            }
        }))
    })
}


function setHeightEventsOn(PIitem) {
    const {scene} = PIitem

    PIitem.addChangeEventOn("height", () => {
        if (scene.smartGuidesH && scene.smartGuidesH.line) {
            scene.smartGuidesH.line.destroy()
        }
        scene.smartGuidesH = false

        scene.forEachGameObject((gameObj => {
            if (gameObj.item.id === PIitem.id) {
                return
            }

            const couple = PIitem.smartGuides.checkHWith(gameObj.item, gameObj.item.smartGuides.points)

            if (couple) {
                const [p1, p2] = couple
                const line = new SmartLineHor(scene, gameObj.item.y + gameObj.item.height * p2.y)
                const orientation = p2.y - p1.y
                scene.smartGuidesH = { line, orientation }
                
                const height = Math.abs(PIitem.y - line.y)
                PIitem.height = height
            }
        }))
    })
}