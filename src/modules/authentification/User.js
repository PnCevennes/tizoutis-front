export default class {
    constructor (data) {
        if (data) {
            this.name = data.name
            this.mail = data.mail
            this.groups = data.groups
        } else {
            this.name = ''
            this.mail = ''
            this.groups = []
        }
    }
}
