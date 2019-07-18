import supervision from './supervision'

const ROUTE = {
    path: '/supervision',
    label: 'Supervision',
    access: ['tizoutis-supervision'],
    name: 'supervision',
    component: supervision,
    props: (route) => ({ query: route.query })
}

export {ROUTE, supervision}
