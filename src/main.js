// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import {AuthMixin} from '@/modules/mixins'
import {User} from '@/modules/login/'

Vue.config.productionTip = false

Vue.filter('format_tel', function (value) {
    if (!value || value.length !== 10) {
        return value
    }
    var out = []
    for (var i = 0; i <= value.length; i += 2) {
        out.push(value.slice(i, i + 2))
    }
    return out.join(' ')
})

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: new User(),
        initialRoute: '',
        loading: false,
        saving: false
    },
    mutations: {
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
            state.initialRoute = route
        }
    },
    getters: {
        isAuth: (state) => {
            return !!state.user.name.length
        },
        isMember: (state) => (groupName) => {
            var grps = []
            if (Array.isArray(groupName)) {
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

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    mixins: [
        AuthMixin
    ]
})
