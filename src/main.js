// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import {URLS, User} from '@/modules/login/'

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
        user: new User()
    },
    mutations: {
        setUser (state, userData) {
            state.user = userData
        }
    },
    getters: {
        isAuth: (state) => (groupName) => {
            var grps = [groupName, 'admin-tizoutis']
            var res = grps.some(grp => state.user.groups.indexOf(grp) > -1)
            return res
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
    mounted () {
        var loginData = window.sessionStorage.getItem('tizoutis-login')
        if (loginData) {
            axios.post(URLS.login, JSON.parse(loginData)).then((res) => {
                store.commit('setUser', new User(res.data))
            }).catch((err) => {
                console.error(err)
            })
        } else {
            this.$router.push('login')
        }
    }
})
