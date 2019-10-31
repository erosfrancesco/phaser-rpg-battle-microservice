export default class SmartGuides {
    constructor(item, points) {
        this.points = points
        this.item = item
    }

    checkXWith(item2, points, radius = 10) { 
        const smartGuidesCouples = this.computeSmartCoupling(points)
         
        const couple = smartGuidesCouples.find(([p1, p2]) => 
            Math.abs(this.computeXOf(p2, item2) - this.computeXOf(p1, this.item)) < radius 
        )
        // console.log(couple, this.item, item2)

        return couple
    }
    checkYWith(item2, points, radius = 10) { 
        const smartGuidesCouples = this.computeSmartCoupling(points)
        return smartGuidesCouples.find(([p1, p2]) => 
            Math.abs(this.computeYOf(p2, item2) - this.computeYOf(p1, this.item)) < radius 
        )
    }
    checkWWith(item2, points, radius = 10) { 
        const {width} = this.item
        const smartGuidesCouples = this.computeSmartCoupling(points)
        return smartGuidesCouples.find(([p1, p2]) => 
            Math.abs(this.computeXOf(p2, item2) - (this.computeXOf(p1, this.item) + width)) < radius 
        )
    }
    checkHWith(item2, points, radius = 10) { 
        const {height} = this.item
        const smartGuidesCouples = this.computeSmartCoupling(points)
        return smartGuidesCouples.find(([p1, p2]) => 
            Math.abs(this.computeYOf(p2, item2) - (this.computeYOf(p1, this.item) + height)) < radius 
        )
    }


    computeSmartCoupling(points) {
        const smartGuidesCouples = []
        points.forEach(p1 => this.points.forEach(p2 => smartGuidesCouples.push([p1, p2])))
        return smartGuidesCouples
    }

    computeXOf(origin, {x, width, displayItem}) {
        console.log(displayItem)
        return x + origin.x * width
    }

    computeYOf(origin, {y, height}) {
        return y + origin.y * height
    }
}
