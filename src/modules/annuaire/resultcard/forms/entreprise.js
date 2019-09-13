import baseForm from './baseForm'
import baseCfg from './baseCfg'

const config = [{
    label: 'informations',
    fields: [
        {
            name: 'id',
            type: 'hidden'
        },
        {
            name: 'nom',
            label: 'Nom',
            type: 'line'
        },
        {
            name: 'adresse',
            label: 'Adresse',
            type: 'line'
        },
        {
            name: 'adresse2',
            label: 'Adresse suite',
            type: 'line'
        },
        {
            name: 'code_postal',
            label: 'Code postal',
            type: 'line'
        },
        {
            name: 'nom_gerant',
            label: 'Nom gérant',
            type: 'line'
        },
        {
            name: 'prenom_gerant',
            label: 'Prénom gérant',
            type: 'line'
        },
        {
            name: 'telephone',
            label: 'Téléphone',
            type: 'line'
        },
        {
            name: 'telephone2',
            label: 'Téléphone 2',
            type: 'line'
        },
        {
            name: 'email',
            label: 'Adresse e-mail',
            type: 'line'
        },
        {
            name: 'alt_email',
            label: 'Autre e-mail',
            type: 'line'
        },
        {
            name: 'site_internet',
            label: 'Site internet',
            type: 'line'
        },
        ...baseCfg
    ]
}]

export default {
    name: 'entrepriseForm',
    extends: baseForm,
    data () {
        return {config}
    }
}
