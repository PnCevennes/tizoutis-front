import subventions from './subventions'

const ROUTE = {
    path: '/subventions',
    label: 'Subventions',
    access: [],
    name: 'subventions',
    component: subventions,
    props: (route) => ({ query: route.query })
}

export {ROUTE, subventions}
