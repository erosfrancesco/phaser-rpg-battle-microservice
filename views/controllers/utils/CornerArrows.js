import PIWrapper from './PIWrapper.js'

export default class CornerArrows {

        constructor(scene, parent) {
            if (!scene) {
                console.error("HEY! CornerArrows needs a scene!")
                return
            }

            if (!parent) {
                console.error("HEY! CornerArrows needs a parent!")
                return
            }

            const {x, y, width, height} = parent.item
            this.parent = parent
            this.delta = 10
            const w = 13
            const h = 13
            const c = 0xfff

            const tlHor = scene.add.line(0, 0, 0, 0, w, 0, c).setOrigin(0, 0)
            const tlVer = scene.add.line(0, 0, 0, 0, 0, h, c).setOrigin(0, 0)
            this.topLeft = new PIWrapper(scene, 0, 0, w, h, tlHor, tlVer)

            const trHor = scene.add.line(0, 0, 0, 0, w, 0, c).setOrigin(0, 0)
            const trVer = scene.add.line(w, 0, 0, 0, 0, h, c).setOrigin(0, 0)
            this.topRight = new PIWrapper(scene, 0, 0, w, h, trHor, trVer)

            const dlHor = scene.add.line(0, h, 0, 0, w, 0, c).setOrigin(0, 1)
            const dlVer = scene.add.line(0, h, 0, 0, 0, h, c).setOrigin(0, 1)
            this.downLeft = new PIWrapper(scene, 0, 0, w, h, dlHor, dlVer)
            
            const drHor = scene.add.line(0, h, 0, 0, w, 0, c).setOrigin(0, 0)
            const drVer = scene.add.line(w, 0, 0, 0, 0, h, c).setOrigin(0, 0)
            this.downRight = new PIWrapper(scene, 0, 0, w, h, drHor, drVer)


            this.setCornerArrowTouch(this.topLeft, (x, y) => this.topLeftDragComputation(x, y))
            this.setCornerArrowTouch(this.topRight, (x, y) => this.topRightDragComputation(x, y))
            this.setCornerArrowTouch(this.downLeft, (x, y) => this.downLeftDragComputation(x, y))
            this.setCornerArrowTouch(this.downRight, (x, y) => this.downRightDragComputation(x, y))

            this.alignToParent()
        }

        setCornerArrowTouch(corner, computation = (fooX, fooY) => { return {} }) {
            corner.onDrag.push( (p, x, y) => {
                if (!this.oldX) {
                    this.oldX = this.parent.item.x
                    this.oldY = this.parent.item.y
                    this.oldW = this.parent.item.width
                    this.oldH = this.parent.item.height
                }

                const {newW, newH, newX, newY} = computation(x, y)

                this.parent.modifyProperty("x", newX)
                this.parent.modifyProperty("y", newY)
                this.parent.modifyProperty("width", newW)
                this.parent.modifyProperty("height", newH)

                // move the other arrows
                this.alignToParent()
            })

            corner.onDragEnd.push( () => {
                this.oldX = null
                this.oldY = null
                this.oldW = null
                this.oldH = null
            })
        }

        topLeftDragComputation(x, y) {
            const newW = (this.oldW / 2) + (this.oldX - x) - this.delta
            const newH = (this.oldH / 2) + (this.oldY - y) - this.delta
            const newX = x + this.delta + newW / 2
            const newY = y + this.delta + newH / 2

            return {newX, newY, newH, newW}
        }

        topRightDragComputation(x, y) {
            const newW = (this.oldW / 2) - (this.oldX - x)
            const newH = (this.oldH / 2) + (this.oldY - y) - this.delta
            const newX = x - newW / 2
            const newY = y + this.delta + newH / 2

            return {newX, newY, newH, newW}
        }

        downLeftDragComputation(x, y) {
            const newW = (this.oldW / 2) + (this.oldX - x) - this.delta
            const newH = (this.oldH / 2) - (this.oldY - y)
            const newX = x + this.delta + newW / 2
            const newY = y - newH / 2

            return {newX, newY, newH, newW}
        }

        downRightDragComputation(x, y) {
            const newW = (this.oldW / 2) - (this.oldX - x)
            const newH = (this.oldH / 2) - (this.oldY - y)
            const newX = x - newW / 2
            const newY = y - newH / 2

            return {newX, newY, newH, newW}
        }

        alignToParent() {
            const {x, y, width, height} = this.parent.item
            const w = 13
            const h = 13

            this.topLeft.x = x - this.delta - width / 2
            this.topLeft.y = y - this.delta - height / 2

            this.topRight.x = x - w + this.delta + width / 2
            this.topRight.y = y - this.delta - height / 2

            this.downLeft.x = x - this.delta - width / 2
            this.downLeft.y = y - h + this.delta + height / 2

            this.downRight.x = x - w + this.delta + width / 2
            this.downRight.y = y - h + this.delta + height / 2
        }
    }