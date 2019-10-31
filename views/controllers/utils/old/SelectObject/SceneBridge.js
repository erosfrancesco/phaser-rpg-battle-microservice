export default function setSelectFunctionalityTo(scene) {
    scene.selectItem = PIitem => {
        if (window.currentSelectedItem) {
            scene.removeSelectedItem()
        }

        scene.setSelectedItem(PIitem)
    }

    scene.setSelectedItem = PIitem => {
        PIitem.showArrows()
        window.currentSelectedItem = PIitem
        window.ItemProperties.update()
    }

    scene.removeSelectedItem = () => {
        const selected = window.currentSelectedItem

        Object.keys(selected.selectedOldPointers).forEach(key => {
            const index = selected.selectedOldPointers[key]
            selected.removeChangeEventOn(key, index)
        })
        selected.selectedOldPointers = false

        if (scene.smartGuidesX.line) {
            scene.smartGuidesX.line.destroy()
        }
        if (scene.smartGuidesY.line) {
            scene.smartGuidesY.line.destroy()
        }

        if (scene.smartGuidesW.line) {
            scene.smartGuidesW.line.destroy()
        }

        if (scene.smartGuidesH.line) {
            scene.smartGuidesH.line.destroy()
        }

        selected.deselect()
        
        window.currentSelectedItem = false
        window.ItemProperties.innerHTML = ""
    }

    scene.objectAtPosition = (x, y) =>  scene.getItem(({item}) =>
        (item.x < x && (item.x + item.width) > x) && (item.y < y && (item.y + item.height) > y)
    )
    
    // scene.input.on('pointerdown', pointer => {
    //     const {x, y} = pointer
        
    //     if (window.currentSelectedItem && (!scene.objectAtPosition(x, y)) ) {
    //         scene.removeSelectedItem()
    //     }
    // });
}