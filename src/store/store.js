import Vue from 'vue'
import Vuex from 'vuex'

import {User} from '@/core/authentification/'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: new User(),
        userToken: '',
        initialRoute: '',
        loading: false,
        saving: false
    },
    mutations: {
        setUserToken (state, token) {
            state.userToken = token
        },
        setUser (state, userData) {
            state.user = userData
        },
        loadingData (state) {
            state.loading = true
        },
        dataLoaded (state) {
            state.loading = false
        },
        savingData (state) {
            state.saving = true
        },
        dataSaved (state) {
            state.saving = false
        },
        setRoute (state, route) {
            if (route.name !== 'login') {
                state.initialRoute = route
            }
        }
    },
    getters: {
        isAuth: (state) => {
            return !!state.user.name.length
        },
        isMember: (state) => (groupName) => {
            var grps = []
            if (Array.isArray(groupName)) {
                if (!groupName.length) {
                    return true
                }
                grps = [...groupName, 'admin-tizoutis']
            } else {
                grps = [groupName, 'admin-tizoutis']
            }
            if (grps.some(grp => grp === '*')) return true
            var res = grps.some(grp => state.user.groups.indexOf(grp) > -1)
            return res
        },
        redirectRoute: (state) => {
            if (state.initialRoute === '' || state.initialRoute.name === 'logout' || state.initialRoute.name === 'login') {
                return {name: 'index'}
            }
            return {name: state.initialRoute.name, query: state.initialRoute.query}
        }
    }
})
