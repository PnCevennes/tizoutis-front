import {SERVER} from '@/config'

export default [
    {
        name: 'parents',
        label: 'Groupes',
        type: 'repeated',
        default: [''],
        config: {
            name: 'parents',
            type: 'autocomplete',
            url: SERVER + '/annuaire/entites/',
            urlfilters: '?filter=label',
            property: 'label',
            formatListClbk: (x) => x.fonction === null ? `${x.label}` : `${x.label} (${x.fonction})`,
            errmsg: '',
            default: ''
        }
    },
    {
        name: 'relations',
        label: 'Relations',
        type: 'repeated',
        default: [''],
        config: {
            name: 'relations',
            type: 'autocomplete',
            url: SERVER + '/annuaire/entites/',
            urlfilters: '?filter=label',
            property: 'label',
            formatListClbk: (x) => x.fonction === null ? `${x.label}` : `${x.label} (${x.fonction})`,
            errmsg: '',
            default: ''
        }
    },
    {
        name: 'observations',
        label: 'Observations',
        type: 'text'
    },
    {
        name: 'meta_update_date',
        type: 'hidden'
    },
    {
        name: 'meta_update_user',
        type: 'hidden'
    }
]
