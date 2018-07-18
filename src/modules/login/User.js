export default class {
    constructor (data) {
        if (data) {
            this.name = data.name
            this.groups = data.groups
        } else {
            this.name = ''
            this.groups = []
        }
    }
}
