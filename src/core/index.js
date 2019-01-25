import {Thesaurus} from './thesaurus'
import {AdminAuth} from './authentification'
import {ADMIN_AUTH} from '@/config'

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

if (ADMIN_AUTH) {
    CORE_MODULES.push(
        {
            path: '/users',
            label: 'Utilisateurs',
            access: ['tizoutis-admin'],
            name: 'users',
            component: AdminAuth,
            props: (route) => ({ query: route.query })
        }
    )
}

export {CORE_MODULES}
export {Login, Logout, Auth} from './authentification/'
export {default as Err404} from './err404.vue'
