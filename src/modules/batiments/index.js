import batiments from './batiments'

const ROUTE = {
    path: '/batiments',
    label: 'Bâtiments',
    access: ['tizoutis-travaux-batiments-admin', 'tizoutis-travaux-batiments-user'],
    name: 'batiments',
    component: batiments,
    props: (route) => ({ query: route.query })
}

export {ROUTE, batiments}
