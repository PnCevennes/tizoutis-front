import annuaire from './annuaire'

const ROUTE = {
    path: '/annuaire',
    label: 'Annuaire',
    access: [],
    name: 'annuaire',
    component: annuaire,
    props: (route) => ({ query: route.query })
}

export {ROUTE, annuaire}
