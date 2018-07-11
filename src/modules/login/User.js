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
    /*
    isAuth (appName) {
        var grps = [appName, 'admin-tizoutis']
        var res = grps.some(grp => this.groups.indexOf(grp) > -1)
        console.log(res)
        return res
    }
    */
}
