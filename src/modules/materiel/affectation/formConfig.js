import {SERVER} from '@/config'

const FORMCONFIG = [{
    label: 'Affectation',
    fields: [
        {
            name: 'id',
            type: 'hidden'
        },
        {
            name: 'id_materiel',
            type: 'hidden'
        },
        {
            name: 'type_affectation',
            label: "Type d'affectation",
            type: 'select',
            choices: [
                {value: 1, label: 'Temporaire'},
                {value: 2, label: 'Permanente'}
            ]
        },
        {
            name: 'utilisateur',
            label: 'Utilisateur',
            type: 'autocomplete',
            url: SERVER + '/annuaire/entites/',
            urlfilters: '?type=correspondant&result=label&col=label&filter=label',
            errmsg: "Nom de l'utilisateur",
            required: true
        },
        {
            name: 'date_affectation',
            label: "Date d'affectation",
            type: 'date',
            required: true
        },
        {
            name: 'date_retour',
            label: 'Date de retour',
            type: 'date'
        },
        {
            name: 'observations',
            label: 'Observations',
            type: 'text'
        }
    ]
}]

export {FORMCONFIG}
