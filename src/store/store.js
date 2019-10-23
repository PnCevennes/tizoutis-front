import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import {SERVER} from '@/config'
import {User} from '@/core/authentification/'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        serverURL: SERVER,
        user: new User(),
        userToken: '',
        initialRoute: '',
        acceptedGroups: [],
        loading: false,
        saving: false,
        _http: null
    },
    mutations: {
        setUserToken (state, token) {
            state.userToken = token
            state._http = axios.create({
                baseURL: state.serverURL,
                headers: {token: state.userToken}
            })
        },
        setUser (state, userData) {
            state.user = userData
        },
        setAcceptedGroups (state, groups) {
            state.acceptedGroups = groups
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
            if (route.name !== 'login' && route.name !== 'logout') {
                state.initialRoute = route
            }
        }
    },
    getters: {
        httpInstance: (state) => {
            if (!state._http) {
                state._http = axios.create({
                    baseURL: state.serverURL,
                    headers: {token: state.userToken}
                })
            }
            return state._http
        },
        isAuth: (state) => {
            return !!state.user.id
        },
        isMember: (state) => (groupName) => {
            if (!state.user.id) return false
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
