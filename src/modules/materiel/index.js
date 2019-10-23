import materiel from './materiel'
import store from '@/store/store'
import typeMaterielStore from './typeMateriel/store'
import materielStore from './materiel/store'
import affectationStore from './affectation/store'

store.registerModule('typeMateriel', typeMaterielStore)
store.registerModule('materiel', materielStore)
store.registerModule('affectationMat', affectationStore)

/*
 * Définition route
 */
const ROUTE = {
    path: '/materiel',
    label: 'Matériel',
    access: [],
    name: 'materiel',
    component: materiel,
    props: (route) => ({ query: route.query })
}

export {ROUTE, materiel}
