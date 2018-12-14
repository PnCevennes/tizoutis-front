export default class {
    constructor (data) {
        if (data) {
            this.id = data.id
            this.name = data.name
            this.mail = data.mail
            this.groups = data.groups
        } else {
            this.id = ''
            this.name = ''
            this.mail = ''
            this.groups = []
        }
    }
}
