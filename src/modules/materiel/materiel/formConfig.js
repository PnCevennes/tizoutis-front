import {SERVER} from '@/config'

const MATERIEL_FORMCONFIG = [
    {
        label: 'Matériel',
        fields: [
            {
                name: 'id',
                label: 'ID',
                type: 'hidden'
            },
            {
                name: 'label',
                label: 'Label',
                type: 'line',
                required: true
            },
            {
                name: 'type_mat',
                label: 'Type de matériel',
                type: 'autocomplete',
                url: SERVER + '/materiel/types/search/',
                urlfilters: '',
                property: 'label',
                errmsg: 'type de matériel',
                default: ''
            },
            {
                name: 'reference',
                label: 'N° inventaire/Référence',
                type: 'line',
                required: true
            },
            {
                name: 'disponible',
                label: 'Disponible',
                type: 'bool'
            }
        ]
    },
    {
        label: 'Infos complémentaires',
        fields: [
            {
                name: 'date_entree',
                label: "Date d'entrée dans l'inventaire",
                type: 'date'
            },
            {
                name: 'date_exclusion',
                label: "Date de sortie de l'inventaire",
                type: 'date'
            },
            {
                name: 'etat',
                label: 'État',
                type: 'line'
            },
            {
                name: 'observations',
                label: 'Observations',
                type: 'text'
            }
        ]
    }
]

export {MATERIEL_FORMCONFIG}
