export default class IdTracker {
    constructor() {
        this.id = 0
    }
    generateUniqueId() {
        const oldId = this.id
        this.id = this.id + 1
        return oldId
    }
}
