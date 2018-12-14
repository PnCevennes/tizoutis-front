import {Thesaurus} from './thesaurus'

const CORE_MODULES = [
    {
        path: '/thesaurus',
        label: 'Thésaurus',
        access: ['tizoutis-admin'],
        name: 'thesaurus',
        component: Thesaurus,
        props: (route) => ({ query: route.query })
    }
]

export {CORE_MODULES}
export {Login, Logout} from './authentification/'
export {default as Err404} from './err404.vue'
