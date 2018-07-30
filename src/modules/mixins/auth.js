import axios from 'axios'
import {URLS, User} from '@/modules/login'

export default {
    mounted () {
        if (!this.$store.getters.isAuth) {
            var loginData = window.sessionStorage.getItem('tizoutis-login')
            if (loginData) {
                this.$store.commit('savingData')
                axios.post(URLS.login, JSON.parse(loginData)).then((res) => {
                    this.$store.commit('setUser', new User(res.data))
                    this.$store.commit('dataSaved')
                }).catch((err) => {
                    console.error(err)
                })
            } else {
                if (this.$router.currentRoute.name !== 'login') {
                    this.$store.commit('setRoute', this.$router.currentRoute)
                    this.$router.push('login')
                }
            }
        }
    }
}
