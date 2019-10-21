export default class ObservableProperties {
    constructor() {
        this.events = {}
    }

    addChangeEventOn (prop, callback) {
        this.events[prop] = this.events[prop] || {}
        const index = Object.keys(this.events[prop]).length
        this.events[prop][index] = callback
        return index
    }

    removeChangeEventOn (prop, index) {
        this.events[prop][index] = false
    }

    modifyProperty (prop, newValue) {
        this.observablePath[prop] = newValue
        if (this.events[prop]) {
            Object.keys(this.events[prop]).forEach(index => {
                if (this.events[prop][index]) {
                    this.events[prop][index](newValue, this.item)
                }
            })
        }
    }

    get observablePath() {
        return this
    }
}