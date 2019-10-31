export default function setOnClick(PIitem) {
    PIitem.item.setInteractive().setOrigin(0, 0).on("pointerdown", () => {
        if (window.currentSelectedItem && window.currentSelectedItem.id === PIitem.id) {
            return
        }
        PIitem.scene.selectItem(PIitem) 
    })
}
