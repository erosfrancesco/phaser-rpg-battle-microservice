const cursorSmartSensibility = 10

export default function setSceneEvents(scene) {


    scene.input.on('gameobjectdown', (pointer, gameObject, event) => {
        scene.currentTapped = gameObject
        scene.selectGameObject(gameObject)

        gameObject.data.dragOffset = {
            x: pointer.downX - gameObject.x,
            y: pointer.downY - gameObject.y
        }

        console.log(gameObject.x, gameObject.width, gameObject.scaleX, gameObject.displayWidth)
    });

    scene.input.on('gameobjectup', (pointer, gameObject, event) => {
        gameObject.data.isResizing = false
        scene.currentTapped = false

        if (gameObject.data.smartGuideX) {
            const {delta, x} = gameObject.data.smartGuideX
            gameObject.x = (x - gameObject.displayWidth / 2) + (delta >= 0) ? 2 * delta : 0
            gameObject.data.smartGuideX.destroy()
            gameObject.data.smartGuideX = false
            // 0, 0.5, 1
        }

        setCursor("auto")
    });
    // scene.input.on('gameobjectmove', (pointer, gameObject, event) => { });
    // scene.input.on('gameobjectover', (pointer, gameObject, event) => { });
    // scene.input.on('gameobjectout', (pointer, gameObject, event) => { });


    scene.input.on('pointerup', pointer => {
        const gameObject = scene.currentTapped
        if (!gameObject) {
            return
        }

        // console.log("ko", gameObject.data)
        setCursor("auto")
        gameObject.data.isResizing = false
        scene.currentTapped = false
    });

    scene.input.on('pointermove', pointer => { 
        const gameObject = scene.currentTapped  
        
        if (!gameObject) {
            return
        }

        const {displayWidth, displayHeight, data} = gameObject
        const deltaX = pointer.x - gameObject.x
        const deltaY = pointer.y - gameObject.y
        data.isResizing = false
        
        // right
        if ( deltaX + cursorSmartSensibility > displayWidth / 2 ) {
            setCursor("col-resize")
            data.isResizing = true
            resizeRight(gameObject, pointer)

            return
        }

        // left
        if ( deltaX - cursorSmartSensibility < -displayWidth / 2 ) {
            setCursor("col-resize")
            data.isResizing = true
            resizeLeft(gameObject, pointer)

            return
        }

        // top
        if ( deltaY - cursorSmartSensibility < -displayHeight / 2 ) {
            setCursor("row-resize")
            data.isResizing = true
            resizeTop(gameObject, pointer)

            return
        }

        // bottom
        if ( deltaY + cursorSmartSensibility > displayHeight / 2 ) {
            setCursor("row-resize")
            data.isResizing = true
            resizeBottom(gameObject, pointer)

            return
        }

        // move
        setCursor("grab")
        move(gameObject, pointer)
    })

    /*
    gameObject.on('pointerdown', function(pointer, localX, localY, event){  });
    gameObject.on('pointerup', function(pointer, localX, localY, event){  });
    gameObject.on('pointermove', function(pointer, localX, localY, event){  });
    gameObject.on('pointerover', function(pointer, localX, localY, event){  });
    gameObject.on('pointerout', function(pointer, event){  });
    */
}


function setCursor(type) {
    window.GameCanvas.style.cursor = type
}


function resizeLeft(gameObject, pointer) {
    const {x, width} = gameObject
    const value = 2 * Math.abs(pointer.x - x) / width
    gameObject.gameObject.scaleX = value
}

function resizeRight(gameObject, pointer) {
    const {x, width} = gameObject
    const value = 2 * Math.abs(pointer.x - x) / width
    gameObject.gameObject.scaleX = value
}

function resizeTop(gameObject, pointer) {
    const {y, height} = gameObject
    const value = 2 * Math.abs(pointer.y - y) / height
    gameObject.gameObject.scaleY = value
}

function resizeBottom(gameObject, pointer) {
    const {y, height} = gameObject
    const value = 2 * Math.abs(pointer.y - y) / height
    gameObject.gameObject.scaleY = value
}

function move(gameObject, pointer) {
    const {x, y} = gameObject.data.dragOffset

    gameObject.gameObject.x = pointer.x - x
    gameObject.gameObject.y = pointer.y - y
}