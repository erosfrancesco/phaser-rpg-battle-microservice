export default class SmartGuides {
    constructor(item, points) {
        this.points = points
        this.item = item
    }

    checkXWith(item2, points, radius = 10) { 
        const smartGuidesCouples = this.computeSmartCoupling(points)
        return smartGuidesCouples.find(([p1, p2]) => 
            Math.abs(this.computeXOf(p2, item2) - this.computeXOf(p1, this.item)) < radius 
        )
    }
    checkYWith(item2, points, radius = 10) { 
        const smartGuidesCouples = this.computeSmartCoupling(points)
        return smartGuidesCouples.find(([p1, p2]) => 
            Math.abs(this.computeYOf(p2, item2) - this.computeYOf(p1, this.item)) < radius 
        )
    }

    computeSmartCoupling(points) {
        const smartGuidesCouples = []
        points.forEach(p1 => this.points.forEach(p2 => smartGuidesCouples.push([p1, p2])))
        return smartGuidesCouples
    }

    computeXOf(origin, {x, width}) {
        return x + origin.x * width
    }

    computeYOf(origin, {y, height}) {
        return y + origin.y * height
    }
}
