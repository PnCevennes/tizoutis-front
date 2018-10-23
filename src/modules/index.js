import {annuaire} from './annuaire'
import {batiments} from './batiments/'
import {interventions} from './interventions/'
import {recrutement} from './recrutement/'
import {supervision} from './supervision/'
import {Thesaurus} from './thesaurus'

const MODULES = [
    {
        path: '/annuaire',
        label: 'Annuaire',
        access: [],
        name: 'annuaire',
        component: annuaire,
        props: (route) => ({ query: route.query })
    },
    {
        path: '/recrutement',
        label: 'Recrutement',
        access: [],
        name: 'recrutement',
        component: recrutement,
        props: (route) => ({ query: route.query })
    },
    {
        path: '/interventions',
        label: 'Interventions',
        access: [],
        name: 'interventions',
        component: interventions,
        props: (route) => ({ query: route.query })
    },
    {
        path: '/batiments',
        label: 'Bâtiments',
        access: ['tizoutis-travaux-batiments-admin', 'tizoutis-travaux-batiments-user'],
        name: 'batiments',
        component: batiments,
        props: (route) => ({ query: route.query })
    },
    {
        path: '/supervision',
        label: 'Supervision',
        access: ['tizoutis-supervision'],
        name: 'supervision',
        component: supervision,
        props: (route) => ({ query: route.query })
    },
    {
        path: '/thesaurus',
        label: 'Thésaurus',
        access: ['tizoutis-admin'],
        name: 'thesaurus',
        component: Thesaurus,
        props: (route) => ({ query: route.query })
    }
]

export {MODULES}
export {Login, Logout} from './authentification/'
export {default as Err404} from './err404.vue'
