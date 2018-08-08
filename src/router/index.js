import Vue from 'vue'
import Router from 'vue-router'
import {
    annuaire,
    batiments,
    interventions,
    recrutement,
    supervision,
    Login,
    Logout,
    Err404
} from '@/modules/'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: 'annuaire'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/logout',
            name: 'logout',
            component: Logout
        },
        {
            path: '/annuaire',
            name: 'annuaire',
            component: annuaire,
            props: (route) => ({ query: route.query })
        },
        {
            path: '/recrutement',
            name: 'recrutement',
            component: recrutement,
            props: (route) => ({ query: route.query })
        },
        {
            path: '/interventions',
            name: 'interventions',
            component: interventions,
            props: (route) => ({ query: route.query })
        },
        {
            path: '/batiments',
            name: 'batiments',
            component: batiments,
            props: (route) => ({ query: route.query })
        },
        {
            path: '/supervision',
            name: 'supervision',
            component: supervision,
            props: (route) => ({ query: route.query })
        },
        {
            path: '*',
            name: 'Err',
            component: Err404,
            props: (route) => ({ query: route.query })
        }
    ]
})
