import Vue from 'vue'
import Router from 'vue-router'
import {
    Login,
    Logout,
    Err404
} from '@/core/'
import {CORE_MODULES} from '@/core'
import {MODULES} from '@/modules'

Vue.use(Router)

const defaultRoutes = [
    {
        path: '/',
        name: 'index',
        redirect: 'annuaire'
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        props: (route) => ({ query: route.query })
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout
    },
    {
        path: '*',
        name: 'Err',
        component: Err404,
        props: (route) => ({ query: route.query })
    }
]

export default new Router({
    routes: [...defaultRoutes, ...MODULES, ...CORE_MODULES]
})
