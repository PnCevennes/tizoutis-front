import interventions from './interventions'

const ROUTE = {
    path: '/interventions',
    label: 'Interventions',
    access: [],
    name: 'interventions',
    component: interventions,
    props: (route) => ({ query: route.query })
}

export {ROUTE, interventions}
