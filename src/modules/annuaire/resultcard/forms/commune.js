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
            name: 'telephone',
            label: 'Téléphone',
            type: 'line'
        },
        {
            name: 'email',
            label: 'Adresse e-mail',
            type: 'line'
        },
        {
            name: 'site_internet',
            label: 'Site internet',
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
    name: 'communeForm',
    extends: baseForm,
    data () {
        return {config}
    }
}
