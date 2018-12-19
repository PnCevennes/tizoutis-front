import {SERVER} from '@/config'
import {Validators} from '@/components/tools/dynform'

const URLS = {
    login: SERVER + '/auth/login',
    reconnect: SERVER + '/auth/reconnect'
}

var userForm = {
    label: 'Utilisateur',
    fields: [
        {
            name: 'id',
            label: 'ID',
            type: 'hidden'
        },
        {
            name: 'login',
            label: 'Login',
            type: 'line',
            validators: [Validators.minLength(3)],
            errmsg: 'Le login doit comporter au moins 3 caractères'
        },
        {
            name: 'name',
            label: 'Nom complet',
            type: 'line',
            validators: [Validators.minLength(3)],
            errmsg: 'Le nom doit comporter au moins 3 caractères'
        },
        {
            name: 'email',
            label: 'Adresse email',
            type: 'line',
            validators: [Validators.minLength(3)],
            errmsg: "L'adresse email doit comporter au moins 3 caractères"
        },
        {
            name: 'groups',
            label: 'Groupes',
            type: 'checklist',
            choices: []
        }
    ]
}

var userList = {
    selected_id: '',
    limit: 0,
    lineStyle (line) {
        return line.id === parseInt(this.selected_id) ? 'table_selected ' : ''
    },
    fields: [
        {
            name: 'id',
            label: 'ID',
            nofilter: true
        },
        {
            name: 'name',
            label: 'Nom',
            nofilter: true
        }
    ]
}

export {URLS, userForm, userList}
