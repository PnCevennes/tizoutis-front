import baseCfg from './baseCfg'
import baseForm from './baseForm'

const config = [{
    label: 'informations',
    fields: [
        {
            name: 'id',
            type: 'hidden'
        },
        {
            name: 'civilite',
            label: 'Civilité',
            type: 'line'
        },
        {
            name: 'nom',
            label: 'Nom',
            type: 'line'
        },
        {
            name: 'prenom',
            label: 'Prénom',
            type: 'line'
        },
        {
            name: 'fonction',
            label: 'Fonction',
            type: 'line'
        },
        {
            name: 'telephone',
            label: 'Téléphone',
            type: 'line'
        },
        {
            name: 'mobile',
            label: 'Téléphone mobile',
            type: 'line'
        },
        {
            name: 'email',
            label: 'Adresse e-mail',
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
        ...baseCfg
    ]
}]

export default {
    name: 'correspondantForm',
    extends: baseForm,
    data () {
        return {config}
    }
}
