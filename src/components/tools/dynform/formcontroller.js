class FormController {
    constructor (fieldsets, user) {
        this.fieldsets = fieldsets !== undefined ? fieldsets : []
        this.show_buttons = false
        this.user_is_admin = false
        this.user = user
        this.validators = {}
        this.fieldsets.forEach(fs => {
            fs.fields.forEach(fd => {
                fd.is_hidden = false
                fd.globalConf = this
                this.validators[fd.name] = fd.validators
            })
        })
    }

    validate (key, value) {
        this.validators[key].forEach(validator => {
            if (!validator(value)) return false
        })
        return true
    }
}

export {FormController}
