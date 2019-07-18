import recrutement from './recrutement'

const ROUTE = {
    path: '/recrutement',
    label: 'Recrutement',
    access: [],
    name: 'recrutement',
    component: recrutement,
    props: (route) => ({ query: route.query })
}

export {ROUTE, recrutement}
